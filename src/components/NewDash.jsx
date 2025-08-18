// components/NewDash.jsx
import { useState, useEffect } from "react";
import { IoPersonCircle, IoHomeOutline, IoSettings } from "react-icons/io5";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { Notify } from "notiflix";
import { LuNotebookTabs } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { MdQuiz } from "react-icons/md";

import AUCA from "../assets/images/AUCA.png"

import "./Dashboard_Styles/NewDash.css";

function NewDash() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Get token from localStorage
    const tokenFromStorage = localStorage.getItem('token');

    if (tokenFromStorage) {
      try {
        // FIXED: Check if token is a JSON object or plain JWT string
        let userData;
        
        // Try to parse as JSON first
        try {
          userData = JSON.parse(tokenFromStorage);
        } catch (jsonError) {
          // If JSON parsing fails, it's likely a plain JWT token
          console.log('Token is a plain JWT string, decoding...');
          
          // Decode JWT token directly
          try {
            const base64Url = tokenFromStorage.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            const decodedToken = JSON.parse(jsonPayload);
            if (decodedToken.user && decodedToken.user.name) {
              setUserName(decodedToken.user.name);
            }
            return; // Exit early since we found the name
          } catch (decodeError) {
            console.error("Error decoding JWT token:", decodeError);
            return;
          }
        }
        
        // If we successfully parsed JSON, check for name
        if (userData && typeof userData === 'object') {
          // Check if we have a name directly in the user data
          if (userData.name) {
            setUserName(userData.name);
          } 
          // Try to get name from the token if it exists
          else if (userData.token) {
            try {
              const base64Url = userData.token.split('.')[1];
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              }).join(''));
              
              const decodedToken = JSON.parse(jsonPayload);
              if (decodedToken.user && decodedToken.user.name) {
                setUserName(decodedToken.user.name);
              }
            } catch (err) {
              console.error("Error decoding nested token:", err);
            }
          }
        }
        
      } catch (error) {
        console.error("Error processing token from localStorage:", error);
      }
    }
  }, []);

  const handleLogoutBtn = () => {
    localStorage.removeItem('token');
    navigate('/');
    Notify.success("Logout successful, Thank you for using Our System");
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      {/* Sidebar (Fixed) */}
      <asidedd
        className="bg-body-tertiary p-3 position-fixed top-0 start-0 vh-100 d-flex flex-column border-end"
        style={{ width: "250px" }}
      >
        <img src={AUCA} alt="About" className="img-fluid" />

        <div className="ActiveNavContainer mt-4">
          <div 
            className={`divClassb ${location.pathname === "/dashboard" ||location.pathname === "/dashboard/Assessment2"||location.pathname === "/dashboard/Assessment2/assessment3" ? "active" : ""}`} 
            onClick={() => navigate("/dashboard")}
          >
              <div className="resultsClass">
            <MdOutlinePersonAddAlt />
               <span className="sidei"> Create Profile</span>
            </div>
          </div>
          
           <div 
            className={`divClassb ${location.pathname === "/dashboard/assessment" ? "active" : ""}`} 
            onClick={() => navigate("/dashboard/assessment")}
          >
            <div className="resultsClass">
             <MdQuiz />
              <span className="sidei">Assessment</span>
            </div>
          </div>
          
          <div 
            className={`divClassb ${location.pathname === "/dashboard/ProfileDashboard" ? "active" : ""}`} 
            onClick={() => navigate("/dashboard/ProfileDashboard")}
          >
            <div className="resultsClass">
              <LuNotebookPen /> 
              <span className="sidei">Student Information</span>
            </div>
          </div>
          
          <div 
            className={`divClassb ${location.pathname === "/dashboard/ComprehensiveDashboard" ? "active" : ""}`} 
            onClick={() => navigate("/dashboard/ComprehensiveDashboard")}
          >
            <div className="resultsClass">
              <LuNotebookTabs />
              <span className="sidei"> Recommendations</span>
            </div>
          </div>

          {/* FIXED: Updated appointment navigation */}
          <div 
            className={`divClassb ${location.pathname === "/dashboard/appointment" ? "active" : ""}`} 
            onClick={() => navigate("/dashboard/appointment")}
          >
            <div className="resultsClass">
            <FaCalendarAlt />
              <span className="sidei">Appointment</span>
            </div>
          </div>
        </div>
      </asidedd>

      {/* Main Content Area */}
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        {/* Header (Fixed) */}
        <header
          className="bg-light border-bottom py-2 px-4 position-fixed top-0 w-100 d-flex justify-content-between align-items-center"
          style={{ zIndex: 1050, height: "60px" }}
        >
          <h5 className="text-dark m-0"> <b>Welcome</b>, {userName} </h5>
          <div className="position-fixed">
            <IoPersonCircle
              style={{ color: "#2c5a99", fontSize: "3rem", marginLeft: "56rem" }}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="profile-dropdown position-absolute bg-white shadow p-2 rounded" style={{ right: "0px", top: "40px" }}>
                <p className="">{userName} </p>
              
                <button className="logout-button btn btn-danger btn-sm w-100" onClick={handleLogoutBtn}><IoIosLogOut /> Logout</button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="overflow-auto px-4 pt-5" style={{ marginTop: "80px", height: "calc(100vh - 60px)" }}>
          {/* Content will be rendered here by React Router */}
        </main>
      </div>
    </div>
  );
}

export default NewDash;