import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./Login";
import CategoryPage from "./category";
import RegistrationPage from "./registration";
import StudentDashboard from "./Dashboard/Student_dashboard";
import FacultyDashboard from "./Dashboard/Faculty_dashboard";
import ManagementDashboard from "./Dashboard/Management_dashboard";
import StudentProfile from "./Profile_details/Student_profile";
import FacultyProfile from "./Profile_details/Faculty_profile";
import ManagementProfile from "./Profile_details/Management_profile";
import AttendancePunching from "./Attendance_punching";
import "./App.css";
import axios from "axios";

function LogoutConfirm({ onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.45)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{
        background: 'white', padding: '32px', borderRadius: 16,
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)', minWidth: 320,
        textAlign: 'center', maxWidth: 360, width: '90%'
      }}>
        <h2 style={{ marginBottom: 12, fontSize: 26 }}>Confirm Logout</h2>
        <p style={{ marginBottom: 24 }}>Are you sure you want to logout?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
          <button
            style={{
              background: '#B00D15', color: 'white',
              padding: '10px 32px', borderRadius: 6
            }}
            onClick={onConfirm}
          >Logout</button>
          <button
            style={{
              background: '#eee', color: '#333',
              padding: '10px 32px', borderRadius: 6
            }}
            onClick={onCancel}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [userData, setUserData] = useState({ firstName: "", lastName: "" });
  const [studentProfileLocked, setStudentProfileLocked] = useState(false);
  const [facultyProfileLocked, setFacultyProfileLocked] = useState(false);
  const [managementProfileLocked, setManagementProfileLocked] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [pendingLogoutPage, setPendingLogoutPage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle user data for different dashboard types
    const dashboardPaths = ["/student-dashboard", "/faculty-dashboard", "/management-dashboard"];
    if (dashboardPaths.includes(location.pathname)) {
      let userId = null;
      if (location.pathname === "/student-dashboard") {
        userId = localStorage.getItem("studentId");
      } else if (location.pathname === "/faculty-dashboard") {
        userId = localStorage.getItem("facultyId");
      } else if (location.pathname === "/management-dashboard") {
        userId = localStorage.getItem("managementId");
      }
      
      if (userId) {
        axios.get(`http://localhost:8000/customers/${userId}`)
          .then(res => {
            const data = Array.isArray(res.data) ? res.data[0] : res.data;
            setUserData({
              firstName: data.Firstname || "",
              lastName: data.Lastname || ""
            });
          })
          .catch(() => {});
      }
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={
          <LoginPage
            onSignUp={() => navigate("/category")}
            onLoginSuccess={(userData) => {
              // Set user data
              setUserData({
                firstName: userData.Firstname || "",
                lastName: userData.Lastname || ""
              });
              
              // Navigate to appropriate dashboard based on customer type
              const customerType = userData?.customer_type;
              if (customerType === "student") {
                navigate("/student-dashboard");
              } else if (customerType === "staff") {
                navigate("/faculty-dashboard");
              } else if (customerType === "management") {
                navigate("/management-dashboard");
              } else {
                navigate("/student-dashboard"); // default fallback
              }
            }}
          />
        } />
        <Route path="/category" element={
          <CategoryPage
            onBack={() => navigate("/")}
            onCategorySelect={(category) => navigate("/registration", { state: { selectedCategory: category } })}
          />
        } />
        <Route path="/registration" element={
          <RegistrationPage
            onBack={() => navigate("/category")}
            onRegisterSuccess={(name, category) => {
              setUserData(name);
              // Navigate to appropriate dashboard based on category
              if (category === "student") {
                navigate("/student-dashboard");
              } else if (category === "teaching-faculty") {
                navigate("/faculty-dashboard");
              } else if (category === "Management") {
                navigate("/management-dashboard");
              } else {
                navigate("/student-dashboard"); // default fallback
              }
            }}
          />
        } />
        <Route path="/student-dashboard" element={
          <StudentDashboard
            firstName={userData.firstName}
            lastName={userData.lastName}
            onUpdateProfile={() => {
              setStudentProfileLocked(false);
              navigate("/student-profile");
            }}
            onBack={() => navigate("/registration")}
            onLogout={() => {
              setPendingLogoutPage("/student-dashboard");
              setShowLogoutConfirm(true);
            }}
            onCompleteProfile={() => {
              setStudentProfileLocked(true);
              navigate("/student-profile");
            }}
          />
        } />
        <Route path="/student-profile" element={
          <StudentProfile
            onBack={() => navigate("/student-dashboard")}
            lockedFields={studentProfileLocked}
          />
        } />
        <Route path="/faculty-dashboard" element={
          <FacultyDashboard
            firstName={userData.firstName}
            lastName={userData.lastName}
            onBack={() => navigate("/category")}
            onUpdateProfile={() => {
              setFacultyProfileLocked(false);
              navigate("/faculty-profile");
            }}
            onLogout={() => {
              setPendingLogoutPage("/faculty-dashboard");
              setShowLogoutConfirm(true);
            }}
            onCompleteProfile={() => {
              setFacultyProfileLocked(true);
              navigate("/faculty-profile");
            }}
          />
        } />
        <Route path="/faculty-profile" element={
          <FacultyProfile
            onBack={() => navigate("/faculty-dashboard")}
            lockedFields={facultyProfileLocked}
          />
        } />
        <Route path="/management-dashboard" element={
          <ManagementDashboard
            firstName={userData.firstName}
            lastName={userData.lastName}
            onBack={() => navigate("/category")}
            onUpdateProfile={() => {
              setManagementProfileLocked(false);
              navigate("/management-profile");
            }}
            onLogout={() => {
              setPendingLogoutPage("/management-dashboard");
              setShowLogoutConfirm(true);
            }}
            onCompleteProfile={() => {
              setManagementProfileLocked(true);
              navigate("/management-profile");
            }}
          />
        } />
        <Route path="/management-profile" element={
          <ManagementProfile
            onBack={() => navigate("/management-dashboard")}
            lockedFields={managementProfileLocked}
            onLogout={() => {
              setPendingLogoutPage("/management-profile");
              setShowLogoutConfirm(true);
            }}
          />
        } />
        <Route path="/attendance-punching" element={
          <AttendancePunching
            onBack={() => navigate("/student-dashboard")}
          />
        } />
      </Routes>

      {showLogoutConfirm && (
        <LogoutConfirm
          onConfirm={() => {
            setShowLogoutConfirm(false);
            // Clear all user IDs from localStorage
            localStorage.removeItem('studentId');
            localStorage.removeItem('facultyId');
            localStorage.removeItem('managementId');
            navigate("/");
          }}
          onCancel={() => {
            setShowLogoutConfirm(false);
            if (pendingLogoutPage) navigate(pendingLogoutPage);
          }}
        />
      )}
    </>
  );
}

export default App;
