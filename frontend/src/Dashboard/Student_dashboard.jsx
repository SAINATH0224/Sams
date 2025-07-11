import React, { useEffect } from 'react';
import './Faculty_dashboard.css';
import backgroundImg from '../background.png';

const StudentDashboard = ({ firstName, lastName, onUpdateProfile, onBack, onLogout, onCompleteProfile }) => {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  return (
    <div className="dashboard-container" style={{ background: 'transparent', position: 'relative' }}>
      {/* Header */}
      <div className="header">
        <h1>Welcome, {firstName} {lastName}!</h1>
      </div>
      {/* Back Button Below Ribbon */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', margin: '16px 0 0 32px' }}>
        <button className="student-back-btn" type="button" onClick={onBack} aria-label="Back">
          &#8592; Back
        </button>
      </div>

      {/* Profile Completion Banner */}
      <div className="profile-banner">
        <div className="profile-content">
          <div className="profile-text">
            <span>Your profile is filed is only 25%. Please update the remaining details.</span>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
          <button className="complete-profile-btn" onClick={onCompleteProfile}>Complete Profile</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Student Dashboard Section */}
        <div className="dashboard-section">
          <h2 className="section-title">Student Dashboard</h2>

          {/* Main Cards Row 1 */}
          <div className="main-cards">
            {/* Time Table Card */}
            <div className="card time-table-card">
              <div className="card-icon">
                <div className="icon-circle blue-bg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="white" strokeWidth="2" />
                    <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2" />
                    <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2" />
                    <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <h3>Time Table</h3>
              <p className="card-description">View your class schedule</p>
              <p className="card-info">Next: Math at 10:00 AM</p>
              <button className="card-button">View Schedule</button>
            </div>

            {/* Attendance Report Card */}
            <div className="card attendance-report-card">
              <div className="card-icon">
                <div className="icon-circle green-bg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="20" x2="12" y2="10" stroke="white" strokeWidth="2" />
                    <line x1="18" y1="20" x2="18" y2="4" stroke="white" strokeWidth="2" />
                    <line x1="6" y1="20" x2="6" y2="16" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <h3>Attendance Report</h3>
              <p className="card-description">Track your attendance</p>
              <p className="card-info">Current: 85% (17/20 days)</p>
              <button className="card-button">View Report</button>
            </div>
          </div>

          {/* Main Cards Row 2 */}
          <div className="main-cards main-cards-row2">
            {/* GPA Card */}
            <div className="card gpa-card">
              <div className="card-icon">
                <div className="icon-circle gpa-bg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="20" x2="12" y2="10" stroke="white" strokeWidth="2" />
                    <line x1="18" y1="20" x2="18" y2="4" stroke="white" strokeWidth="2" />
                    <line x1="6" y1="20" x2="6" y2="16" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <h3>GPA</h3>
              <p className="card-info" style={{ fontSize: '2rem', color: '#B00D15', fontWeight: 700 }}>3.8</p>
              <p className="card-description">Current</p>
            </div>

            {/* Attendance Stat Card */}
            <div className="card attendance-stat-card">
              <div className="card-icon">
                <div className="icon-circle attendance-stat-bg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                    <polyline points="12,6 12,12 16,14" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <h3>Attendance</h3>
              <p className="card-info" style={{ fontSize: '2rem', color: '#3F0003', fontWeight: 700 }}>85%</p>
              <p className="card-description">This Month</p>
            </div>

            {/* Events Card */}
            <div className="card events-card">
              <div className="card-icon">
                <div className="icon-circle events-bg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="white" strokeWidth="2" />
                    <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2" />
                    <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2" />
                    <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <h3>Events</h3>
              <p className="card-info" style={{ fontSize: '2rem', color: '#F59E0B', fontWeight: 700 }}>5</p>
              <p className="card-description">Upcoming</p>
            </div>


          </div>
        </div>

        {/* Quick Access Section */}
        <div className="quick-access-section">
          <h2 className="section-title">Quick Access</h2>
          <div className="quick-access-menu">
            <div className="menu-item" onClick={onUpdateProfile} style={{ cursor: 'pointer' }}>
              <div className="menu-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span>Update Profile</span>
            </div>
            <div className="menu-item">
              <div className="menu-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span>Change Password</span>
            </div>
            <div className="menu-item" onClick={() => window.location.href = '/attendance-punching'} style={{ cursor: 'pointer' }}>
              <div className="menu-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2v6m0 6v6m10-7h-6m-6 0H2" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span>Attendance Punching</span>
            </div>
            <div className="menu-item" onClick={onLogout} style={{ cursor: 'pointer' }}>
              <div className="menu-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" />
                  <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" />
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
