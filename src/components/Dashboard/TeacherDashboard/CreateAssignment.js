import React, { useState, useEffect } from 'react';
import {
    FaArrowLeft,
    FaCloudUploadAlt,
} from 'react-icons/fa';
import './CreateAssigment.css';
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';
import { toast, ToastContainer } from 'react-toastify';
import { getCurrentUser } from '../../auth/Auth';

function CreateAssignmentPage() {
    const user = getCurrentUser();
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]); // multiple students

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        dueDate: "",
        description: "",
        createdBy: user._id,
        attachment: null,
        assignType: "all", // all | multiple
    });

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get("http://localhost:3000/user", { withCredentials: true });
                const allUsers = res.data.findUser || [];
                const onlyStudents = allUsers.filter((u) => u.role === "student");
                setStudents(onlyStudents);
            } catch (err) {
                console.error("Error fetching students", err);
            }
        };
        fetchStudents();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (event) => {
        setFormData(prevData => ({ ...prevData, attachment: event.target.files[0] }));
    };

    const handleCheckboxChange = (studentId) => {
        setSelectedStudents((prev) =>
            prev.includes(studentId)
                ? prev.filter((id) => id !== studentId) // remove
                : [...prev, studentId] // add
        );
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = students.map((s) => s._id);
            setSelectedStudents(allIds);
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("subject", formData.subject);
            data.append("dueDate", formData.dueDate);
            data.append("description", formData.description);
            data.append("createdBy", formData.createdBy);
            data.append("assignType", formData.assignType);

            if (formData.assignType === "multiple" && selectedStudents.length > 0) {
                selectedStudents.forEach((id) => {
                    data.append("studentIds", id);
                });
            }

            if (formData.attachment) {
                data.append("attachment", formData.attachment);
            }

            let response = await axios.post(Endpoint.CREATE_ASSIGNMENT, data, { withCredentials: true });
            console.log("Submitting new assignment:", response);
            toast.success("Assignment Created Successfully!");


            setFormData({
                title: "",
                subject: "",
                dueDate: "",
                description: "",
                createdBy: user._id,
                attachment: null,
                assignType: "all",
            });
            setSelectedStudents([]);


            document.getElementById("file-upload").value = "";

        } catch (err) {
            console.log(err);
            toast.error("Oops! Something went Wrong..");
        }
    };

    const handleCancel = () => {
        setFormData({
            title: "",
            subject: "",
            dueDate: "",
            description: "",
            createdBy: user._id,
            attachment: null,
            assignType: "all",
        });
        setSelectedStudents([]);
        alert("Assignment creation cancelled.");
    };

    return (
        <>
            <ToastContainer />
            <div className="container-fluid py-4 dashboard-content-container">
                <div className="d-flex align-items-center mb-4">
                    <a href="/teacherDashboard/teaAssignment" className="back-link d-flex align-items-center text-decoration-none">
                        <FaArrowLeft className="mr-2" /> Back to Assignments
                    </a>
                </div>

                <h2 className="mb-2 page-title">Create New Assignment</h2>
                <p className="text-muted mb-4 page-description">Set up a new assignment for your students</p>

                <div className="card assignment-form-card p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="title" className="form-label">Assignment Title</label>
                                <input type="text" id="title" name="title" className="form-control"
                                    placeholder="Enter assignment title"
                                    onChange={handleChange} value={formData.title} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <select id="subject" name="subject" className="form-control p-2"
                                    onChange={handleChange} value={formData.subject} required>
                                    <option value="">Select subject</option>
                                    <option value="Java">Java</option>
                                    <option value="JavaScript">JavaScript</option>
                                    <option value="SoftSkill">SoftSkill</option>
                                    <option value="Aptitude">Aptitude</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="dueDate" className="form-label">Due Date</label>
                                <input type="date" id="dueDate" name="dueDate"
                                    className="form-control"
                                    onChange={handleChange} value={formData.dueDate} required />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="form-label">Instructions</label>
                            <textarea id="description" name="description" className="form-control"
                                rows="4" placeholder="Provide detailed instructions for the assignment..."
                                onChange={handleChange} value={formData.description} required></textarea>
                        </div>

                        {/* 🔹 Assign To Section */}
                        <div className="mb-4">
                            <label className="form-label">Assign To</label>
                            <select
                                name="assignType"
                                className="form-control p-2"
                                value={formData.assignType}
                                onChange={handleChange}
                            >
                                <option value="all">All Students</option>
                                <option value="multiple">Multiple Students</option>
                            </select>
                        </div>

                        {/* Multiple students checkbox list */}
                        {formData.assignType === "multiple" && (
                            <div className="mb-4">
                                <div className="form-check mb-2">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="selectAll"
                                        onChange={handleSelectAll}
                                        checked={selectedStudents.length === students.length}
                                    />
                                    <label htmlFor="selectAll" className="form-check-label">
                                        Select All
                                    </label>
                                </div>
                                {students.map(st => (
                                    <div key={st._id} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={st._id}
                                            checked={selectedStudents.includes(st._id)}
                                            onChange={() => handleCheckboxChange(st._id)}
                                        />
                                        <label htmlFor={st._id} className="form-check-label">
                                            {st.name} ({st.email})
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}

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
    );
};

export default CreateAssignmentPage;
