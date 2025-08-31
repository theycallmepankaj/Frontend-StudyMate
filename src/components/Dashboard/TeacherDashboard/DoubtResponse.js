import React, { useEffect, useReducer, useState } from 'react';
import { FaArrowLeft, FaReply } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import './DoubtResponse.css';
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';
import { getCurrentUser } from '../../auth/Auth';
import { toast, ToastContainer } from 'react-toastify';

function DoubtResponsePage() {
   
    const { doubtId } = useParams();
    const user = getCurrentUser();
    const [doubtDetails, setDoubtDetails] = useState({
        title: "How does photosynthesis work?",
        question: "Could someone please explain the process of photosynthesis in simple terms? I'm having trouble understanding the light-dependent and light-independent reactions.",
        postedBy: "John Doe",
        subject: "Biology"
    });


    console.log("user data : ",user)
    const [formData, setFormData] = useState({
        answerText: '',
        answerBy: user?._id
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post(
            `${Endpoint.DOUBT_RESPONSE}/${doubtId}`,
            formData,
            { withCredentials: true }
        );
        console.log('Submitting answer for doubt:', res.data);
        toast.success("Doubt Response Successfully!");
        
        setFormData({
            answerText: '',
            answerBy: user?._id  
        });
    } catch (err) {
        console.error("Error submitting answer:", err.response?.data || err.message);
        toast.error("Oops! Something went wrong.. ")
    }
};

    return <>
    <ToastContainer/>
        <div className="container-fluid py-4 dashboard-content-container">
           
            <div className="d-flex align-items-center mb-4">
                <Link to="/TeacherDashboard/solveDoubt" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Doubts
                </Link>
            </div>

            {/* Original Doubt Details Card */}
            {/* <div className="doubt-details-card mb-4 p-4">
                <h2 className="doubt-details-title mb-2">{doubtDetails.title}</h2>
                <div className="d-flex align-items-center mb-3 text-muted doubt-details-meta">
                    <span>Posted by: <strong>{doubtDetails.postedBy}</strong></span>
                    <span className="dot-separator">·</span>
                    <span>Subject: <strong>{doubtDetails.subject}</strong></span>
                </div>
                <p className="doubt-details-question">{doubtDetails.question}</p>
            </div> */}

            {/* Response Form Section */}
            <div className="response-form-card p-4">
                <h1 className="response-form-title">Post Your Response</h1>
                <p className="response-form-subtitle">Help your fellow student by providing a clear and helpful answer.</p>

                <form onSubmit={handleSubmit} className="mt-4">
                    {/* <div className="form-group mb-3">
                        <label htmlFor="answerBy" className="form-label">Answer By (Your Name)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="answerBy"
                            name="answerBy"
                            value={formData.answerBy}
                            onChange={handleChange}
                            placeholder="e.g., Jane Smith"
                            required
                        />
                    </div> */}

                    <div className="form-group mb-4">
                        <label htmlFor="answerText" className="form-label">Your Answer</label>
                        <textarea
                            className="form-control"
                            id="answerText"
                            name="answerText"
                            value={formData.answerText}
                            onChange={handleChange}
                            rows="8"
                            placeholder="Type your detailed answer here..."
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary response-submit-btn">
                        <FaReply className="mr-2" /> Submit Answer
                    </button>
                </form>
            </div>
        </div>
    </>
};

export default DoubtResponsePage;