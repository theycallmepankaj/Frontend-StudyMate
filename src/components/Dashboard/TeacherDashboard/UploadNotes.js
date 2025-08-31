import React, { useState } from 'react';
import { FaArrowLeft, FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './UploadNotes.css';
import { getCurrentUser } from '../../auth/Auth';
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';
import { toast, ToastContainer } from 'react-toastify';

const UploadNotePage = () => {
    const user = getCurrentUser();
    console.log("current user:", user);

    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        description: '',
        fileUrl: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            fileUrl: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fileUrl) {
            alert("Please select a file to upload.");
            return;
        }

        // Prepare FormData for file upload
        const data = new FormData();
        data.append("title", formData.title);
        data.append("subject", formData.subject);
        data.append("description", formData.description);
        data.append("fileUrl", formData.fileUrl); // multer field name

        try {
            const response = await axios.post(
                Endpoint.UPLOAD_NOTES,
                data,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );
            console.log("Upload response:", response.data);
            toast.success(response.data.message);

            // Reset form
            setFormData({
                title: '',
                subject: '',
                description: '',
                fileUrl: null
            });
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error(error.response.data.errorMessage)
        }
    };

    return <>
        <ToastContainer/>
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Header with back button */}
            <div className="d-flex align-items-center mb-4">
                <Link to="/teacherDashboard/courseMaterial" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Materials
                </Link>
            </div>

            {/* Form Section */}
            <div className="upload-note-card p-4">
                <h1 className="upload-note-title">Upload Notes</h1>
                <p className="upload-note-subtitle">Fill in the details to upload your course material.</p>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="form-group mb-3">
                        <label htmlFor="title" className="form-label">Note Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Calculus - Integration Techniques"
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <select
                            className="form-control p-2"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Subject</option>
                            <option value="Java">Java</option>
                            <option value="JavaScrippt">JavaScrippt</option>
                            <option value="SoftSkills">SoftSkills</option>
                            <option value="Aptitude">Aptitude</option>
                        </select>
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="A brief summary of the notes..."
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="fileUrl" className="form-label">Upload File (PDF only)</label>
                        <div className="custom-file-upload">
                            <input
                                type="file"
                                className="form-control-file"
                                id="fileUrl"
                                name="fileUrl"
                                accept=".pdf"
                                onChange={handleFileChange}
                                required
                            />
                            <span className="file-name-display">
                                {formData.fileUrl ? formData.fileUrl.name : 'No file selected'}
                            </span>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary upload-submit-btn">
                        <FaUpload className="mr-2" /> Upload Note
                    </button>
                </form>
            </div>
        </div>
    </>
};

export default UploadNotePage;
