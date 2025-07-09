import React from "react";
import "./dashboard.css";

function Dashboard({ userData, onQuickAccess, onLogout }) {
  const getMenuItems = () => {
    switch (userData.role) {
      case "Student":
        return [
          { icon: "📚", label: "My Courses", color: "blue" },
          { icon: "📅", label: "Class Timetable", color: "green" },
          { icon: "📊", label: "Attendance Report", color: "yellow" },
          { icon: "📝", label: "Assignments / Tests", color: "purple" },
          { icon: "📥", label: "Download Study Material", color: "cyan" },
          { icon: "💬", label: "Messages from Faculty", color: "red" },
          { icon: "🔔", label: "Notifications", color: "orange" },
        ];
      case "Teaching Faculty":
        return [
          { icon: "👥", label: "My Students", color: "blue" },
          { icon: "📅", label: "Class Schedule", color: "green" },
          { icon: "📤", label: "Assignment / Exam Upload", color: "yellow" },
          { icon: "📊", label: "Attendance Tracker", color: "purple" },
          { icon: "❓", label: "Student Queries", color: "cyan" },
          { icon: "📥", label: "Download Submissions", color: "red" },
          { icon: "📢", label: "Notices & Announcements", color: "orange" },
        ];
      case "Management":
        return [
          { icon: "👥", label: "Faculty & Student Overview", color: "blue" },
          { icon: "📊", label: "Reports (Attendance, Performance, Fees)", color: "green" },
          { icon: "📅", label: "Event & Academic Calendar", color: "yellow" },
          { icon: "⚙️", label: "Departmental Management", color: "purple" },
          { icon: "🚨", label: "System Alerts", color: "cyan" },
          { icon: "✅", label: "Approve Requests & Documents", color: "red" },
        ];
      default:
        return [];
    }
  };

  const getRoleIcon = () => {
    switch (userData.role) {
      case "Student":
        return "🎓";
      case "Teaching Faculty":
        return "👨‍🏫";
      case "Management":
        return "🏛️";
      default:
        return "👤";
    }
  };

  return (
    <div className="app">
      <div className="dashboard">
        {userData.profileCompletion < 100 && (
          <div className="dashboard-alert">
            <div>
              <strong>Your profile is only {userData.profileCompletion}% complete.</strong>
              <br />
              Please update the remaining details to access full features.
            </div>
            <button onClick={() => onQuickAccess("profile")} className="btn btn-primary btn-sm">
              Update Profile
            </button>
          </div>
        )}

        <div className="dashboard-main-card">
          <div className="dashboard-header">
            <div className="user-info">
              <h1 className="welcome-text">Welcome, {userData.name}!</h1>
              <p className="role-text">
                <span className="role-badge">{userData.role}</span>
              </p>
              <p className="last-login">📅 Last Login: {userData.lastLogin}</p>
            </div>

            <div className="profile-completion">
              <h3 className="completion-title">🔍 Profile Completion Status</h3>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${userData.profileCompletion}%` }}></div>
              </div>
              <p className="completion-text">✅ Profile Completed: {userData.profileCompletion}%</p>
              {userData.profileCompletion < 100 && (
                <div className="completion-notes">
                  <p className="note-error">🔴 Note: All profile fields are mandatory.</p>
                  <p className="note-warning">
                    📢 Action Required: You still have {Math.ceil((100 - userData.profileCompletion) / 10)} details pending.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="main-content">
            <div className="section-card">
              <div className="section-header">
                <span className="role-icon">{getRoleIcon()}</span>
                For {userData.role}
              </div>
              <div className="section-content">
                <div className="menu-grid">
                  {getMenuItems().map((item, index) => (
                    <div key={index} className="menu-item">
                      <div className={`menu-icon ${item.color}`}>
                        <span>{item.icon}</span>
                      </div>
                      <h4 className="menu-label">{item.label}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar">
            <div className="section-card">
              <div className="section-header">🔄 Quick Access</div>
              <div className="section-content">
                <div className="quick-actions">
                  <button onClick={() => onQuickAccess("profile")} className="quick-action-btn">
                    <span className="action-icon">✏️</span>
                    Update Profile
                  </button>
                  <button onClick={() => onQuickAccess("password")} className="quick-action-btn">
                    <span className="action-icon">🔒</span>
                    Change Password
                  </button>
                  <button onClick={() => onQuickAccess("request")} className="quick-action-btn">
                    <span className="action-icon">📤</span>
                    Submit a Request
                  </button>
                  <button onClick={onLogout} className="quick-action-btn" style={{ color: '#dc2626' }}>
                    <span className="action-icon">➡️</span>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;