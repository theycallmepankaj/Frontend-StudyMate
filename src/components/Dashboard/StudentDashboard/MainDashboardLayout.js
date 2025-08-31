import React from 'react';
import { Link, NavLink, Outlet, useNavigate} from 'react-router-dom'; 
import './Dashboard.css'; 


import {
    FaBookReader,    
    FaThLarge,      
    FaQuestionCircle,
    FaTasks,         
    FaClipboardList, 
    FaFileAlt,       
    FaComments,      
    FaBars,          
    FaSignOutAlt     
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';
// import { isUserExist } from '../../auth/Auth';

function MainDashboardLayout() {
    const navigate = useNavigate();
    const toggleSidebar = () => {
        const wrapper = document.getElementById('wrapper');
        if (wrapper) {
            wrapper.classList.toggle('toggled');
        }
    };
    const handleLogout = async(event)=>{
        try {
            let logout = await axios.delete(Endpoint.LOGOUT,{withCredentials:true})
             sessionStorage.setItem("current-user","");
             sessionStorage.clear();
             navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Oops! Something went wrong")
            
        }
       
    }
    return <>
    <ToastContainer />
        <div className="d-flex" id="wrapper">
            {/* Sidebar */}
            <div className="bg-white border-right" id="sidebar-wrapper">
                <div className="sidebar-heading d-flex align-items-center p-4">
                    <FaBookReader className="mr-2 text-info" size={24} />
                    <span className="font-weight-bold text-info">StudyMate</span>
                </div>
                <div className="list-group list-group-flush">
                  

            {/* <Link className={({ isActive }) =>
                            "list-group-item list-group-item-action bg-light" + (isActive ? " active" : "")
                    } to="/MainDashboard/dashboard"><FaThLarge className="mr-2" /> Dashboard</Link> */}
                    
                    <NavLink to="/MainDashboard/dashboard/getAnnouncementStu"  className={({ isActive }) => "list-group-item list-group-item-action bg-light" + (isActive ? " active" : "")}
                    >
                        <FaQuestionCircle className="mr-2" /> Dashboard
                    </NavLink>


                    <NavLink
                        to="/MainDashboard/doubtPage" 
                        className={({ isActive }) =>
                            "list-group-item list-group-item-action bg-light" + (isActive ? " active" : "")
                    }
                    >
                        <FaQuestionCircle className="mr-2" /> Ask Doubts
                    </NavLink>

                   
                    <NavLink
                        to="/MainDashboard/assignmentPage"
                        className={({ isActive }) =>
                            "list-group-item list-group-item-action bg-light" + (isActive ? " active" : "")
                    }
                    >
                        <FaTasks className="mr-2" /> Assignments
                    </NavLink>

                   
                    <NavLink
                        to="/MainDashboard/notesPage"
                        className={({ isActive }) =>
                            "list-group-item list-group-item-action bg-light" + (isActive ? " active" : "")
                    }
                    >
                        <FaClipboardList className="mr-2" /> Notes
                    </NavLink>

                  
                    {/* <NavLink
                        to="/MainDashboard/filesPage"
                        className={({ isActive }) =>
                            "list-group-item list-group-item-action bg-light" + (isActive ? " active" : "")
                    }
                    >
                        <FaFileAlt className="mr-2" /> Files
                    </NavLink> */}

                    
                    <NavLink
                        to="/MainDashboard/chatPage"
                        className={({ isActive }) =>
                            "list-group-item list-group-item-action bg-light" + (isActive ? " active" : "")
                    }
                    >
                        <FaComments className="mr-2" /> Chat
                    </NavLink>
                </div>
            </div>
           

           
            <div id="page-content-wrapper">
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <button className="btn btn-outline-info" id="menu-toggle" onClick={toggleSidebar}>
                        <FaBars />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                
                             <label onClick={handleLogout} className="nav-link text-info"><FaSignOutAlt className="mr-1" /> Logout</label>
                            </li>
                        </ul>
                    </div>
                </nav>

                
                <div className="container-fluid py-4">
                    <Outlet />
                </div>
            </div>
           
        </div>
    </>
};

export default MainDashboardLayout;