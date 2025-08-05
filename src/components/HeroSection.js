import { Link } from "react-router-dom";
import { isUserExist } from "./auth/Auth";

function HeroSection(){
    return <>
  <section
      className="py-5 text-center"
      style={{
        background: 'linear-gradient(to bottom right, #ADEED9, #FFEDF3)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: '#3E3F5B',
      }}
    >
      <div className="container">
        <p style={{ color: '#0ABAB5', fontWeight: 'bold' }}>⚡ The Future of Learning</p>
        <h1 className="display-4 fw-bold mb-3" style={{ color: '#0ABAB5' }}>
          Transform Your Learning <br />
          Experience with <span style={{ color: '#3E3F5B' ,fontWeight: "bolder"}}>StudyMate</span>
        </h1>

        <p className="lead mb-5 mt-3" style={{ color: '#3E3F5B' }}>
          The ultimate learning management system that connects students and teachers<br />
          through intelligent doubt resolution, seamless assignment management, and collaborative tools.
        </p>

        <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
           {
              isUserExist() ? (
                <Link
                  to="/maindashboard/dashboard"
                  className="btn btn-lg mr-3"
                  style={{
                    backgroundColor: '#0ABAB5',
                    color: '#fff',
                    padding: '12px 30px',
                    borderRadius: '10px',
                    border: 'none',
                    boxShadow: '10px 10px 10px grey',
                  }}
                >
                  Go to Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-lg mr-3"
                  style={{
                    backgroundColor: '#0ABAB5',
                    color: '#fff',
                    padding: '12px 30px',
                    borderRadius: '10px',
                    border: 'none',
                    boxShadow: '10px 10px 10px grey',
                  }}
                >
                  Start as Student
                </Link>
              )
            }

          <button
            className="btn btn-outline-dark btn-lg"
            style={{
              borderColor: '#0ABAB5',
              color: '#0ABAB5',
              padding: '12px 30px',
              borderRadius: '10px',
              boxShadow:'10px 10px 10px grey'
            }}
          >
            Join as Teacher
          </button>
        </div>

        {/* Stats */}
        <div className="row text-center">
          <div className="col-md-3 col-6 mb-3">
            <h4 className="fw-bold" style={{ color: '#0ABAB5' }}>50K+</h4>
            <p>Active Students</p>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <h4 className="fw-bold" style={{ color: '#0ABAB5' }}>2K+</h4>
            <p>Expert Teachers</p>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <h4 className="fw-bold" style={{ color: '#0ABAB5' }}>1M+</h4>
            <p>Doubts Resolved</p>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <h4 className="fw-bold" style={{ color: '#0ABAB5' }}>98%</h4>
            <p>Success Rate</p>
          </div>
        </div>
      </div>
    </section>
    </>
}

export default HeroSection;