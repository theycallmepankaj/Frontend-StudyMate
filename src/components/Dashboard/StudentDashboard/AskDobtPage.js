import React, { useState } from 'react';
import {
    FaArrowLeft 
} from 'react-icons/fa';
import './AskDoubtPage.css'; 
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';
import { getCurrentUser } from '../../auth/Auth';
function AskQuestionPage(){
    const user = getCurrentUser();
    const [state, setState] = useState({
            subject: "",
            priority: "",
            questionTitle: "",
            detailedDescription: "",
            askedBy: user._id
    });
    console.log("user id : ",user._id);
    

    const handleSubmit = async (e) => {
    e.preventDefault();

    const doubtPayload = {
        question: state.questionTitle,
        subject: state.subject,
        description: state.detailedDescription,
        askedBy: user._id
    };

    try {
        const response = await axios.post(Endpoint.ASK_QUESTIONS, doubtPayload, {withCredentials: true});
        toast.success(response.data.message);
        console.log("response: ", response);

        setState({
            subject: "",
            priority: "",
            questionTitle: "",
            detailedDescription: "",
            askedBy: user._id
        });
    } catch (err) {
        if (err.response) {
            console.log("Backend error:", err.response.data);
            toast.error(err.response.data.Message || "Something went wrong.");
        } else {
            console.error("Client error:", err.message);
            toast.error("Oops! Something went wrong.");
        }
    }
};

    return <>
        <ToastContainer/>
        <div className="container-fluid py-4 dashboard-content-container">
            
            <div className="d-flex align-items-center mb-4">
                <a href="/mainDashboard/doubtPage" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Doubts
                </a>
            </div>

            
            <h2 className="mb-2 page-title">Ask a Question</h2>
            <p className="text-muted mb-4 page-description">Get help from your teachers and classmates</p>

           
            <div className="card submit-doubt-card" style={{borderRadius:"20px"}}>
                <div className="card-body p-4">
                    <h5 className="card-title-lg mb-2">Submit Your Doubt</h5>
                    <p className="text-muted mb-4">Provide clear details to get the best help</p>

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-2">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label htmlFor="subjectSelect" className="form-label">Subject</label>
                                <select
                                    id="subjectSelect"
                                    className="form-control p-2"
                                    value={state.subject}
                                    onChange={(e) => setState({...state,subject:e.target.value})}
                                    required
                                >
                                    <option value="">Select subject</option>
                                    <option value="Java">Java</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="SoftSkill">SoftSkill</option>
                                    <option value="Aptitude">Aptitude</option>
                                    <option value="Computer Science">Computer Science</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="prioritySelect" className="form-label">Priority</label>
                                <select
                                    id="prioritySelect"
                                    className="form-control  p-2"
                                    value={state.priority}
                                    onChange={(e) => setState({...state,priority:e.target.value})}
                                    required
                                >
                                    <option value="">Select priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="questionTitle" className="form-label">Question Title</label>
                            <input
                                type="text"
                                id="questionTitle"
                                className="form-control"
                                placeholder="Brief, descriptive title for your question"
                                value={state.questionTitle}
                                onChange={(e) => setState({...state,questionTitle:e.target.value})}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="detailedDescription" className="form-label">Detailed Description</label>
                            <textarea
                                id="detailedDescription"
                                className="form-control"
                                rows="5"
                                placeholder="Explain your question in detail. Include what you've tried and where you're stuck."
                                value={state.detailedDescription}
                                onChange={(e) => setState({...state,detailedDescription:e.target.value})}
                                required
                            ></textarea>
                        </div>

                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-outline-secondary mr-2">Cancel</button>
                            <button type="submit" className="btn btn-info" style={{backgroundColor:"#0ABAB5"}}>Submit Question</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
};

export default AskQuestionPage;