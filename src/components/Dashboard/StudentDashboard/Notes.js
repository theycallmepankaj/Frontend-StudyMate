import React, { useEffect, useReducer } from 'react';
import {
    FaFilePdf,
    FaDownload,
    FaEye,
    FaArrowLeft
} from 'react-icons/fa';
import './Notes.css';
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';

function NotesPage() {
    // Data for the study notes cards
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "set-notes":
                return { ...state, noteList: action.payload };
            default:
                return state;
        }
    }, {
        noteList: []
    })
    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            let response = await axios.get(Endpoint.GET_NOTES, { withCredentials: true });
            console.log("Response Data : ", response);

            if (Array.isArray(response.data.notes)) {
                dispatch({ type: "set-notes", payload: response.data.notes });
            } else {
                console.error("Notes is not an array:", response.data.notes);
                dispatch({ type: "set-notes", payload: [] }); // fallback
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return <>
        <div className="container-fluid py-4 dashboard-content-container">

            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{ color: "#0ABAB5", fontSize: "30px" }}>Notes</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr />

            <h2 className="mb-2 page-title">Study Notes</h2>
            <p className="text-muted mb-4 page-description">Access study materials and lecture notes</p>


            <div className="row">
                {state?.noteList?.map((note, index) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={index}>
                        <div className="card study-note-card">
                            <div className="card-body">
                                <h5 className="card-title-lg mb-2">{note?.title}</h5>
                                <p className="card-subtitle text-muted mb-1">
                                    <span className={`material-card-subject`}>{note?.subject}</span>
                                    <span> by {note?.uploadedBy?.name}</span>
                                </p>
                                <p className="card-text description-text">{note?.description}</p>
                                <p className="card-text date-text"><span>
                                    {new Date(note.uploadedAt).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    })}
                                </span></p>
                                <div className="d-flex justify-content-start mt-3">
                                    {/* <button className="btn btn-outline-info btn-sm mr-2">
                                        <FaEye className="mr-1" /> Preview
                                    </button> */}
                                    <button className="btn btn-info btn-sm" onClick={() => window.open(note.fileUrl, "_blank")}>
                                         Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
};

export default NotesPage;