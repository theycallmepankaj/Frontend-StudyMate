import React, { useEffect, useState } from 'react';
import './Dashboard.css';

import {
    FaComments,
    FaUser,
    FaArrowLeft
} from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import Endpoint, { BASE_URL } from '../../apis/Endpoint';
import { getCurrentUser } from '../../auth/Auth';

// console.log("{`${BASE_URL}/user/profile/${currentUser?._id}/${currentUser?.profile?.imageName}`}")

function DashboardContent() {
    const [user, setUser] = useState(null);
    let currentUser = getCurrentUser();  
    console.log(currentUser)
    console.log("current user : ", currentUser.profile.imageName);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(Endpoint.USER_FATCH);
                if (res.data && res.data.user) {
                    setUser(res.data.user);
                } else {

                }
            } catch (error) {
                console.log("User fetch error:", error);

            }
        };
        fetchUser();
    }, []);


    return <>
        {/* <Outlet /> */}
        <div className="container-fluid dashboard-page-content py-4">

            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{ color: "#0ABAB5", fontSize: "30px" }}>Student Dashboard</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
            <hr />

            <div className="row mb-4">
                <div className="col-12">
                    <div className="card welcome-card p-5" style={{ borderRadius: "20px" }}>
                        <div className="d-flex align-items-center" style={{ gap: "2%" }}>
                            <div><img
                                src={BASE_URL+"/profile/"+currentUser?.profile?.imageName}
                                className="rounded-circle"
                                width="60"
                                height="60"
                                alt="Profile"
                            />
                            </div>
                            <div>
                                <h4 className="mb-1 text-white">Welcome, <b>{currentUser.name}</b> !</h4>
                                <p className="mb-0 text-white-50">Ready to continue your learning journey?</p>
                                {/* <p>{currentUser?.profile?.bio}</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row mb-4">
                <div className="col-12">
                    <ul className="nav nav-pills nav-fill dashboard-nav-tabs">
                        
                        <li className="nav-item">
                            <Link to="/mainDashboard/dashboard/getAnnouncementStu" className="nav-link " >
                                <FaComments className="mr-2" /> Announcements
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/mainDashboard/dashboard/studentProfile"} className="nav-link" >
                                <FaUser className="mr-2" /> Profile
                            </Link>
                        </li>
                    </ul>
                </div>
                    <Outlet /> 
            </div>

        </div>
    </>

};

export default DashboardContent;