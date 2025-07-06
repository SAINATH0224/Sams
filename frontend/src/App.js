import React, { useState } from "react";
import LoginPage from "./Login";
import CategoryPage from "./category";
import RegistrationPage from "./registration";
import Dashboard from "./dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [userData, setUserData] = useState(null);

  // Handle login success and set real user data
  const handleLoginSuccess = (user) => {
    setUserData({
      name: user.firstName + " " + user.lastName,
      role: user.role || "Student",
      lastLogin: new Date().toLocaleString(),
      profileCompletion: user.profileCompletion || 80,
      ...user,
    });
    setPage("dashboard");
  };

  // Handle registration success and set real user data
  const handleRegistrationSuccess = (user) => {
    setUserData({
      name: user.firstName + " " + user.lastName,
      role: user.role || "Student",
      lastLogin: new Date().toLocaleString(),
      profileCompletion: user.profileCompletion || 80,
      ...user,
    });
    setPage("dashboard");
  };

  const handleLogout = () => {
    setUserData(null);
    setPage("login");
  };

  return (
    <>
      {page === "login" && (
        <LoginPage
          onSignUp={() => setPage("category")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {page === "category" && (
        <CategoryPage
          onBack={() => setPage("login")}
          onCategorySelect={() => setPage("registration")}
        />
      )}
      {page === "registration" && (
        <RegistrationPage
          onBack={() => setPage("category")}
          onRegistrationSuccess={handleRegistrationSuccess}
        />
      )}
      {page === "dashboard" && userData && (
        <Dashboard
          userData={userData}
          onQuickAccess={() => {}}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default App;