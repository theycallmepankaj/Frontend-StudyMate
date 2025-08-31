import React, { useState } from 'react';
import { FaArrowLeft, FaBullhorn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Announcement.css';
import { getCurrentUser } from '../../auth/Auth';
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';
import { toast, ToastContainer } from 'react-toastify';

function PostAnnouncementPage(){
    const user = getCurrentUser();
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        postedBy: user._id
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const response = axios.post(Endpoint.POST_ANNOUNCEMENT,formData,{withCredentials:true})
        console.log('Submitting announcement:', formData);
        toast.success("Announcement Posted Successfully!");
        setFormData({
            title: '',
            message: ''
        });
    };

    return <>
    <ToastContainer/>
        <div className="container-fluid py-4 dashboard-content-container">
          
            <div className="d-flex align-items-center mb-4">
                <Link to="/TeacherDashboard/Teadashboard" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Dashboard
                </Link>
            </div>

         
            <div className="announcement-card p-4">
                <h1 className="announcement-title">Post New Announcement</h1>
                <p className="announcement-subtitle">Share important updates with your students and colleagues.</p>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="form-group mb-3">
                        <label htmlFor="title" className="form-label">Announcement Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Important Exam Date Change"
                            required
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="8"
                            placeholder="Write your detailed announcement here..."
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary post-submit-btn">
                        <FaBullhorn className="mr-2" /> Post Announcement
                    </button>
                </form>
            </div>
        </div>
    </>
};

export default PostAnnouncementPage;