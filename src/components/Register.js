import React, { useState } from 'react';
import { FaGraduationCap, FaEnvelope, FaLock, FaGoogle, FaTwitter, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import './login.css'; // Optional: for custom styling
import { Link } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import axios from "axios"
import Endpoint from './apis/Endpoint';

const Register = () => {
  // const [role, setRole] = useState('student');
  const [state,setState] = useState({
      name:"",
      email:"",
      password:"",
      confirmPassword:"",
      role:"student"
  })
const handleSubmit = async (event)=>{
  event.preventDefault();
  try{

  if (state.password !== state.confirmPassword) {
  toast.error("Passwords do not match");
  return;
  }
     let response = await axios.post(Endpoint.SIGN_UP,state);
     toast.success(response.data.message);
     setState({
      name:"",
      email:"",
      password:"",
      confirmPassword:"",
      role:""
     })

  }catch(err){
    console.log(err);
    toast.error(err.response.data.error);
    
  }
}
  return <>
         <ToastContainer/>
      <div className="signin-page d-flex" style={{ minHeight: '100vh', background: 'linear-gradient(to right, #E0F7F4, #F9F9F9)' }}>
      {/* Left Content */}
      <div className="left-pane p-5 " style={{ flex: 1 ,marginTop:"7%"}}>
        <div className="d-flex align-items-center mb-4">
          <div className="logo bg-info rounded-circle p-2 me-2 mr-2">
            <FaUserGraduate color="white" size={24} />
          </div>
          <div>
            <h4 className="m-0"><strong>Study</strong><span className="text-info">Mate</span></h4>
            <small className="text-muted">Learning Management System</small>
          </div>
        </div>

        <h2 className="fw-bold mb-3">Transform Your Learning Journey</h2>
        <p className="text-muted mb-5">Join thousands of students and educators in the future of collaborative learning</p>

        <div className="feature-box p-3 d-flex mb-3 bg-white shadow-sm" style={{borderRadius:"15px"}}>
          <div className="icon me-3 text-info mr-3"><FaUserGraduate size={20} /></div>
          <div>
            <h6 className="mb-1 fw-bold">Interactive Learning</h6>
            <small className="text-muted">Engage with multimedia content and real-time feedback</small>
          </div>
        </div>

        <div className="feature-box p-3 d-flex mb-3 bg-white shadow-sm" style={{borderRadius:"15px"}}>
          <div className="icon me-3 text-info mr-3"><FaChalkboardTeacher size={20} /></div>
          <div>
            <h6 className="mb-1 fw-bold">Collaborative Platform</h6>
            <small className="text-muted">Connect with peers and instructors seamlessly</small>
          </div>
        </div>

        <div className="feature-box p-3 d-flex bg-white shadow-sm" style={{borderRadius:"15px"}} >
          <div className="icon me-3 text-info mr-3"><FaLock size={20} /></div>
          <div>
            <h6 className="mb-1 fw-bold">Smart Analytics</h6>
            <small className="text-muted">Track progress with intelligent insights and recommendations</small>
          </div>
        </div>
      </div>

      {/* Right Login Card */}
      
      <div className="right-pane p-4 d-flex align-items-center justify-content-center" style={{ flex: 1 }}>
        <form onSubmit={handleSubmit}>
        <div className="card p-4 shadow-lg" style={{ width: '150%', maxWidth: '450px' ,borderRadius:'15px' , minHeight:"auto"}}>
          <h4 className="text-center fw-bold mb-1">Join StudyMate</h4>
          <p className="text-center text-muted mb-4">Create your account to get started</p>

           <h5>I am a</h5>
          <div className="mb-3 d-flex justify-content-between ">
            <button
              type='button'
              className={`btn flex-fill me-2 ${state.role === 'student' ? 'btn-info text-white' : 'btn-outline-secondary'} mr-3`}
              onClick={() => setState({...state,role: 'student'})}
              style={{borderRadius:'10px',height:"80px"}}
            >
              <FaUserGraduate className="me-2" /> Student
            </button>
            <button
              type='button'
              className={`btn flex-fill ${state.role === 'teacher' ? 'btn-info text-white' : 'btn-outline-secondary'}`}
              onClick={() => setState({...state,role:'teacher'})}
              style={{borderRadius:'10px',height:"80px"}}
            >
              <FaChalkboardTeacher className="me-2" /> Teacher
            </button>
          </div>

           <div className="mb-3">
            <label>FullName</label>
            <div className="input-group">
              <span className="input-group-text bg-white" style={{border:"none"}}><FaEnvelope /></span>
              <input value={state.name} onChange={(event)=>setState({...state,name: event.target.value})} type="text" className="form-control" placeholder="pankaj Rathore" style={{borderRadius:"10px"}}/>
            </div>
          </div>
          
          <div className="mb-3">
            <label>Email</label>
            <div className="input-group">
              <span className="input-group-text bg-white" style={{border:"none"}}><FaEnvelope /></span>
              <input value={state.email} onChange={(event)=>setState({...state,email: event.target.value})} type="email" className="form-control" placeholder="pankaj@123.com" style={{borderRadius:"10px"}}/>
            </div>
          </div>

          <div className="mb-4">
            <label>Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white" style={{border:"none"}}><FaLock /></span>
              <input value={state.password} onChange={(event)=>setState({...state,password: event.target.value})} type="password" className="form-control" placeholder="Enter your password" style={{borderRadius:"10px"}} />
            </div>
          </div>

           <div className="mb-4">
            <label>Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white" style={{border:"none"}}><FaLock /></span>
              <input value={state.confirmPassword} onChange={(event)=>setState({...state,confirmPassword: event.target.value})} type="password" className="form-control" placeholder="Confirm your password" style={{borderRadius:"10px"}} />
            </div>
          </div>

          <button  type='submit' className="btn btn-info text-white w-100 d-flex justify-content-center align-items-center" style={{borderRadius:"10px"}}>
            Register <span className="ms-2">→</span>
          </button>

          {/* <div className="text-center my-3 text-muted small">OR CONTINUE WITH</div> */}

          {/* <div className="d-flex justify-content-between">
            <button className="btn btn-outline-dark w-100 me-2 mr-3">
              <FaGoogle className="me-2" /> Google
            </button>
            <button className="btn btn-outline-dark w-100">
              <FaTwitter className="me-2" /> Twitter
            </button>
          </div> */}

          <div className="text-center mt-4">
            <small className="text-muted">Already have an account? </small>
            <Link className="text-info fw-bold" to="/login">Sign in</Link>
          </div>
        </div>
        </form>
      </div>
    </div>
</>
}
export default Register;