import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { MdPersonAddAlt1 } from 'react-icons/md';

const GetStart = () => {
  return (
    <section
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        minHeight: '60vh',
        background: 'linear-gradient(90deg, #0ABAB5, #56DFCF)',
        color: 'white',
        padding: '0 20px',
      }}
    >
      <div>
        <h1 className="font-weight-bold mb-4">
          Ready to Transform Your Learning Journey?
        </h1>
        <p className="lead mb-5">
          Join <strong>thousands</strong> of students and teachers who are already experiencing the future of
          education with <strong>StudyMate</strong>.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <a
            href="#get-started"
            className="btn btn-light d-flex align-items-center px-4 py-2 rounded-pill shadow"
            style={{ fontWeight: 500 }}
          >
            <FaGraduationCap className="mr-2" /> Get Started Free
          </a>

           <a
            href="#get-started"
            className=" ml-3 btn btn-light d-flex align-items-center px-4 py-2 rounded-pill shadow"
            style={{ fontWeight: 500 }}
          >
            <MdPersonAddAlt1 className="mr-2" /> Join as Educator
          </a>
          
        </div>
      </div>
    </section>
  );
};

export default GetStart;