import React from 'react';
import {
    FaArrowLeft,   
    FaReply,        
    FaEye           
} from 'react-icons/fa';
import '../StudentDashboard/Dashboard.css'; 
import { getCurrentUser } from '../../auth/Auth';
import { BASE_URL } from '../../apis/Endpoint';
import { Link, Outlet } from 'react-router-dom';

function TeaDashboard() {
    const currentUser = getCurrentUser();
    console.log("Current User : ",currentUser);
    const studentDoubts = [
        {
            initials: "AJ",
            title: "Integration by Parts Problem",
            question: "I'm having trouble with the integration by parts method. Can you explain the u-substitution strategy?",
            studentName: "Alice Johnson",
            time: "15 min ago",
        },
        {
            initials: "CD",
            title: "Lab Equipment Question",
            question: "What's the proper calibration procedure for the oscilloscope in experiment 3?",
            studentName: "Bob Smith",
            time: "1 hour ago",
        },
        {
            initials: "BS",
            title: "Molecular Structure Help",
            question: "Could you clarify the difference between ionic and covalent bonding in the homework?",
            studentName: "Carol Davis",
            time: "2 hours ago",
        },
    ];

    return <>
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top breadcrumb/navigation area */}
            <div className="d-flex align-items-center mb-4">
                {/* This link might go to a teacher's main dashboard or just back home */}
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{ color: "#0ABAB5", fontSize: "30px" }}>Teacher Dashboard</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr/>

            {/* Welcome Banner (Teacher specific) */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card welcome-card p-5" >
                        <div className="d-flex align-items-center" style={{ gap: "2%" }}>
                            <div>
                                <img
                                    src={BASE_URL+"/profile/"+currentUser?.profile?.imageName}
                                    className="rounded-circle"
                                    width="60"
                                    height="60"
                                    alt="Profile"
                                />
                            </div>
                            <div>
                                <h4 className="mb-1 text-white">Welcome, Prof. {currentUser.name} !</h4>
                                <p className="mb-0 text-white-50">Ready to inspire and educate today?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Teacher Navigation Tabs */}
            <div className="row mb-4">
                <div className="col-12">
                    <ul className="nav nav-pills nav-fill dashboard-nav-tabs">
                        <li className="nav-item">
                            <Link to="/teacherDashboard/teaDashboard/getAnnouncement" className="nav-link">Announcement</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/teacherDashboard/teaDashboard/studentProfile" className="nav-link" >Profile</Link>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Submission</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Doubts</a> 
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Messages</a>
                        </li> */}
                    </ul>
                     <Outlet /> 
                </div>
            </div>

            {/* Student Doubts Section */}
            {/* <h3 className="mb-3 page-title">Student Doubts</h3> */}

            {/* <div className="row">
                {studentDoubts.map((doubt, index) => (
                    <div className="col-12 mb-4" key={index}>
                        <div className="card student-doubt-card">
                            <div className="card-body d-flex">
                                <div className="doubt-initials-avatar mr-3">{doubt.initials}</div>
                                <div className="flex-grow-1">
                                    <h5 className="card-title-lg mb-1">{doubt.title}</h5>
                                    <p className="card-text description-text mb-2">{doubt.question}</p>
                                    <p className="card-subtitle text-muted mb-0">
                                        <span>{doubt.studentName}</span>
                                        <span className="dot-separator"> • </span>
                                        <span>{doubt.time}</span>
                                    </p>
                                    <div className="d-flex justify-content-end mt-3">
                                        <button className="btn btn-outline-info btn-sm mr-2">
                                            <FaReply className="mr-1" /> Reply
                                        </button>
                                        <button className="btn btn-info btn-sm">
                                            <FaEye className="mr-1" /> View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    </>
};

export default TeaDashboard;