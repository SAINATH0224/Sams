import "./Faculty_dashboard.css"
import FacultyProfile from '../Profile_details/Faculty_profile';

const FacultyDashboard = ({ firstName, lastName, onBack, onUpdateProfile, onCompleteProfile, onLogout }) => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header">
        <h1>Welcome, {firstName} {lastName}!</h1>
      </div>
      {/* Back Button Below Ribbon */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', margin: '16px 0 0 32px' }}>
        <button className="faculty-back-btn" type="button" onClick={onBack} aria-label="Back">
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
        {/* Faculty Dashboard Section */}
        <div className="dashboard-section">
          <h2 className="section-title">Faculty Dashboard</h2>

          {/* Main Cards */}
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
                    <path d="M3 3v18h18" stroke="white" strokeWidth="2" />
                    <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <h3>Attendance Report</h3>
              <p className="card-description">Track your attendance</p>
              <p className="card-info">Current: 85% (17/20 days)</p>
              <button className="card-button">View Report</button>
            </div>

            {/* Check Students Count Card */}
            <div className="card students-count-card" style={{ background: '#f3f4f6', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div className="card-icon">
                <div className="icon-circle students-count-bg" style={{ backgroundColor: '#4F46E5' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" />
                    <circle cx="8.5" cy="7" r="4" stroke="white" strokeWidth="2" />
                    <path d="M20 8v6" stroke="white" strokeWidth="2" />
                    <path d="M23 11h-6" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <h3>Students Count</h3>
              <p className="card-description">Check total students</p>
              <p className="card-info">Current: 1,247 students</p>
              <button className="card-button" style={{
                background: '#8a0a11',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Check
              </button>
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
  )
}

export default FacultyDashboard
