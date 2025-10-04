import React, { useEffect, useReducer } from 'react';
import {
    FaArrowLeft,
    FaReply
} from 'react-icons/fa';
import './SolveDoubt.css';
import axios from 'axios';
import Endpoint, { BASE_URL } from '../../apis/Endpoint';
import { useNavigate } from 'react-router-dom';

function SolveDoubtsPage() {
    const navigate = useNavigate();

    // Navigation function doubtId + title ke sath
    const handleNavigate = (id, title, askedBy, subject) => {
        navigate(`/teacherDashboard/doubtResponse/${id}`, { state: { title, askedBy, subject } });
    };

    const [state, dispatch] = useReducer((state, action) => {
        if (action.type === "set-doubts") {
            return { ...state, doubtList: action.payload };
        }
        return state;
    }, {
        doubtList: []
    });

    useEffect(() => {
        loadDoubts();
    }, []);

    const loadDoubts = async () => {
        try {
            let response = await axios.get(Endpoint.GET_STU_DOUBTS, { withCredentials: true });
            console.log(response.data);

            dispatch({ type: "set-doubts", payload: response.data["doubts"] });
        }
        catch (err) {
            console.log(err);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Pending":
                return "doubt-badge-pending";
            case "Resolved":
                return "doubt-badge-resolved";
            case "In Progress":
                return "doubt-badge-in-progress";
            default:
                return "";
        }
    };

    return <>
        <div className="container-fluid py-4 dashboard-content-container">

            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{ color: "#0ABAB5", fontSize: "30px" }}>Solve Doubts</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr />

            <h2 className="mb-2 page-title">Student Doubts</h2>
            <p className="text-muted mb-4 page-description">Help students with their questions and doubts</p>

            <div className="row">
                {state?.doubtList?.map((doubt, index) => (
                    <div className="col-12 mb-4" key={index}>
                        <div className="card doubt-item-card">
                            <div className="card-body d-flex">
                                <div className="doubt-initials-avatar mr-3">
                                    <img
                                        src={BASE_URL + "/profile/" + doubt?.askedBy?.profile?.imageName}
                                        alt="Profile"
                                        className="rounded-circle"
                                        width={60}
                                        height={60}
                                    />
                                </div>
                                <div className="flex-grow-1">
                                    {/* Question + Status in one row */}
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h5 className="card-title-lg mb-0">{doubt?.question}</h5>
                                        <span className={`badge ${getStatusBadgeClass(doubt?.answers?.length > 0 ? "Resolved" : "Pending")}`}>
                                            {doubt?.answers?.length > 0 ? "Resolved" : "Pending"}
                                        </span>
                                    </div>
                                    <p className="card-subtitle text-muted mt-1">
                                        <span><strong>{doubt?.askedBy?.name}</strong></span>
                                        <span className="dot-separator"> • </span>
                                        <span>{new Date(doubt?.createdAt).toLocaleDateString()}</span>
                                    </p>

                                    <p className="card-text description-text mb-2">{doubt?.description}</p>

                                    {/* Subject + Buttons */}
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="text-muted small">
                                            <span className="material-card-subject mr-2">{doubt?.subject}</span>
                                        </div>
                                        <div>
                                            {doubt?.answers?.length > 0 ? (
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() =>
                                                        handleNavigate(
                                                            doubt?._id,
                                                            doubt?.question,
                                                            doubt?.askedBy?.name,
                                                            doubt?.subject
                                                        )
                                                    }
                                                >
                                                    <FaReply className="mr-1" /> Add More
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-outline-info btn-sm"
                                                    onClick={() =>
                                                        handleNavigate(
                                                            doubt?._id,
                                                            doubt?.question,
                                                            doubt?.askedBy?.name,
                                                            doubt?.subject
                                                        )
                                                    }
                                                >
                                                    <FaReply className="mr-1" /> Reply
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
};

export default SolveDoubtsPage;
