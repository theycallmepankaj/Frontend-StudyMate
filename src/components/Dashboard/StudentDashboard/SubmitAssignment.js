  import React, { useState, useRef } from "react";
  import { useParams, Link, useNavigate } from "react-router-dom";
  import {
    FaArrowLeft,
    FaFileUpload,
    FaUpload,
    FaFileAlt,
    FaRegFileAlt,
    FaSave
  } from "react-icons/fa";
  import axios from "axios";
  import Endpoint from "../../apis/Endpoint";
  import { getCurrentUser } from "../../auth/Auth";
  import "./SubmitAssignment.css";
  import { toast, ToastContainer } from "react-toastify";

  function SubmitAssignmentPage() {
      const { assignmentId } = useParams(); 
      console.log("Assignment Id : ",assignmentId);
      const user = getCurrentUser();
      const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [textSubmission, setTextSubmission] = useState("");
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
      }
    };

    const handleBrowseClick = () => {
      fileInputRef.current.click();
    };

    const handleSaveAssignment = async () => {
      if (!selectedFile) {
        toast.warning("Please select a file before submitting.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", selectedFile); 
        formData.append("textSubmission", textSubmission); 

        const response = await axios.post( `${Endpoint.SUBMIT_ASSIGNMENT}/${assignmentId}/submit`,formData,
          {
          withCredentials: true, 
          headers: { "Content-Type": "multipart/form-data" },
        }
        );
          console.log("response data ass ",response);
        toast.success(response.data.Message || "Assignment submitted successfully!");
        setSelectedFile(null);
        setTextSubmission("");

      navigate("/MainDashboard/assignmentPage", { state: { submittedId: assignmentId } });

      } catch (error) {
        console.error("Error submitting assignment:", error);
        toast.error("Failed to submit assignment");
      }
    };

    return <>
      <ToastContainer/>
      <div className="container-fluid py-4 dashboard-content-container">
     
        <div className="d-flex align-items-center mb-4">
          <Link
            to="/mainDashboard/assignmentPage"
            className="back-link d-flex align-items-center text-decoration-none"
          >
            <FaArrowLeft className="mr-2" /> Back to Assignments
          </Link>
        </div>

        <div className="card submission-section-card mb-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <FaFileUpload className="mr-2 section-icon" />
              <h5 className="section-title mb-0">File Upload</h5>
            </div>
            <p className="text-muted section-description mb-4">
              Upload your assignment file (PDF, DOC, DOCX). Max size: 10 MB
            </p>

            <div className="file-upload-area text-center p-4">
              <FaUpload className="upload-icon-lg mb-3" />
              <p className="font-weight-bold mb-2">Click below to select a file</p>

              <input
                type="file"
                ref={fileInputRef}
                className="d-none"
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="btn btn-outline-info browse-files-btn"
                onClick={handleBrowseClick}
              >
                <FaFileAlt className="mr-2" /> Browse Files
              </button>

              {selectedFile && (
                <p className="mt-3 text-success">
                  Selected: {selectedFile.name} (
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Text Submission Section */}
        <div className="card submission-section-card">
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <FaRegFileAlt className="mr-2 section-icon" />
              <h5 className="section-title mb-0">Text Submission (Optional)</h5>
            </div>
            <textarea
              className="form-control text-submission-textarea mb-2"
              rows="6"
              placeholder="Type any comments or explanations here..."
              value={textSubmission}
              onChange={(e) => setTextSubmission(e.target.value)}
            ></textarea>

            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                {textSubmission.length} characters
              </small>
              <button
                type="button"
                className="btn btn-outline-info btn-sm"
                onClick={handleSaveAssignment}
              >
                <FaSave className="mr-1" /> Submit Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  }

  export default SubmitAssignmentPage;
