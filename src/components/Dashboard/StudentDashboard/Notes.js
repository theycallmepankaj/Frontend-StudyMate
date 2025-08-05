import React, { useEffect, useReducer } from 'react';
import {
    FaFilePdf, // Icon for PDF materials
    FaDownload, // Download icon (though text is used in screenshot)
    FaEye,      // Preview icon (though text is used in screenshot)
    FaArrowLeft // Back to Home icon
} from 'react-icons/fa';
import './Notes.css'; // Assuming your general dashboard styles are here
import axios from 'axios';
import Endpoint from '../../apis/Endpoint';

const NotesPage = () => {
    // Data for the study notes cards
    const [state,dispatch] = useReducer((state,action)=>{
        switch (action.type) {
        case "set-notes":
            return { ...state, noteList: action.payload };
        default:
            return state;
    }
    },{
        noteList: []
    })
    useEffect(()=>{
        loadNotes();
    },[]);

    const loadNotes = async()=>{
       try{ 
        let response = await axios.get(Endpoint.GET_NOTES, { withCredentials: true });
        console.log("Response Data : ",response);
        
        if (Array.isArray(response.data.notes)) {
      dispatch({ type: "set-notes", payload: response.data.notes });
    } else {
      console.error("Notes is not an array:", response.data.notes);
      dispatch({ type: "set-notes", payload: [] }); // fallback
    }
       }
       catch(err){
        console.log(err);
       }
    }

    return (
        <div className="container-fluid py-4 dashboard-content-container">
            {/* Top breadcrumb/navigation area */}
            <div className="d-flex align-items-center mb-4">
                <a href="/" className="back-link d-flex align-items-center text-decoration-none">
                    <FaArrowLeft className="mr-2" /> Back to Home
                </a>
                <span className="text-muted mx-2">|</span>
                <span className="font-weight-bold" style={{color:"#0ABAB5",fontSize:"30px"}}>Notes</span>
                <span className="text-muted ml-auto">StudyMate - Learning Management System</span>
            </div>
     <hr/>
            {/* Page Title and Description */}
            <h2 className="mb-2 page-title">Study Notes</h2>
            <p className="text-muted mb-4 page-description">Access study materials and lecture notes</p>

            {/* Study Notes Cards Grid */}
            <div className="row">
                {state?.noteList?.map((note, index) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={index}>
                        <div className="card study-note-card">
                            <div className="card-body">
                                <h5 className="card-title-lg mb-2">{note?.title}</h5>
                                <p className="card-subtitle text-muted mb-1">
                                    <span className={`subject-tag ${note?.subject.toLowerCase()}`}>{note?.subject}</span>
                                    <span> by {note?.uploadedBy?.name}</span>
                                </p>
                                <p className="card-text description-text">{note?.description}</p>
                                <p className="card-text date-text">{note?.date}</p>
                                <div className="d-flex justify-content-start mt-3">
                                    {/* <button className="btn btn-outline-info btn-sm mr-2">
                                        <FaEye className="mr-1" /> Preview
                                    </button> */}
                                    <button className="btn btn-info btn-sm">
                                        <FaDownload className="mr-1" /> Download
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

export default NotesPage;