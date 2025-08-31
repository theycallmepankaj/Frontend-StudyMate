import React, { useEffect, useReducer, useState } from 'react';
import {
    FaArrowLeft,
    FaRegFileAlt,
    FaRegClock,
    FaEye,
    FaPlus
} from 'react-icons/fa';
import './TeaAssignment.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TeaAssignment() {
    const navigate = useNavigate();
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [loading, setLoading] = useState(true);

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "set-assignments":
                return { ...state, AssignmentList: action.payload };
            default:
                return state;
        }
    }, {
        AssignmentList: []
    });

    useEffect(() => {
        loadAssignment();
    }, []);

    const loadAssignment = async () => {
        try {
            let response = await axios.get("http://localhost:3000/teacher/submissions-stats", { withCredentials: true });
            dispatch({ type: "set-assignments", payload: response.data.stats || [] });
            console.log("response data : ",response);
        }
        catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Active":
                return "assignment-badge-active";
            case "Completed":
                return "assignment-badge-completed";
            default:
                return "";
        }
    };

    const handleclick = () => {
        navigate("/teacherDashboard/createAssignment");
    };

    if (loading) return <p className="text-center mt-4">Loading assignments...</p>;

    return (
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top breadcrumb/navigation area */}
            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{ color: "#0ABAB5", fontSize: "30px" }}>Assignments</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr />

           
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-2 page-title">Manage Assignment</h2>
                    <p className="text-muted page-description">Create and track student assignments</p>
                </div>
                <button onClick={handleclick} className="btn btn-info create-assignment-btn">
                    <FaPlus className="mr-1" /> Create Assignment
                </button>
            </div>

         
            <div className="row mb-4">
                <div className="col-lg-6 mb-3">
                    <div className="card summary-card p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="summary-title">Active Assignments</h5>
                                <h3 className="summary-number">
                                    {state?.AssignmentList?.filter(a => a?.status === "Active").length}
                                </h3>
                            </div>
                            <FaRegFileAlt className="summary-icon" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="card summary-card p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="summary-title">Total Submissions</h5>
                                <h3 className="summary-number">
                                    {state?.AssignmentList?.reduce((acc, a) => acc + a?.totalStudentsSubmitted, 0)}
                                </h3>
                            </div>
                            <FaRegClock className="summary-icon" />
                        </div>
                    </div>
                </div>
            </div>      

            
            <div className="row">
                {state?.AssignmentList?.map((assignment, index) => (
                    <div className="col-12 mb-4" key={index}>
                        <div className="card assignment-item-card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h5 className="card-title-lg mb-0">{assignment?.title}</h5>
                                        <p className="card-subtitle text-muted mt-2">
                                            <span className={`subject-tag ${assignment?.subject?.toLowerCase()}`} style={{fontWeight:"bolder",backgroundColor:"orange"}}>{assignment?.subject}</span>
                                            <span className="dot-separator mt-2"> • </span>
                                            <span><strong>Due Date : </strong> {new Date(assignment?.duedate).toLocaleDateString()}</span>
                                        </p>
                                    </div>
                                    <span className={`badge ${getStatusBadgeClass(assignment?.status)}`}>
                                        {assignment?.status}
                                    </span>
                                </div>
                                <div className="row text-center mt-3 mb-3">
                                    {/* <div className="col-4">
                                        <h4 className="metric-number">{assignment?.totalStudents}</h4>
                                        <small className="text-muted">Total Students</small>
                                    </div> */}
                                    <div className="col-4">
                                        <h4 className="metric-number text-submitted">{assignment?.totalStudentsSubmitted}</h4>
                                        <small className="text-muted">Submitted</small>
                                    </div>
                                    {/* <div className="col-4">
                                        <h4 className="metric-number text-pending">{assignment?.totalStudents - assignment?.totalStudentsSubmitted}</h4>
                                        <small className="text-muted">Pending</small>
                                    </div> */}
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn btn-info"
                                        onClick={() => setSelectedAssignment(assignment)}
                                    >
                                        <FaEye className="mr-1" /> View Submissions
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

           
            {selectedAssignment && (
                <div className="card mt-4">
                    <div className="card-body">
                        <h4>Submissions for: {selectedAssignment?.title}</h4>
                        <table className="table table-bordered mt-3">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Email</th>
                                    <th>File</th>
                                    <th>Submitted At</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedAssignment?.submissions.map((sub, i) => (
                                    <tr key={i}>
                                        <td>{sub?.studentName}</td>
                                        <td>{sub?.studentEmail}</td>
                                        <td>
                                            {sub.fileUrl ? (
                                                <a href={sub?.fileUrl} target="_blank" rel="noopener noreferrer">
                                                     Download
                                                </a>
                                            ) : (
                                                "No file"
                                            )}
                                        </td>
                                        <td>{sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : "Not Submitted"}</td>
                                        <td>{sub.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="btn btn-secondary mt-2" onClick={() => setSelectedAssignment(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TeaAssignment;
