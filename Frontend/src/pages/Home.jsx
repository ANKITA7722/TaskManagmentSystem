import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css" // Custom CSS for styling

const Home = () => {
  const navigate = useNavigate();

  return (
    <div id="home-container">
      <div className="home-wrapper">
        <center>
          <h1 className="home-title">Task Management System</h1>
          <p className="home-subtitle">
            Manage your tasks efficiently and effectively with our system.
          </p>
          <div className="button-group">
            <button
              className="home-button admin-button"
              onClick={() => {
                navigate("/admin");
              }}
            >
              Admin Login
            </button>
            <button
              className="home-button register-button"
              onClick={() => {
                navigate("/registration");
              }}
            >
              Registration Login
            </button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Home;
