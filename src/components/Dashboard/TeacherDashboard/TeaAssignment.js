import React, { useEffect, useReducer, useState } from 'react';
import {
    FaArrowLeft,
    FaRegFileAlt,
    FaRegClock,
    FaEye,
    FaPlus,
    FaTrash
} from 'react-icons/fa';
import './TeaAssignment.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';

function TeaAssignment() {
    const navigate = useNavigate();
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [searchTerm, setSearchTerm] = useState("");


    const [originalAssignments, setOriginalAssignments] = useState([]);

    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "set-assignments":
                return { ...state, AssignmentList: action.payload };
            default:
                return state;
        }
    }, {
        AssignmentList: []
    });

    useEffect(() => {
        loadAssignments();
    }, []);


    const loadAssignments = async () => {
        try {
            let response = await axios.get(Endpoint.TEACHER_ASSIGNMENT_STATS, { withCredentials: true });

            const data = response.data.stats || [];
            console.log("response data : ", response.data);
            setOriginalAssignments(data);
            dispatch({ type: "set-assignments", payload: data });
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    const applyFilter = () => {
        if (!startDate && !endDate) {
            dispatch({ type: "set-assignments", payload: originalAssignments });
            return;
        }

        const filtered = originalAssignments.filter((assignment) => {

            const assignmentDate = new Date(assignment.createdAt);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (start && end) {
                return assignmentDate >= start && assignmentDate <= end;
            } else if (start) {
                return assignmentDate >= start;
            } else if (end) {
                return assignmentDate <= end;
            }
            return true;
        });

        dispatch({ type: "set-assignments", payload: filtered });
    };


    const resetFilter = () => {
        setStartDate("");
        setEndDate("");
        dispatch({ type: "set-assignments", payload: originalAssignments });
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Active":
                return "assignment-badge-active";
            case "Completed":
                return "assignment-badge-completed";
            default:
                return "";
        }
    };

    const handleclick = () => {
        navigate("/teacherDashboard/createAssignment");
    };

    const handleDelete = async (_id) => {
       
        console.log("Assignment Id : ",_id);

        if (!window.confirm("Are you sure you want to delete this assignment?")) return;

        try {
            await axios.delete(`${Endpoint.DELETE_ASSIGNMENT}/${_id}`, {
                withCredentials: true,
            });
            alert("Assignment deleted successfully!");
            loadAssignments(); 
        } catch (err) {
            console.error(err);
            alert("Failed to delete assignment!");
        }
    };

    if (loading) return <p className="text-center mt-4 justify-content-center align-items-center">Loading assignments...</p>;

    return (
        <div className="container-fluid py-4 dashboard-content-container">

            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{ color: "#0ABAB5", fontSize: "30px" }}>Assignments</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr />

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-2 page-title">Manage Assignment</h2>
                    <p className="text-muted page-description">Create and track student assignments</p>
                </div>
                <button onClick={handleclick} className="btn btn-info create-assignment-btn">
                    <FaPlus className="mr-1" /> Create Assignment
                </button>
            </div>


            <div className="d-flex align-items-center mb-4">
                <div className='d-flex'>
                    <h4 className='mr-2'>From</h4>
                    <input
                        type="date"
                        className="form-control mr-2"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className='d-flex'>
                    <h4 className='mr-2'>To</h4>
                    <input
                        type="date"
                        className="form-control mr-2"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button className="btn btn-info font-weight-bold" onClick={applyFilter}>Filter</button>
                <button className="btn btn-info font-weight-bold ml-2" onClick={resetFilter}>Reset</button>
            </div>

            {/* Summary Cards */}
            {/* <div className="row mb-4">
                <div className="col-lg-6 mb-3">
                    <div className="card summary-card p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="summary-title">Active Assignments</h5>
                                <h3 className="summary-number">
                                    {state?.AssignmentList?.filter(a => a?.status === "Active").length}
                                </h3>
                            </div>
                            <FaRegFileAlt className="summary-icon" />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="card summary-card p-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="summary-title">Total Submissions</h5>
                                <h3 className="summary-number">
                                    {state?.AssignmentList?.reduce((acc, a) => acc + a?.totalStudentsSubmitted, 0)}
                                </h3>
                            </div>
                            <FaRegClock className="summary-icon" />
                        </div>
                    </div>
                </div>
            </div> */}

            
            <div className="row">
                {state?.AssignmentList?.map((assignment, index) => (
                    <div className="col-12 mb-4" key={index}>
                        <div className="card assignment-item-card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h5 className="card-title-lg mb-0"> • {assignment?.title}</h5>
                                        <p className="card-subtitle text-muted mt-2">
                                            <span>
                                                <strong>Create Date : </strong>{" "}
                                                {new Date(assignment?.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className="dot-separator mt-2"> • </span>
                                            <span>
                                                <strong>Due Date : </strong>{" "}
                                                {new Date(assignment?.dueDate).toLocaleDateString()}
                                            </span>
                                        </p>
                                    </div>
                                    <span className="badge assignment-badge-active">
                                        {assignment?.subject}
                                    </span>
                                </div>


                                <div className="row text-center mt-3 mb-3">
                                    <div className="col-4 ">
                                        <h4 className="metric-number text-submitted justify-content-center align-items-center">
                                            {assignment?.submittedCount || 0}
                                        </h4>
                                        <small className="text-muted">Submitted</small>
                                    </div>
                                    <div className="col-4">
                                        <h4 className="metric-number text-pending justify-content-center align-items-center">
                                            {assignment?.pendingCount || 0}
                                        </h4>
                                        <small className="text-muted">Pending</small>
                                    </div>
                                    <div className="col-4">
                                        <h4 className="metric-number text-total justify-content-center align-items-center">
                                            {assignment?.totalAssigned || 0}
                                        </h4>
                                        <small className="text-muted">Total Assigned</small>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button
                                        className="btn btn-info"
                                        onClick={() => setSelectedAssignment(assignment)}
                                    >
                                        <FaEye className="mr-1" /> View Students
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(assignment?.assignmentId)}
                                    >
                                        <FaTrash className="mr-1" /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {selectedAssignment && (
                <div className="card mt-4">
                    <div className="card-body">
                        <h4>Students for: {selectedAssignment?.title}</h4>

                     
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Search by student name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <table className="table table-bordered mt-3">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Submitted At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedAssignment?.assignedStudents
                                    ?.filter(
                                        (s) =>
                                            s?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            s?.email?.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((s, i) => (
                                        <tr key={i}>
                                            <td>{s?.name}</td>
                                            <td>{s?.email}</td>
                                            <td
                                                className={
                                                    s?.status === "Submitted" ? "text-success" : "text-warning"
                                                }
                                            >
                                                {s?.status === "Submitted" ? "Submitted" : "Pending"}
                                            </td>
                                            <td>
                                                {s?.submittedAt
                                                    ? new Date(s.submittedAt).toLocaleString()
                                                    : "Not Submitted"}
                                            </td>
                                            <td>
                                                {s?.fileUrl ? (
                                                    <div className="d-flex">

                                                        <button
                                                            className="btn btn-sm btn-outline-info mr-2"
                                                            onClick={() => window.open(s.fileUrl, "_blank")}
                                                        >
                                                            <FaEye /> View
                                                        </button>

                                                        {/* Download button */}
                                                        <a
                                                            href={s.fileUrl}
                                                            download
                                                            className="btn btn-sm btn-outline-success"
                                                        >
                                                            <FaRegFileAlt /> Download
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted">No File</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>

                        <button
                            className="btn btn-secondary mt-2"
                            onClick={() => {
                                setSelectedAssignment(null);
                                setSearchTerm("");
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TeaAssignment;
