* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 100%);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
.dashboard-header {
  background-color: #b00d15;
  color: white;
  padding: 20px 40px;
  text-align: center;
}

.dashboard-header h1 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}

/* Profile Banner */
.profile-banner {
  background-color: #f9e79f;
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
}

.profile-info {
  flex: 1;
}

.profile-info p {
  margin: 0 0 8px 0;
  color: #8b4513;
  font-size: 0.9rem;
}

.progress-bar {
  width: 200px;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  width: 25%;
  height: 100%;
  background-color: #28a745;
  border-radius: 3px;
}

.complete-profile-btn {
  background-color: #b00d15;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.complete-profile-btn:hover {
  background-color: #8a0a11;
}

/* Dashboard Content */
.dashboard-content {
  display: flex;
  gap: 20px;
  padding: 20px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.main-section {
  flex: 1;
}

.sidebar {
  width: 300px;
}

/* Dashboard Cards */
.dashboard-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.dashboard-card h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

/* Feature Cards */
.feature-card {
  padding: 30px 20px;
  border-radius: 12px;
  text-align: center;
  color: white;
  position: relative;
}

.blue-card {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
}

.green-card {
  background: linear-gradient(135deg, #5cb85c 0%, #449d44 100%);
}

.card-icon {
  margin-bottom: 15px;
}

.card-icon svg {
  color: white;
}

.feature-card h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-weight: 600;
}

.feature-card p {
  font-size: 0.9rem;
  margin-bottom: 5px;
  opacity: 0.9;
}

.next-info,
.current-info {
  font-size: 0.8rem;
  margin-bottom: 15px;
  opacity: 0.8;
}

.action-btn {
  background-color: #b00d15;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.3s;
}

.action-btn:hover {
  background-color: #8a0a11;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 24px 24px 30px 24px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.green-icon {
  background-color: #d4edda;
  color: #28a745;
}

.purple-icon {
  background-color: #e2d9f3;
  color: #6f42c1;
}

.stat-card h3 {
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
  font-weight: 500;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #28a745;
  margin-bottom: 5px;
}

.stat-value.purple {
  color: #6f42c1;
}

.stat-label {
  font-size: 0.9rem;
  color: #999;
}

.stat-btn {
  background-color: #b00d15;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 15px;
  transition: background-color 0.3s;
}

.stat-btn:hover {
  background-color: #8a0a11;
}

/* Quick Access */
.quick-access-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.quick-access-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  border-left: 3px solid #b00d15;
}

.quick-access-item:hover {
  background-color: #f8f9fa;
}

.access-icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b00d15;
}

.quick-access-item span {
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .dashboard-content {
    flex-direction: column;
    padding: 20px;
  }

  .sidebar {
    width: 100%;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    padding: 15px 20px;
  }

  .dashboard-header h1 {
    font-size: 1.5rem;
  }

  .profile-banner {
    flex-direction: column;
    gap: 15px;
    padding: 15px 20px;
    text-align: center;
  }

  .dashboard-content {
    padding: 15px;
  }

  .dashboard-card {
    padding: 20px;
  }
}
