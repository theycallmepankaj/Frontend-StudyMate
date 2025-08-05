import React from "react";

const Topbar = () => {
  return (
    <nav className="navbar navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">StudyMate</span>
        <button className="btn btn-outline-danger">Logout</button>
      </div>
    </nav>
  );
};

export default Topbar;