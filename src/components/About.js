import React from 'react';
import {
    FaArrowLeft,
    FaUsers,        // Active Users
    FaSchool,       // Schools
    FaGlobe,        // Countries
    FaChartLine,    // Uptime
    FaBullseye,     // Mission
    FaEye,          // Vision
    FaHeart,        // Student-Centered
    FaLightbulb,    // Innovation
    FaHandshake,    // Collaboration
    FaShieldAlt,    // Privacy & Security
    FaUniversalAccess, // Accessibility
    FaChartArea     // Continuous Growth
} from 'react-icons/fa';
import './About.css'; // Assuming common dashboard styles

const AboutPage = () => {
    return (
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top breadcrumb/navigation area */}
            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
            </div>

            {/* Hero Section: Empowering Education */}
            <div className="about-hero-section text-center p-5 mb-5">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-lg-left mb-4 mb-lg-0">
                        <p className="hero-sub-title">Our Story</p>
                        <h1 className="hero-title">Empowering Education Through Technology</h1>
                        <p className="hero-text">
                            StudyMate was born from a simple belief: every student deserves access to quality education and every educator deserves tools that make teaching more effective and enjoyable.
                        </p>
                        <button className="btn btn-light hero-btn mt-3">Join Our Mission</button>
                    </div>
                    <div className="col-lg-6">
                        <div className="row g-3">
                            <div className="col-6">
                                <div className="card about-stat-card text-center p-3">
                                    <FaUsers className="stat-icon mb-2" />
                                    <h4 className="mb-0 stat-number">100K+</h4>
                                    <p className="text-muted mb-0 stat-label">Active Users</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card about-stat-card text-center p-3">
                                    <FaSchool className="stat-icon mb-2" />
                                    <h4 className="mb-0 stat-number">1000+</h4>
                                    <p className="text-muted mb-0 stat-label">Schools</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card about-stat-card text-center p-3">
                                    <FaGlobe className="stat-icon mb-2" />
                                    <h4 className="mb-0 stat-number">50+</h4>
                                    <p className="text-muted mb-0 stat-label">Countries</p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="card about-stat-card text-center p-3">
                                    <FaChartLine className="stat-icon mb-2" />
                                    <h4 className="mb-0 stat-number">99.9%</h4>
                                    <p className="text-muted mb-0 stat-label">Uptime</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission and Vision Section */}
            <div className="row g-4 mb-5">
                <div className="col-md-6">
                    <div className="card mission-vision-card p-4">
                        <div className="d-flex align-items-center mb-3">
                            <FaBullseye className="mission-vision-icon mr-3" />
                            <h5 className="mb-0 card-title">Our Mission</h5>
                        </div>
                        <p className="card-text">
                            To bridge the gap between traditional education and modern technology, creating an inclusive platform where learning is engaging, accessible, and effective for students and educators worldwide.
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card mission-vision-card p-4">
                        <div className="d-flex align-items-center mb-3">
                            <FaEye className="mission-vision-icon mr-3" />
                            <h5 className="mb-0 card-title">Our Vision</h5>
                        </div>
                        <p className="card-text">
                            A world where geographic, economic, and technological barriers don't limit access to quality education. We envision a future where every learner can reach their full potential through personalized, collaborative learning experiences.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="text-center mb-5">
                <h3 className="section-heading mb-2 core-values-heading">Our Core Values</h3>
                <p className="text-muted section-subheading mb-4">
                    The principles that guide everything we do at StudyMate
                </p>
                <div className="row g-4">
                    <div className="col-lg-4 col-md-6">
                        <div className="card core-value-card p-4">
                            <FaHeart className="core-value-icon mb-3" />
                            <h6 className="core-value-title">Student-Centered</h6>
                            <p className="card-text">Every decision we make is guided by what's best for learners and educators.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card core-value-card p-4">
                            <FaLightbulb className="core-value-icon mb-3" />
                            <h6 className="core-value-title">Innovation</h6>
                            <p className="card-text">We constantly push boundaries to create better learning experiences.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card core-value-card p-4">
                            <FaHandshake className="core-value-icon mb-3" />
                            <h6 className="core-value-title">Collaboration</h6>
                            <p className="card-text">Education is a team effort. We foster connection and community.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card core-value-card p-4">
                            <FaShieldAlt className="core-value-icon mb-3" />
                            <h6 className="core-value-title">Privacy & Security</h6>
                            <p className="card-text">Protecting student data and privacy is our highest priority.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card core-value-card p-4">
                            <FaUniversalAccess className="core-value-icon mb-3" />
                            <h6 className="core-value-title">Accessibility</h6>
                            <p className="card-text">Quality education should be accessible to everyone, everywhere.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card core-value-card p-4">
                            <FaChartArea className="core-value-icon mb-3" />
                            <h6 className="core-value-title">Continuous Growth</h6>
                            <p className="card-text">We're always learning and improving, just like our users.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;