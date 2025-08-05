import React, { useState } from 'react';
import {
    FaArrowLeft,      
    FaCloudUploadAlt,   
    FaPlus             
} from 'react-icons/fa';
import './CreateAssigment.css'; 
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';
import { toast, ToastContainer } from 'react-toastify';
import { getCurrentUser } from '../../auth/Auth';

function CreateAssignmentPage() {
    const user = getCurrentUser();
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        dueDate: "",
        description: "",
        createdBy: user._id,
        attachment: null
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({...prevData,[name]: value}));
    };

    const handleFileChange = (event) => {
        setFormData(prevData => ({...prevData,attachment: event.target.files[0]}));
    };

    const handleSubmit = async(event) => {
        try{
        event.preventDefault();
        let response = await axios.post(Endpoint.CREATE_ASSIGNMENT,formData,{withCredentials: true});
        console.log("Submitting new assignment:", response);
        toast.success("Assignment Created Successfully..")
        }
        catch(err){
            console.log(err);
            toast.error("Oops! Something went Wrong..");
        }
    };

    const handleCancel = () => {
        // Reset form or navigate back
        setFormData({
            title: "",
            subject: "",
            class: "",
            dueDate: "",
            description: "",
            attachment: null
        });
        alert("Assignment creation cancelled.");
    };

    return <>
        <ToastContainer/>
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top breadcrumb/navigation area */}
            <div className="d-flex align-items-center mb-4">
                <a href="/teacherDashboard/teaAssignment" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Assignments
                </a>
            </div>

            {/* Page Title and Description */}
            <h2 className="mb-2 page-title">Create New Assignment</h2>
            <p className="text-muted mb-4 page-description">Set up a new assignment for your students</p>

            {/* Assignment Details Form Card */}
            <div className="card assignment-form-card p-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <h5 className="form-section-title mb-2">Assignment Details</h5>
                        <p className="form-section-description text-muted">Fill in the information for your new assignment</p>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="title" className="form-label">Assignment Title</label>
                            <input type="text" id="title" name="title" className="form-control" placeholder="Enter assignment title" onChange={handleChange} value={formData.title} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <select id="subject" name="subject" className="form-control" onChange={handleChange} value={formData.subject} required>
                                <option value="">Select subject</option>
                                <option value="Mathematics">Java</option>
                                <option value="Physics">JavaScript</option>
                                <option value="Chemistry">SoftSkill</option>
                                <option value="English">Aptitude</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-4">
                        {/* <div className="col-md-4 mb-3">
                            <label htmlFor="class" className="form-label">Class</label>
                            <select id="class" name="class" className="form-control" onChange={handleChange} value={formData.class} required>
                                <option value="">Select class</option>
                                <option value="Class 10">Class 10</option>
                                <option value="Class 11">Class 11</option>
                                <option value="Class 12">Class 12</option>
                            </select>
                        </div> */}
                        <div className="col-md-4 mb-3">
                            <label htmlFor="dueDate" className="form-label">Due Date</label>
                            <input type="date" id="dueDate" name="dueDate" className="form-control" onChange={handleChange} value={formData.dueDate} required />
                        </div>
                        {/* <div className="col-md-4 mb-3">
                            <label htmlFor="totalPoints" className="form-label">Total Points</label>
                            <input type="number" id="totalPoints" name="totalPoints" className="form-control" value={formData.totalPoints} onChange={handleChange} />
                        </div> */}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="instructions" className="form-label">Instructions</label>
                        <textarea id="instructions" name="description" className="form-control" rows="4" placeholder="Provide detailed instructions for the assignment..." onChange={handleChange} value={formData.instructions} required></textarea>
                    </div>

                    <div className="mb-5">
                        <h5 className="form-section-title mb-2">Attachment (Optional)</h5>
                        <div className="attachment-upload-box text-center p-4">
                            <FaCloudUploadAlt className="upload-icon mb-2" />
                            <p className="text-muted mb-2">Drop files here or click to upload</p>
                            <input type="file" id="file-upload" className="d-none" onChange={handleFileChange} />
                            <label htmlFor="file-upload" className="btn btn-outline-info choose-files-btn">
                                Choose Files
                            </label>
                            {formData.attachment && <p className="mt-2 text-success">File selected: {formData.attachment.name}</p>}
                        </div>
                    </div>

                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-secondary mr-2" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="btn btn-info">
                            Create Assignment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
};

export default CreateAssignmentPage;