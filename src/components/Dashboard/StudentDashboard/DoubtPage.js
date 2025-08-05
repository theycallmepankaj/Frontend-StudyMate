import React, { useEffect, useReducer } from 'react';
import './DoubtPage.css';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Endpoint, { BASE_URL } from '../../apis/Endpoint';
import axios from 'axios';
import { getCurrentUser } from '../../auth/Auth';

const DoubtPage = () => {
   let user = getCurrentUser();
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "set-doubts":
                return { ...state, doubtList: action.payload };
            default:
                return state;
        }
    }, {
        doubtList: []
    })
    useEffect(() => {
        loadDoubts();
    }, []);

    const loadDoubts = async () => {
        try {
            let response = await axios.get(Endpoint.GET_DOUBTS, { withCredentials: true });
            console.log("Response Data : ", response);

            dispatch({ type: "set-doubts", payload: response.data["All Doubts"] });
        }
        catch (err) {
            console.log(err);
        }
    }

    return <>
        <div className="container-fluid py-4 doubts-page-content">
            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{ color: "#0ABAB5", fontSize: "30px" }}>Doubts</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr />

            <div style={{ display: "flex", justifyContent: "center", gap: "59%" }}>
                <div>
                    <h3 className="mb-3 mt-4">My Doubts</h3>
                    <p className="text-muted mb-4">Ask questions and get help from teachers</p>
                </div>
                <div style={{ marginTop: "2%" }}>
                    <Link to={"/mainDashboard/askQuestion"} style={{ backgroundColor: "#0ABAB5", color: "white", borderRadius: "10px", border: "none", fontWeight: "bolder", padding: "5px", textDecoration: "none" }}> <FaPlus style={{ alignItems: "center", marginTop: "1px", marginBottom: "2px", marginRight: "5px" }} />Ask Question</Link>
                </div>
            </div>


            {state?.doubtList?.map((doubt, index) => (<div className="card doubt-card mb-3" key={index}>
                <div className="card-body d-flex">
                    <div className="doubt-avatar mr-3">
                        <img
                            src={BASE_URL + "/profile/" + user?.profile?.imageName}
                            alt="Profile"
                            className="rounded-circle"
                            width={60}
                            height={60}
                        />
                    </div>
                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start">
                            <h5 className="card-title mb-1">{doubt?.question}</h5>
                            <span className="badge badge-pending">Pending</span>
                        </div>
                        <p className="card-subtitle text-muted mb-2">{doubt?.subject} •  {doubt?.createdAt}</p>
                        <p className="card-text">
                            {doubt?.description}
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">0 responses</small>
                            <span className="badge badge-info-outline">{doubt?.subject}</span>
                        </div>
                    </div>
                </div>
            </div>))}





        </div>
    </>
};

export default DoubtPage;