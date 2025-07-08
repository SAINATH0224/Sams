import React, { useState } from "react";
import LoginPage from "./Login";
import CategoryPage from "./category";
import RegistrationPage from "./registration";
import FacultyRegistration from "./Faculty_registration";
import ManagementRegistration from "./Management_registration";
import StudentDashboard from "./Dashboard/Student_dashboard";
import FacultyDashboard from "./Dashboard/Faculty_dashboard";
import ManagementDashboard from "./Dashboard/Management_dashboard";
import StudentProfile from "./Profile_details/Student_profile";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [studentName, setStudentName] = useState({ firstName: "", lastName: "" });

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === "teaching-faculty") {
      setPage("faculty-registration");
    } else if (categoryId === "Management") {
      setPage("management-registration");
    } else {
      setPage("registration");
    }
  };

  return (
    <>
      {page === "login" && <LoginPage onSignUp={() => setPage("category")} />}
      {page === "category" && (
        <CategoryPage
          onBack={() => setPage("login")}
          onCategorySelect={handleCategorySelect}
        />
      )}
      {page === "registration" && (
        <RegistrationPage onBack={() => setPage("category")} onRegisterSuccess={(name) => { setStudentName(name); setPage("student-dashboard"); }} />
      )}
      {page === "faculty-registration" && (
        <FacultyRegistration onBack={() => setPage("category")} onRegisterSuccess={() => setPage("faculty-dashboard")} />
      )}
      {page === "management-registration" && (
        <ManagementRegistration onBack={() => setPage("category")} onRegisterSuccess={() => setPage("management-dashboard")} />
      )}
      {page === "student-dashboard" && <StudentDashboard firstName={studentName.firstName} lastName={studentName.lastName} onUpdateProfile={() => setPage("student-profile")} onBack={() => setPage("registration")} />}
      {page === "faculty-dashboard" && <FacultyDashboard onBack={() => setPage("faculty-registration")} />}
      {page === "management-dashboard" && <ManagementDashboard onBack={() => setPage("management-registration")} />}
      {page === "student-profile" && <StudentProfile onBack={() => setPage("student-dashboard")} />}
    </>
  );
}

export default App;
