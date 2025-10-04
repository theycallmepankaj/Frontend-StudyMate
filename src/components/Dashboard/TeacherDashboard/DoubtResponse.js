import React, { useState } from 'react';
import { FaArrowLeft, FaReply, FaUserCircle, FaBookOpen } from 'react-icons/fa';
import { Link, useParams, useLocation } from 'react-router-dom';
import './DoubtResponse.css';
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';
import { getCurrentUser } from '../../auth/Auth';
import { toast, ToastContainer } from 'react-toastify';

function DoubtResponsePage() {
    const { doubtId } = useParams();
    const { state } = useLocation(); 
    const user = getCurrentUser();

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
            toast.success("Response submitted successfully!");
            
            setFormData({
                answerText: '',
                answerBy: user?._id  
            });
        } catch (err) {
            console.error("Error submitting answer:", err.response?.data || err.message);
            toast.error(" Oops! Something went wrong.. ")
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container py-4 dashboard-content-container">

                
                <div className="d-flex align-items-center mb-4">
                    <Link to="/TeacherDashboard/solveDoubt" className="back-link d-flex align-items-center text-decoration-none">
                        <FaArrowLeft className="mr-2" /> Back to Doubts
                    </Link>
                </div>

                <div className="row">
                    
                    <div className="col-md-6 mb-4">
                        <div className="card shadow-sm border-0 rounded-lg">
                            <div className="card-body">
                                <h4 className="mb-3 text-info">
                                    <FaBookOpen className="mr-2" /> Student Doubt
                                </h4>
                                <h5 className="doubt-details-title">{state?.title}</h5>
                                {/* <p className="text-muted mb-2">
                                    Doubt ID: <strong>{doubtId}</strong>
                                </p> */}
                                <div className="d-flex align-items-center text-muted mb-3">
                                    <FaUserCircle className="mr-2" size={22} />
                                    <span>Asked by: <strong>{state?.askedBy || "Unknown Student"}</strong></span>
                                </div>
                                <span className="material-card-subject mr-2">{state?.subject}</span>
                            </div>
                        </div>
                    </div>

                    {/* Response Form Section */}
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 rounded-lg">
                            <div className="card-body">
                                <h4 className="mb-3 text-success">
                                    <FaReply className="mr-2" /> Post Your Response
                                </h4>
                                <p className="text-muted">
                                    Help your student by providing a clear and helpful answer.
                                </p>

                                <form onSubmit={handleSubmit} className="mt-3">
                                    <div className="form-group mb-3">
                                        <label htmlFor="answerText" className="form-label font-weight-bold">Your Answer</label>
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

                                    <button type="submit" className="btn btn-primary btn-lg px-4">
                                        <FaReply className="mr-2" /> Submit Answer
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default DoubtResponsePage;
