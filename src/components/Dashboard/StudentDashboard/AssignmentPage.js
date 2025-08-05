import React, { useEffect, useReducer } from 'react';
import {
    FaArrowLeft, 
    FaEye,       
    FaUpload     
} from 'react-icons/fa';
import './AssignmentPage.css'; 
import Endpoint from '../../apis/Endpoint';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignmentsPage = () => {
    let navigate = useNavigate();
    const [state,dispatch] = useReducer((state,action)=>{
        if(action.type == "set-assignment"){
            state.assignmentList = action.payload;
        }
        return {...state};
    },{
        assignmentList: []
    })
    useEffect(()=>{
        loadAssignment();
    },[]);

    const loadAssignment = async()=>{
       try{ 
        let response = await axios.get(Endpoint.GET_ASSIGNMENT);
        console.log(response.data);
        
        dispatch({type:"set-assignment",payload:response.data});
       }
       catch(err){
        console.log(err);
       }
    }

    // Function to determine badge class based on status
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "Not Started":
                return "badge-not-started";
            case "In Progress":
                return "badge-in-progress";
            case "Submitted":
                return "badge-submitted";
            default:
                return "";
        }
    };

    const handleClick =() =>{
         navigate("/mainDashboard/submitAssignment")
    }

    return (
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top breadcrumb/navigation area */}
            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{color:"#0ABAB5",fontSize:"30px"}}>Assignments</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr/>

            {/* Page Title and Description */}
            <h2 className="mb-2 page-title">My Assignment</h2>
            <p className="text-muted mb-4 page-description">Track and submit your assignments</p>

            {/* Assignment Cards Grid */}
            <div className="row">
                {state?.assignmentList?.map((assignment, index) => (
                    <div className="col-12 mb-4" key={index}> {/* Full width for each assignment card*/}
                        <div className="card assignment-card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <h5 className="card-title-lg mb-0">{assignment?.title}</h5>
                                    <span className={`badge ${getStatusBadgeClass(assignment?.status)}`}>
                                        {assignment?.status}
                                    </span>
                                </div>
                                <p className="card-subtitle text-muted mb-2">
                                    <span className="subject-text">{assignment?.subject}</span>
                                    <span className="dot-separator"> • </span>
                                    <span>Due {assignment?.dueDate}</span>
                                </p>
                                <p className="card-text description-text">{assignment?.description}</p>
                                <div className="d-flex justify-content-start mt-3">
                                    <button className="btn btn-outline-info btn-sm mr-2">
                                        <FaEye className="mr-1" /> View Details
                                    </button>
                                    <button onClick={handleClick} className="btn btn-info btn-sm">
                                        <FaUpload className="mr-1" /> Submit Assignment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssignmentsPage;