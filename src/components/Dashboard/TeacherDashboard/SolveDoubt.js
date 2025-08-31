import React, { useEffect, useReducer } from 'react';
import {
    FaArrowLeft,
    FaReply,
    FaEye
} from 'react-icons/fa';
import './SolveDoubt.css';
import axios from 'axios';
import Endpoint, { BASE_URL } from '../../apis/Endpoint';
import { Navigate, useNavigate } from 'react-router-dom';

function SolveDoubtsPage() {
    // Data for the student doubts cards
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/teacherDashboard/doubtResponse/${id}`)
    }

    const [state, dispatch] = useReducer((state, action) => {
        if (action.type == "set-doubts") {
            state.doubtList = action.payload;
        }
        return { ...state };
    }, {
        doubtList: []
    })
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
    }

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
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <div>
                                            <h5 className="card-title-lg mb-0">{doubt?.question}</h5>
                                            <p className="card-subtitle text-muted mt-2">
                                                <span><strong> {doubt?.askedBy?.name}</strong></span>
                                                <span className="dot-separator"> • </span>
                                                <span>{new Date(doubt?.createdAt).toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                        <span className={`badge ${getStatusBadgeClass(doubt.status)}`}>
                                            {doubt?.status}
                                        </span>
                                    </div>
                                    <p className="card-text description-text mb-2">{doubt?.description}</p>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="text-muted small">
                                            {/* <span>{doubt?.responses} responses</span> */}
                                            <span className="badge bg-secondary p-1 subject-tag ">{doubt?.subject}</span>
                                        </div>
                                        <div>



                                            <button className="btn btn-outline-info btn-sm mr-2" onClick={() => handleNavigate(doubt?._id)}>
                                                <FaReply className="mr-1" /> Reply
                                            </button>



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