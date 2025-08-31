import React, { useState } from 'react';
import {
    FaArrowLeft,
    FaEnvelope,     
    FaComments,     
    FaPhone,        
    FaQuestionCircle, 
    FaPaperPlane   
} from 'react-icons/fa';
import './contact.css'; 
const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        role: '',
        category: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Your message has been sent!");
        // Reset form
        setFormData({
            fullName: '',
            email: '',
            role: '',
            category: '',
            subject: '',
            message: ''
        });
    };

    return (
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top breadcrumb/navigation area */}
            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
            </div>

            {/* We're Here to Help You Succeed Section */}
            <div className="help-succeed-section text-center mb-5" style={{padding:"6%"}}>
                <h2 className="mb-3">We're Here to Help You Succeed</h2>
                <p className="mb-4">
                    Have questions about StudyMate? Need support? Want to share feedback? Our team is ready to assist you on your educational journey.
                </p>
                {/* <div className="d-flex justify-content-center">
                    <button className="btn btn-light live-chat-btn mr-3">Start Live Chat</button>
                    <button className="btn btn-outline-light contact-us-btn">Contact Us</button>
                </div> */}
            </div>

            {/* Multiple Ways to Reach Us Section */}
            <div className="text-center mb-5">
                <h3 className="section-heading mb-2">Multiple Ways to Reach Us</h3>
                <p className="text-muted section-subheading">Choose the method that works best for you</p>
                <div className="row mt-4">
                    <div className="col-lg-3 col-md-3 mb-4">
                        <div className="card reach-us-card email-card text-center p-4">
                            <FaEnvelope className="reach-us-icon mb-3" />
                            <h5 className="card-title">Email Support</h5>
                            <p className="card-text text-muted">Get help via email within 24 hours</p>
                            <a href="mailto:support@studymate.com" className="reach-us-link">support@studymate.com</a>
                            <button className="btn btn-outline-info btn-sm mt-3">Send Email</button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 mb-4">
                        <div className="card reach-us-card live-chat-card text-center p-4">
                            <FaComments className="reach-us-icon mb-3" />
                            <h5 className="card-title">Live Chat</h5>
                            <p className="card-text text-muted">Chat with our support team in real time</p>
                            <p className="text-info-small">Available 9 AM - 6 PM EST</p>
                            <button className="btn btn-outline-info btn-sm mt-3">Start Chat</button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 mb-4">
                        <div className="card reach-us-card phone-card text-center p-4">
                            <FaPhone className="reach-us-icon mb-3" />
                            <h5 className="card-title">Phone Support</h5>
                            <p className="card-text text-muted">Speak directly with our team</p>
                            <a href="tel:+16501234567" className="reach-us-link">+1 (650) 123-4567</a>
                            <button className="btn btn-outline-info btn-sm mt-3">Call Now</button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 mb-4">
                        <div className="card reach-us-card help-center-card text-center p-4">
                            <FaQuestionCircle className="reach-us-icon mb-3" />
                            <h5 className="card-title">Help Center</h5>
                            <p className="card-text text-muted">Browse our comprehensive documentation</p>
                            <a href="#" className="reach-us-link">help.studymate.com</a>
                            <button className="btn btn-outline-info btn-sm mt-3">Visit Help Center</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Send Us a Message Form Section */}
            <div className="message-form-section text-center mb-5">
                <h3 className="section-heading mb-2">Send Us a Message</h3>
                <p className="text-muted section-subheading mb-4">
                    Fill out the form below and we'll get back to you within 24 hours.
                </p>
                <div className="card message-form-card p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="fullName" className="form-label required">Full Name</label>
                                <input type="text" id="fullName" name="fullName" className="form-control" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="email" className="form-label required">Email Address</label>
                                <input type="email" id="email" name="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="role" className="form-label required">I am a</label>
                                <select id="role" name="role" className="form-control p-2" value={formData.role} onChange={handleChange} required>
                                    <option value="">Select your role</option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="parent">Parent</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="category" className="form-label required">Category</label>
                                <select id="category" name="category" className="form-control p-2" value={formData.category} onChange={handleChange} required>
                                    <option value="">Select category</option>
                                    <option value="technical">Technical Support</option>
                                    <option value="billing">Billing Inquiry</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="general">General Question</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label required">Subject</label>
                            <input type="text" id="subject" name="subject" className="form-control" placeholder="Brief description of your inquiry" value={formData.subject} onChange={handleChange} required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="form-label required">Message</label>
                            <textarea id="message" name="message" className="form-control" rows="5" placeholder="Please provide detailed information about your inquiry..." value={formData.message} onChange={handleChange} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-info send-message-btn w-100">
                            <FaPaperPlane className="mr-2" /> Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;