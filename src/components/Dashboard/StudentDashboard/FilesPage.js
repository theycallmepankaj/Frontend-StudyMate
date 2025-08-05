import React from 'react';
import {
    FaArrowLeft, // Back to Home icon
    FaFileAlt,   // General file icon (as seen on cards)
    FaEye,       // View icon
    FaDownload,  // Download icon
    FaUser,      // Professor icon
    FaCalendarAlt // Date icon
} from 'react-icons/fa';
import './Files.css'; // Assuming your general dashboard styles are here

const FileSharingPage = () => {
    // Data for the file cards
    const filesData = [
        {
            icon: FaFileAlt, // Using FaFileAlt for generic file icon
            fileName: "Advanced Calculus Notes.pdf",
            fileSize: "2.4 MB",
            professor: "Prof. Smith",
            date: "2024-01-15",
            type: "pdf" // For potential future styling based on file type
        },
        {
            icon: FaFileAlt, // Using FaFileAlt for generic file icon
            fileName: "Lab Report Template.docx",
            fileSize: "1.2 MB",
            professor: "Dr. Johnson",
            date: "2024-01-14",
            type: "docx" // For potential future styling based on file type
        },
    ];

    return (
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top breadcrumb/navigation area */}
            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{color:"#0ABAB5",fontSize:"30px"}}>Files</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr/>
            

            {/* Page Title and Description */}
            <h2 className="mb-2 page-title">File Sharing</h2>
            <p className="text-muted mb-4 page-description">Access and download course materials</p>

            {/* File Cards Grid */}
            <div className="row">
                {filesData.map((file, index) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={index}> {/* Assuming 2 or 3 cards per row based on screen size */}
                        <div className="card file-card">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-3">
                                    <file.icon className="file-icon mr-3" /> {/* Dynamic icon based on data */}
                                    <div>
                                        <h5 className="card-title-lg mb-0">{file.fileName}</h5>
                                        <p className="card-subtitle text-muted mb-0">{file.fileSize}</p>
                                    </div>
                                </div>
                                <div className="file-meta mb-3">
                                    <p className="mb-1 text-muted d-flex align-items-center">
                                        <FaUser className="mr-2" /> {file.professor}
                                    </p>
                                    <p className="mb-0 text-muted d-flex align-items-center">
                                        <FaCalendarAlt className="mr-2" /> {file.date}
                                    </p>
                                </div>
                                <div className="d-flex justify-content-start mt-3">
                                    <button className="btn btn-outline-info btn-sm mr-2">
                                        <FaEye className="mr-1" /> View
                                    </button>
                                    <button className="btn btn-info btn-sm">
                                        <FaDownload className="mr-1" /> Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileSharingPage;