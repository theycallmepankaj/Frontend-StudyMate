import React, { useState, useRef } from 'react';
import {
    FaArrowLeft,        
    FaFileUpload,      
    FaUpload,          
    FaFileAlt,          
    FaRegFileAlt,       
    FaSave            
} from 'react-icons/fa';
import './SubmitAssignment.css'; 

function SubmitAssignmmentPage(){
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [textSubmission, setTextSubmission] = useState('');

   
    // const handleDragEnter = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setIsDragging(true);
    // };

    // const handleDragLeave = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setIsDragging(false);
    // };

    // const handleDragOver = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setIsDragging(true);
    // };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // Trigger file input click
    const handleBrowseClick = () => {
        fileInputRef.current.click();
    };

    const handleTextChange = (e) => {
        setTextSubmission(e.target.value);
    };

    const handleSaveDraft = () => {
        console.log("Saving draft:", { file: selectedFile ? selectedFile.name : null,text: textSubmission });
        alert("Draft saved!"); // Replace with custom modal
    };

    return <>
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top breadcrumb/navigation area - Assuming a back link to a specific assignment details page */}
            <div className="d-flex align-items-center mb-4">
                <a href="/mainDashboard/assignmentPage" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Assignments
                </a>
            </div>

            {/* File Upload Section */}
            <div className="card submission-section-card mb-4">
                <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                        <FaFileUpload className="mr-2 section-icon" />
                        <h5 className="section-title mb-0">File Upload</h5>
                    </div>
                    <p className="text-muted section-description mb-4">
                        Upload your assignment files. You can drag and drop multiple files or click to browse.
                    </p>

                    <div
                        className={`file-upload-area text-center p-4 ${isDragging ? 'dragging' : ''}`}
                        // onDragEnter={handleDragEnter}
                        // onDragLeave={handleDragLeave}
                        // onDragOver={handleDragOver}
                        // onDrop={handleDrop}
                    >
                        <FaUpload className="upload-icon-lg mb-3" />
                        <p className="font-weight-bold mb-2">Drag and drop your files here</p>
                        <p className="text-muted mb-3">or click to browse files</p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="d-none"
                            onChange={handleFileChange}
                            // multiple // Allow multiple files if needed
                        />
                        <button type="button" className="btn btn-outline-info browse-files-btn" onClick={handleBrowseClick}>
                            <FaFileAlt className="mr-2" /> Browse Files
                        </button>
                        {/* {selectedFile && (
                            <p className="mt-3 text-success">Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</p>
                        )} */}
                        <p className="text-muted mt-3 mb-0 file-info-text">Max file size: 10 MB • Formats: PDF, DOC, DOCX</p>
                    </div>
                </div>
            </div>

            {/* Text Submission Section */}
            <div className="card submission-section-card">
                <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                        <FaRegFileAlt className="mr-2 section-icon" />
                        <h5 className="section-title mb-0">Text Submission</h5>
                    </div>
                    <p className="text-muted section-description mb-4">
                        Add any additional comments, explanations, or text-based responses (optional)
                    </p>

                    <textarea
                        className="form-control text-submission-textarea mb-2"
                        rows="6"
                        placeholder="Type your additional comments, explanations, or text submission here..."
                        value={textSubmission}
                        onChange={handleTextChange}
                    ></textarea>
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">{textSubmission.length} characters</small>
                        <button type="button" className="btn btn-outline-info btn-sm" onClick={handleSaveDraft}>
                            <FaSave className="mr-1" /> Save Assignment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default SubmitAssignmmentPage;