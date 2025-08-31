import React, { useEffect, useReducer, useState } from 'react';
import {
    FaArrowLeft,
    FaUpload,
    FaSearch,
    FaStar,
    FaDownload,
    FaEye,
    FaEdit,
    FaFilePdf,
    FaRegStar,
    FaFolderOpen // Used for the sidebar icon
} from 'react-icons/fa';
import './CourseMaterial.css'; // Assuming common dashboard styles
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';

function MaterialPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('allNotes');

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



    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const handleClick = () => {
        navigate("/teacherDashboard/uploadNotes");
    }

    // const handleDownload = (fileName) => {
    //     const fileURL = `http://localhost:3000/uploadNotes/${fileName}`;
    //     window.open(fileURL, "_blank");
    // };


    return <>
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="material-header-title">Manage Notes</h1>
                    <p className="material-header-subtitle">Upload and manage course materials</p>
                </div>
                <button onClick={handleClick} className="btn btn-primary material-upload-btn">
                    <FaUpload className="mr-2" /> Upload Notes
                </button>
            </div>



            {/* Material Cards Grid */}
            <div className="row g-4">
                {state.noteList.map((material) => (
                    <div className="col-lg-6" key={material.id}>
                        <div className="card material-card h-100">
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h5 className="material-card-title">{material.title}</h5>
                                    {/* <div className="d-flex align-items-center">
                                        {material.isStarred ? (
                                            <FaStar className="text-warning star-icon" />
                                        ) : (
                                            <FaRegStar className="text-muted star-icon" />
                                        )}
                                        <FaFilePdf className="text-danger pdf-icon ml-2" />
                                    </div> */}
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="material-card-subject mr-2">{material.subject}</span>
                                    <span className="material-card-author">by {material.uploadedBy.name}</span>
                                </div>
                                <p className="material-card-description mb-3">{material.description}</p>
                                <div className="d-flex flex-wrap align-items-center mb-3 text-muted material-stats">
                                    <span>
                                        {new Date(material.uploadedAt).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        })}
                                    </span>
                                    <span className="dot-separator">·</span>
                                    <span>{material.size}</span>
                                    <span className="dot-separator">·</span>
                                    <span>{material.downloads}</span>
                                    <span className="dot-separator">·</span>
                                    {/* <FaStar className="text-warning mr-1" /><span>{material.rating}</span> */}
                                </div>
                                <div className="d-flex mt-auto material-card-buttons">
                                    <button className="btn btn-success btn-sm mr-2" onClick={() => window.open(material.fileUrl, "_blank")}>
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

export default MaterialPage;