import React, { useEffect, useReducer } from 'react';
import {
    FaAlignRight,
    FaAngleRight,
    FaArrowLeft,
    FaEye,
    FaUpload
} from 'react-icons/fa';
import './AssignmentPage.css';
import Endpoint from '../../apis/Endpoint';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignmentsPage = () => {
    let navigate = useNavigate();

    const [state, dispatch] = useReducer((state, action) => {
        if (action.type === "set-assignment") {
            state.assignmentList = action.payload;
        }
        return { ...state };
    }, {
        assignmentList: []
    });

    useEffect(() => {
        loadAssignment();
    }, []);

    const loadAssignment = async () => {
        try {
            let response = await axios.get(Endpoint.GET_ASSIGNMENT,{withCredentials:true});
            dispatch({ type: "set-assignment", payload: response.data });
            console.log("response Data here : ",response.data);
        }
        catch (err) {
            console.log(err);
        }
    };

    // Function to determine badge class based on status
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Not Started":
                return "badge-not-started";
            case "In Progress":
                return "badge-in-progress";
            case "Submitted":
                return "badge-submitted";
            default:
                return "badge-not-started";
        }
    };

    const handleClick = (id) => {
        navigate(`/mainDashboard/submitAssignment/${id}`);
    };

    return (
        <div className="container-fluid py-4 dashboard-content-container">
           
            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{ color: "#0ABAB5", fontSize: "30px" }}>Assignments</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr />

            
            <h2 className="mb-2 page-title">My Assignment</h2>
            <p className="text-muted mb-4 page-description">Track and submit your assignments</p>

            <div className="row">
                {state?.assignmentList?.map((assignment, index) => {
                    // Get student-specific status from first submission
                    // const status = assignment.submissions?.[0]?.status || "Not Started";

                    const status = assignment.status || "Not Started";

                    return (
                        <div className="col-12 mb-4" key={index}>
                            <div className="card assignment-card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                        <h5 className="card-title-lg mb-0">{assignment?.title}</h5>
                                        <span className={`badge ${getStatusBadgeClass(status)}`}>
                                            {status}
                                        </span>
                                    </div>
                                    <p className="card-subtitle text-muted mb-2">
                                        <span className="subject-text">{assignment?.subject}</span>
                                        <span className="dot-separator"> • </span>
                                        <span className='subject-text ml-2'>Date : {new Date(assignment.createdAt).toLocaleDateString()}</span>
                                        <span className="dot-separator"> • </span>
                                        <span className='subject-text ml-2'>Due Date : {new Date(assignment?.dueDate).toLocaleDateString()}</span>
                                    </p>
                                    <p className="card-text description-text">{assignment?.description}</p>
                                    <div className="d-flex justify-content-start mt-3">
                                        {/* <button className="btn btn-outline-info btn-sm mr-2">
                                            <FaEye className="mr-1" /> View Details
                                        </button> */}

                                        {status === "Submitted" ? (
                                            <button className="btn btn-secondary btn-sm" disabled>
                                            <FaAngleRight/>  Submitted
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleClick(assignment._id)}
                                                className="btn btn-info btn-sm"
                                            >
                                                <FaUpload className="mr-1" /> Submit Assignment
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AssignmentsPage;
