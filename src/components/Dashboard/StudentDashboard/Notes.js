import React, { useEffect, useReducer } from 'react';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import './Notes.css';
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';

function NotesPage() {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "set-notes":
                return { ...state, noteList: action.payload };
            default:
                return state;
        }
    }, {
        noteList: []
    });

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            let response = await axios.get(Endpoint.GET_NOTES, { withCredentials: true });
            if (Array.isArray(response.data.notes)) {
                dispatch({ type: "set-notes", payload: response.data.notes });
            } else {
                dispatch({ type: "set-notes", payload: [] });
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="notes-page container-fluid py-4">
            {/* Header */}
            <div className="d-flex align-items-center mb-4 page-header">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="page-title">Notes</span>
                <span className="ml-auto system-name"> StudyMate - Learning Management System</span>
            </div>
            <hr />

            {/* Title & description */}
            <h2 className="mb-2">Study Notes</h2>
            <p className="text-muted mb-4">Access study materials and lecture notes</p>

            {/* Notes Grid */}
            <div className="row">
                {state?.noteList?.map((note, index) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={index}>
                        <div className="note-card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="note-title mb-2">{note?.title}</h5>
                                <p className="note-meta mb-2">
                                    <span className="note-subject">{note?.subject}</span> •
                                    <span className="note-author"> {note?.uploadedBy?.name}</span>
                                </p>
                                <p className="note-desc">{note?.description}</p>
                                <p className="note-date">
                                    {new Date(note.uploadedAt).toLocaleString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true
                                    })}
                                </p>
                                <div className="d-flex mt-3">
                                    <button
                                        className="btn btn-modern"
                                        onClick={() => window.open(note.fileUrl, "_blank")}
                                    >
                                        <FaDownload className="mr-2" /> Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {state.noteList.length === 0 && (
                    <div className="col-12 text-center text-muted mt-5">
                        <h5>No notes available 📄</h5>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NotesPage;
