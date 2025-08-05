import React from 'react';
import {
    FaArrowLeft,
    FaRegFileAlt,
    FaRegClock,
    FaEye,
    FaPlus
} from 'react-icons/fa';
import './TeaAssignment.css'; 
import { useNavigate } from 'react-router-dom';

function TeaAssignment() {
    const navigate = useNavigate();
    
    const handleclick =()=>{
        navigate("/teacherDashboard/createAssignment");
    }

    const assignmentsData = [
        {
            title: "Calculus Integration Problems",
            subject: "Mathematics",
            dueDate: "Jan 25, 2025",
            totalStudents: 30,
            submitted: 18,
            pending: 12,
            status: "Active"
        },
        {
            title: "Quadratic Equations Quiz",
            subject: "Mathematics",
            dueDate: "Jan 20, 2025",
            totalStudents: 30,
            submitted: 30,
            pending: 0,
            status: "Completed"
        },
    ];

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

    return <>
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top breadcrumb/navigation area */}
            <div className="d-flex align-items-center mb-4">
                <a href="/mainDashboard" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{ color: "#0ABAB5", fontSize: "30px" }}>Assignments</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr/>

            {/* Page Title and Create Assignment Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-2 page-title">Manage Assignment</h2>
                    <p className="text-muted page-description">Create and track student assignments</p>
                </div>
                <button onClick={handleclick} className="btn btn-info create-assignment-btn">
                    <FaPlus className="mr-1" /> Create Assignment
                </button>
            </div>

            {/* Summary Cards */}
            <div className="row mb-4">
                <div className="col-lg-6 mb-3">
                    <div className="card summary-card p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="summary-title">Active Assignments</h5>
                                <h3 className="summary-number">5</h3>
                                <p className="summary-text text-muted">2 due this week</p>
                            </div>
                            <FaRegFileAlt className="summary-icon" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="card summary-card p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="summary-title">Pending Assignments</h5>
                                <h3 className="summary-number">23</h3>
                                <p className="summary-text text-muted">Submissions</p>
                            </div>
                            <FaRegClock className="summary-icon" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Assignment Cards List */}
            {/* <div className="row">
                {assignmentsData.map((assignment, index) => (
                    <div className="col-12 mb-4" key={index}>
                        <div className="card assignment-item-card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h5 className="card-title-lg mb-0">{assignment.title}</h5>
                                        <p className="card-subtitle text-muted mb-0">
                                            <span className={`subject-tag ${assignment.subject.toLowerCase()}`}>{assignment.subject}</span>
                                            <span className="dot-separator"> • </span>
                                            <span>Due {assignment.dueDate}</span>
                                        </p>
                                    </div>
                                    <span className={`badge ${getStatusBadgeClass(assignment.status)}`}>
                                        {assignment.status}
                                    </span>
                                </div>
                                <div className="row text-center mt-3 mb-3">
                                    <div className="col-4">
                                        <h4 className="metric-number">{assignment.totalStudents}</h4>
                                        <small className="text-muted">Total Students</small>
                                    </div>
                                    <div className="col-4">
                                        <h4 className="metric-number text-submitted">{assignment.submitted}</h4>
                                        <small className="text-muted">Submitted</small>
                                    </div>
                                    <div className="col-4">
                                        <h4 className="metric-number text-pending">{assignment.pending}</h4>
                                        <small className="text-muted">Pending</small>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-info">
                                        <FaEye className="mr-1" /> View Submissions
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    </>
};

export default TeaAssignment;