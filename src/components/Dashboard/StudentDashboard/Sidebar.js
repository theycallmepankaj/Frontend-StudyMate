import React from "react";

const Sidebar = ({ role }) => {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
      <h4 className="text-center mb-4">{role === "teacher" ? "Teacher" : "Student"} Panel</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2"><a href="#" className="nav-link text-white">Dashboard</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link text-white">Ask Doubts</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link text-white">Assignments</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link text-white">Notes</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link text-white">Files</a></li>
        <li className="nav-item mb-2"><a href="#" className="nav-link text-white">Chat</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;