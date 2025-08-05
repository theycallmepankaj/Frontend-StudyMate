import React from 'react';
import {
    FaArrowLeft,   
    FaCloudUploadAlt, 
    FaPlus         
} from 'react-icons/fa';
import './Announcement.css'; 

function AnnouncementPage() {
    return <>
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top breadcrumb/navigation area */}
            <div className="d-flex align-items-center mb-4">
                <a href="/mainDashboard" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{ color: "#0ABAB5", fontSize: "30px" }}>Announcement</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
              <hr/>
            {/* Page Title and Description */}
            <h2 className="mb-2 page-title">Announcement</h2>
            <p className="text-muted mb-4 page-description">Post announcement for stay updated</p>

            {/* Post Announcement Card */}
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10"> {/* Adjust column size for better centering */}
                    <div className="card announcement-post-card p-5 text-center">
                        <FaCloudUploadAlt className="announcement-upload-icon mb-4" />
                        <button className="btn btn-info post-announcement-btn">
                            <FaPlus className="mr-2" /> Post Announcement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default AnnouncementPage;