import React, { useState, useEffect } from "react";
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

function App() {
  const [page, setPage] = useState("login");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [studentName, setStudentName] = useState({ firstName: "", lastName: "" });
  const [studentProfileLocked, setStudentProfileLocked] = useState(false);
  const [showFacultyProfile, setShowFacultyProfile] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [pendingLogoutPage, setPendingLogoutPage] = useState(null);

  useEffect(() => {
    if (page === "student-dashboard") {
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
  }, [page]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage("registration");
  };

  // Logout confirmation screen
  function LogoutConfirm({ onConfirm, onCancel }) {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
        <div style={{ background: 'white', padding: '32px 28px 28px 28px', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.25)', minWidth: 320, textAlign: 'center', maxWidth: 360, width: '90%' }}>
          <h2 style={{ margin: '0 0 12px 0', fontSize: 26, fontWeight: 700, letterSpacing: 0.5 }}>Confirm Logout</h2>
          <p style={{ margin: '0 0 24px 0', fontSize: 17, color: '#333' }}>Are you sure you want to logout?</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            <button style={{ background: '#B00D15', color: 'white', border: 'none', padding: '10px 32px', borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px rgba(176,13,21,0.15)' }} onClick={onConfirm}>Logout</button>
            <button style={{ background: '#eee', color: '#333', border: 'none', padding: '10px 32px', borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: 'pointer' }} onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {page === "login" && <LoginPage onSignUp={() => setPage("category")} onLoginSuccess={() => setPage("student-dashboard")} />}
      {page === "category" && (
        <CategoryPage
          onBack={() => setPage("login")}
          onCategorySelect={handleCategorySelect}
        />
      )}
      {page === "registration" && (
        <RegistrationPage onBack={() => setPage("category")} onRegisterSuccess={(name) => { setStudentName(name); setPage("student-dashboard"); }} />
      )}
      {page === "student-dashboard" && <StudentDashboard firstName={studentName.firstName} lastName={studentName.lastName} onUpdateProfile={() => { setStudentProfileLocked(false); setPage("student-profile"); }} onBack={() => setPage("registration")} onLogout={() => { setPendingLogoutPage("student-dashboard"); setShowLogoutConfirm(true); }} onCompleteProfile={() => { setStudentProfileLocked(true); setPage("student-profile"); }} />}
      {page === "faculty-dashboard" && !showFacultyProfile && <FacultyDashboard onBack={() => setPage("faculty-registration")} onUpdateProfile={() => setShowFacultyProfile(true)} onLogout={() => { setPendingLogoutPage("faculty-dashboard"); setShowLogoutConfirm(true); }} onCompleteProfile={() => setShowFacultyProfile(true)} />}
      {showFacultyProfile && <FacultyProfile onBack={() => setShowFacultyProfile(false)} onLogout={() => { setPendingLogoutPage("faculty-dashboard"); setShowLogoutConfirm(true); }} />}
      {page === "management-dashboard" && <ManagementDashboard onBack={() => setPage("management-registration")} onLogout={() => { setPendingLogoutPage("management-dashboard"); setShowLogoutConfirm(true); }} />}
      {page === "student-profile" && <StudentProfile onBack={() => setPage("student-dashboard")} lockedFields={studentProfileLocked} />}
      {page === "management-profile" && <ManagementProfile onBack={() => setPage("management-dashboard")} onLogout={() => { setPendingLogoutPage("management-profile"); setShowLogoutConfirm(true); }} />}
      {showLogoutConfirm && <LogoutConfirm onConfirm={() => { setShowLogoutConfirm(false); setPage("login"); setShowFacultyProfile(false); }} onCancel={() => { setShowLogoutConfirm(false); if (pendingLogoutPage) setPage(pendingLogoutPage); }} />}
    </>
  );
}

export default App;
