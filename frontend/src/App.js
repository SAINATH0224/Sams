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
  const [studentName, setStudentName] = useState({ firstName: "", lastName: "" });
  const [studentProfileLocked, setStudentProfileLocked] = useState(false);
  const [showFacultyProfile, setShowFacultyProfile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [pendingLogoutPage, setPendingLogoutPage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/student-dashboard") {
      const studentId = localStorage.getItem("studentId");
      if (studentId) {
        axios.get(`http://localhost:8000/customers/${studentId}`)
          .then(res => {
            const data = Array.isArray(res.data) ? res.data[0] : res.data;
            setStudentName({
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
            onLoginSuccess={() => navigate("/student-dashboard")}
          />
        } />
        <Route path="/category" element={
          <CategoryPage
            onBack={() => navigate("/")}
            onCategorySelect={() => navigate("/registration")}
          />
        } />
        <Route path="/registration" element={
          <RegistrationPage
            onBack={() => navigate("/category")}
            onRegisterSuccess={(name) => {
              setStudentName(name);
              navigate("/student-dashboard");
            }}
          />
        } />
        <Route path="/student-dashboard" element={
          <StudentDashboard
            firstName={studentName.firstName}
            lastName={studentName.lastName}
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
          showFacultyProfile ? (
            <FacultyProfile
              onBack={() => setShowFacultyProfile(false)}
              onLogout={() => {
                setPendingLogoutPage("/faculty-dashboard");
                setShowLogoutConfirm(true);
              }}
            />
          ) : (
            <FacultyDashboard
              onBack={() => navigate("/faculty-registration")}
              onUpdateProfile={() => setShowFacultyProfile(true)}
              onLogout={() => {
                setPendingLogoutPage("/faculty-dashboard");
                setShowLogoutConfirm(true);
              }}
              onCompleteProfile={() => setShowFacultyProfile(true)}
            />
          )
        } />
        <Route path="/management-dashboard" element={
          <ManagementDashboard
            onBack={() => navigate("/management-registration")}
            onLogout={() => {
              setPendingLogoutPage("/management-dashboard");
              setShowLogoutConfirm(true);
            }}
          />
        } />
        <Route path="/management-profile" element={
          <ManagementProfile
            onBack={() => navigate("/management-dashboard")}
            onLogout={() => {
              setPendingLogoutPage("/management-profile");
              setShowLogoutConfirm(true);
            }}
          />
        } />
      </Routes>

      {showLogoutConfirm && (
        <LogoutConfirm
          onConfirm={() => {
            setShowLogoutConfirm(false);
            setShowFacultyProfile(false);
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
