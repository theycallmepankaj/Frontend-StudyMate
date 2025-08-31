import React from 'react';
import {
    FaArrowLeft,
    FaComments,        // Smart Doubt Resolution
    FaCheckSquare,     // Assignment Management
    FaBookOpen,        // Digital Notes Library
    FaUsers,           // Collaborative Learning
    FaChartLine,       // Progress Tracking
    FaShieldAlt        // Secure Platform
} from 'react-icons/fa';
import './Features2.css'; // Assuming common dashboard styles

const FeaturesPage = () => {
    // Array of feature objects
    const features = [
        {
            icon: FaComments,
            title: "Smart Doubt Resolution",
            description: "Get instant help from teachers and peers with our intelligent Q&A system.",
            color: "#e0f7fa" // Light blue
        },
        {
            icon: FaCheckSquare,
            title: "Assignment Management",
            description: "Streamlined assignment creation, submission, and grading workflow.",
            color: "#e8f8f3" // Light green
        },
        {
            icon: FaBookOpen,
            title: "Digital Notes Library",
            description: "Access comprehensive study materials and share resources seamlessly.",
            color: "#f3f0ff" // Light purple
        },
        {
            icon: FaUsers,
            title: "Collaborative Learning",
            description: "Connect with classmates and teachers through integrated chat system.",
            color: "#fff3e0" // Light orange
        },
        {
            icon: FaChartLine,
            title: "Progress Tracking",
            description: "Monitor academic performance with detailed analytics and insights.",
            color: "#f0f8ff" // Another light blue
        },
        {
            icon: FaShieldAlt,
            title: "Secure Platform",
            description: "Your data is protected with enterprise-grade security measures.",
            color: "#f8e0ff" // Another light purple
        },
    ];

    return (
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top navigation/breadcrumb area */}
            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-5">
                <h1 className="features-hero-title">Everything You Need to Excel</h1>
                <p className="text-muted features-hero-subtitle">
                    Powerful tools designed to enhance learning outcomes for both students and educators
                </p>
            </div>

            {/* Features Grid */}
            <div className="row g-4">
                {features.map((feature, index) => (
                    <div className="col-lg-4 col-md-6" key={index}>
                        <div className="card feature-card h-100" style={{ backgroundColor: feature.color }}>
                            <div className="card-body p-4">
                                <div className="feature-icon-wrapper mb-3">
                                    <feature.icon className="feature-icon" />
                                </div>
                                <h5 className="card-title feature-title mb-2">{feature.title}</h5>
                                <p className="card-text feature-description">{feature.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesPage;