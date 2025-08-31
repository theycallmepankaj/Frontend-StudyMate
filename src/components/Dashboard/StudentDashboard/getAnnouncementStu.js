import React, { useEffect, useReducer } from 'react';
import { FaArrowLeft, FaUserCircle, FaClock, FaRemoveFormat, FaCross, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import './TeacherDashboard/GetAnnouncement.css';
import Endpoint from '../../apis/Endpoint';
import axios from 'axios';

function GetAllAnnouncementStuPage () {
    
const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "set-announcement":
                return { ...state, announcementList: action.payload };
            default:
                return state;
        }
    }, {
        announcementList: []
    })

    useEffect(() => {
        loadAnnouncement();
    }, []);

    const loadAnnouncement = async () => {
        try {
            let response = await axios.get(Endpoint.GET_ANNOUNCEMENT, { withCredentials: true });
            console.log("Response Data : ", response);

            dispatch({ type: "set-announcement", payload: response.data["All Announcement"] });
        }
        catch (err) {
            console.log(err);
        }
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // const handelcancel = async(event,id)=>{
    //     event.preventDefault();
    //     console.log("id : ",id)
    //      try{
    //         if(!id){
    //             return
    //         }
    //          let response = await axios.delete(`${Endpoint.DELETE_ANNOUNCEMENT}/${id}`,{withCredentials:true});
    //          alert("deleted successfully");
    //          loadAnnouncement()
    //      }catch(err){
    //         console.log(err);
    //      }
    // }


     console.log("announcement List : ",state?.announcementList);
    return <>
        <div className="container-fluid py-4 dashboard-content-container">
            
           
            <h1 className="announcement-list-title">All Announcements</h1>
            <p className="announcement-list-subtitle">Stay up to date with the latest news and updates.</p>

            
            <div className="announcement-list mt-4">
                {
                    state?.announcementList?.map((announcement) => (
                        <div key={announcement?.id} className="announcement-item card mb-4">
                            <div className="card-body">
                                {/* <div className='d-flex justify-content-between'> */}
                                <h5 className="announcement-item-title">{announcement?.title}</h5>
                                {/* <a onClick={(event)=> handelcancel(event,announcement._id)}  ><FaTimes style={{cursor:"pointer", fontSize:"22px",color:"red", fontWeight:"lighter"}}/></a> */}
                                {/* </div> */}
                                <p className="announcement-item-message">{announcement?.message}</p>
                                <div className="d-flex align-items-center text-muted announcement-meta mt-3">
                                    <FaUserCircle className="mr-2" />
                                    <span>Posted by: <strong>{announcement?.postedBy?.name}</strong></span>
                                    <span className="dot-separator">·</span>
                                    <FaClock className="mr-2" />
                                     <span>
                                        {new Date(announcement?.uploadedAt).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
               }
            </div>
        </div>
   </>
};

export default GetAllAnnouncementStuPage;