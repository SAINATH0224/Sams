import React, { useEffect } from 'react';
import './Student_dashboard.css';
import backgroundImg from '../background.png';

const StudentDashboard = ({ firstName, lastName }) => {
  useEffect(() => {
    // Set the background image on the body and make it fixed
    document.body.style.backgroundImage = `url(${backgroundImg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    return () => {
      // Clean up when component unmounts
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  return (
    <div className="dashboard-container" style={{ background: 'transparent' }}>
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1>Welcome, {firstName} {lastName}!</h1>
        </div>
      </div>

      <div className="main-content">
        {/* Profile Completion Banner */}
        <div className="profile-banner">
          <div className="profile-banner-content">
            <div className="profile-text">
              <p>
                <span className="bold">Your profile is filed is only 25%.</span> Please update the remaining details.
              </p>
              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
            <button className="complete-profile-btn">Complete Profile</button>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="dashboard-grid">
          {/* Student Dashboard Card */}
          <div className="dashboard-card main-card">
            <div className="card-header">
              <h2>Student Dashboard</h2>
            </div>
            <div className="card-content">
              <div className="dashboard-items">
                {/* Time Table */}
                <div className="dashboard-item time-table">
                  <div className="item-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div className="item-info">
                    <h3>Time Table</h3>
                    <p>View your class schedule</p>
                    <div className="next-class">Next: Math at 10:00 AM</div>
                  </div>
                  <button className="action-btn">View Schedule</button>
                </div>

                {/* Attendance Report */}
                <div className="dashboard-item attendance">
                  <div className="item-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="20" x2="12" y2="10"/>
                      <line x1="18" y1="20" x2="18" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="16"/>
                    </svg>
                  </div>
                  <div className="item-info">
                    <h3>Attendance Report</h3>
                    <p>Track your attendance</p>
                    <div className="attendance-stats">Current: 85% (17/20 days)</div>
                  </div>
                  <button className="action-btn">View Report</button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Card */}
          <div className="dashboard-card quick-access-card">
            <div className="card-header">
              <h2>Quick Access</h2>
            </div>
            <div className="card-content">
              <div className="quick-access-items">
                <div className="quick-access-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>Update Password</span>
                </div>

                <div className="quick-access-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5 0 0l7.5 7.5 0 0z"/>
                  </svg>
                  <span>Change Password</span>
                </div>

                <div className="quick-access-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                  </svg>
                  <span>Submit Request</span>
                </div>

                <div className="quick-access-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span>Contact Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Dashboard Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon attendance-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
            </div>
            <h3>Attendance</h3>
            <p className="stat-number">85%</p>
            <p className="stat-label">This Month</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon gpa-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="20" x2="12" y2="10"/>
                <line x1="18" y1="20" x2="18" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="16"/>
              </svg>
            </div>
            <h3>GPA</h3>
            <p className="stat-number">3.8</p>
            <p className="stat-label">Current</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon events-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h3>Events</h3>
            <p className="stat-number">5</p>
            <p className="stat-label">Upcoming</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
