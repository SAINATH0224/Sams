"use client"

import axios from 'axios';
import { useState } from "react"

// CSS Styles embedded in the component
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif; /* Changed font to Arial */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  background-image: url('/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 2rem;
}

.app-login {
  min-height: 100vh;
  background-image: url('/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.app-login::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: -1;
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2);
  overflow: hidden;
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-wide {
  max-width: 72rem;
}

.card-medium {
  max-width: 48rem;
}

.main-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2);
  overflow: hidden;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-header {
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
}

.card-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
}

.card-header-maroon {
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
  color: white;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  /* Further adjustments for alignment */
  justify-content: flex-start; /* Align items to the start */
}

.card-header-maroon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  position: relative;
  z-index: 1;
}

.card-content {
  padding: 3rem;
}

.header-with-back {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
}

.back-btn, .back-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
  /* Margin for better spacing */
  margin-right: 1rem;
}

.back-btn:hover, .back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  letter-spacing: -0.025em;
}

.form-input {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
}

.form-input:focus {
  outline: none;
  border-color: #b91c1c;
  box-shadow: 0 0 0 4px rgba(185, 28, 28, 0.1);
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
}

.form-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.textarea {
  resize: vertical;
  min-height: 6rem;
}

.file-upload-input {
  width: 100%;
  padding: 1rem;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  cursor: pointer;
}

.file-upload-input:hover {
  border-color: #b91c1c;
  background: rgba(255, 255, 255, 0.95);
}

.file-upload-input:focus {
  outline: none;
  border-color: #b91c1c;
  box-shadow: 0 0 0 4px rgba(185, 28, 28, 0.1);
}

.upload-success {
  font-size: 0.85rem;
  color: #059669;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 1.1rem;
  z-index: 2;
}

.input-group .form-input {
  padding-left: 3rem;
}

.error-text {
  font-size: 0.875rem;
  color: #dc2626;
  font-weight: 500;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.025em;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(107, 114, 128, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(185, 28, 28, 0.3);
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #991b1b 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(185, 28, 28, 0.4);
}

.btn-maroon {
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(185, 28, 28, 0.3);
}

.btn-maroon:hover {
  background: linear-gradient(135deg, #991b1b 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(185, 28, 28, 0.4);
}

.btn-grey {
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(107, 114, 128, 0.3);
}

.btn-grey:hover {
  background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(107, 114, 128, 0.4);
}

.btn-full {
  width: 100%;
  border-radius: 12px;
  padding: 1.25rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
}

.btn-sm {
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
}

.btn-link {
  background: none;
  border: none;
  color: #b91c1c;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
}

.btn-link:hover {
  color: #991b1b;
  background: rgba(185, 28, 28, 0.1);
}

.alert {
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.alert-error {
  background: rgba(254, 242, 242, 0.9);
  border: 1px solid rgba(254, 202, 202, 0.5);
  color: #dc2626;
}

.alert-warning {
  background: rgba(254, 243, 199, 0.9);
  border: 1px solid rgba(251, 191, 36, 0.5);
  color: #d97706;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.alert-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.category-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .category-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.category-card {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.4s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.95);
}

.category-icon {
  width: 6rem;
  height: 6rem;
  background: linear-gradient(135deg, #4b5563 0%, #6b7280 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2.5rem;
  box-shadow: 0 8px 25px rgba(75, 85, 99, 0.3);
  transition: all 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.1);
  box-shadow: 0 12px 35px rgba(75, 85, 99, 0.4);
}

.category-name {
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  letter-spacing: -0.025em;
}

.category-description {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Dashboard Specific Styles */
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-alert {
  background: rgba(254, 243, 199, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(251, 191, 36, 0.5);
  color: #d97706;
  border-radius: 16px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.dashboard-main-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.dashboard-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.welcome-text {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.role-text {
  color: #6b7280;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.role-badge {
  font-weight: 700;
  color: #b91c1c;
}

.last-login {
  font-size: 0.95rem;
  color: #9ca3af;
  font-weight: 500;
}

.profile-completion {
  text-align: left;
}

.completion-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #1f2937;
  letter-spacing: -0.025em;
}

.progress-bar {
  width: 100%;
  height: 1rem;
  background: rgba(229, 231, 235, 0.8);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 1rem;
  backdrop-filter: blur(5px);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
  transition: width 0.5s ease;
  border-radius: 9999px;
}

.completion-text {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.completion-notes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.note-error {
  font-size: 0.85rem;
  color: #dc2626;
  font-weight: 500;
}

.note-warning {
  font-size: 0.85rem;
  color: #d97706;
  font-weight: 500;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.main-content {
  display: flex;
  flex-direction: column;
}

.sidebar {
  display: flex;
  flex-direction: column;
}

.section-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-header {
  background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
  color: white;
  padding: 1.5rem 2rem;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: -0.025em;
}

.section-content {
  padding: 2rem;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.menu-item {
  background: rgba(249, 250, 251, 0.8);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.menu-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(185, 28, 28, 0.2);
}

.menu-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.75rem;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.menu-item:hover .menu-icon {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.menu-icon.blue { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }
.menu-icon.green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.menu-icon.yellow { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
.menu-icon.purple { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); }
.menu-icon.cyan { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); }
.menu-icon.red { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
.menu-icon.orange { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); }

.menu-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
  letter-spacing: -0.025em;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quick-action-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: rgba(249, 250, 251, 0.8);
  backdrop-filter: blur(5px);
  color: #4b5563;
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
}

.quick-action-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: rgba(185, 28, 28, 0.2);
}

.action-icon {
  color: #b91c1c;
  font-size: 1.25rem;
}

.text-center {
  text-align: center;
  margin-top: 2rem;
}

.text-gray {
  color: #6b7280;
  font-weight: 500;
}

/* File upload grid for documents */
.document-upload-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .document-upload-grid {
    grid-template-columns: 1fr;
  }
}

/* Section titles */
h5 {
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: -0.025em;
}

/* Details/Summary for collapsible sections */
details {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  overflow: hidden;
}

summary {
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;
  font-weight: 600;
  color: #374151;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  letter-spacing: -0.025em;
}

summary:hover {
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
}

summary::-webkit-details-marker {
  display: none;
}

summary::after {
  content: "▼"; /* Down arrow */
  font-size: 0.8em;
  transition: transform 0.2s ease;
}

details[open] summary::after {
  content: "▲"; /* Up arrow */
  transform: rotate(180deg);
}

.details-content {
  padding: 1.5rem;
}

/* New styles for document list flow */
.document-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.document-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #f9fafb;
}

.document-name {
  flex-grow: 1;
  font-weight: 500;
  color: #374151;
}

.document-status {
  font-size: 0.85rem;
  color: #059669;
  font-weight: 500;
}

.document-input-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #e5e7eb;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
  transition: all 0.2s ease;
  border: 1px solid #d1d5db;
}

.document-input-button:hover {
  background-color: #d1d5db;
  border-color: #9ca3af;
}

.document-input-button input[type="file"] {
  display: none;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .dashboard-header {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .menu-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .card-content {
    padding: 2rem;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
  .dashboard {
    padding: 1rem;
  }
  .dashboard-header {
    grid-template-columns: 1fr;
  }
  .profile-completion {
    text-align: center;
  }
  .menu-grid {
    grid-template-columns: 1fr;
  }
  .welcome-text {
    font-size: 1.75rem;
  }
  .document-upload-grid {
    grid-template-columns: 1fr;
  }
  .app, .app-login {
    padding: 1rem;
  }

  /* Adjustments for smaller screens on maroon headers */
  .card-header-maroon {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 4rem; /* Give space for the subtitle to not overlap */
  }

  .card-header-maroon .card-title {
    margin-top: 0.5rem; /* Space between back button and title */
  }

  .card-header-maroon p {
    position: static; /* Remove absolute positioning on small screens */
    margin-top: 0.5rem;
    padding-left: 0; /* Remove left padding if any */
  }
}
`

// Login Component
function LoginPage({ onLogin, onSignUp }) {
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!mobile || mobile.length !== 10 || !/^[0-9]+$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits"
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validateForm()) return
  setIsLoading(true)

  try {
    // 1. Call backend to get all customers
    const res = await axios.get("http://127.0.0.1:8000/customers")
    const customers = res.data

    // 2. Find if phone number exists
    const user = customers.find(c => c.Phonenumber === mobile)

    if (user) {
      // 3. Found — call onLogin with user data
      onLogin(user)
    } else {
      // 4. Not found — show error
      setErrors({ general: "User not found. Please register first." })
    }
  } catch (err) {
    console.error(err)
    setErrors({ general: "Error while logging in. Please try again." })
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="app-login">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Welcome Back</h1>
          <p style={{ marginTop: "0.5rem", opacity: 0.9, fontSize: "1rem" }}>Sign in to your account</p>
        </div>
        <div className="card-content">
          {errors.general && (
            <div className="alert alert-error">
              <p>{errors.general}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="mobile" className="form-label">
                Mobile Number
              </label>
              <div className="input-group">
                <span className="input-icon"></span>
                <input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="form-input"
                />
              </div>
              {errors.mobile && <p className="error-text">{errors.mobile}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <span className="input-icon"></span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="form-input"
                />
              </div>
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>
            <button type="submit" disabled={isLoading} className="btn btn-primary btn-full">
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="text-center">
            <span className="text-gray">Don't have an account? </span>
            <button onClick={onSignUp} className="btn-link">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Category Selection Component
function CategorySelection({ onCategorySelect, onBack }) {
  const categories = [
    { id: "Student", name: "Student", icon: "🎓", description: "Access courses, assignments, and attendance tracking" },
    {
      id: "Teaching Faculty",
      name: "Teaching Faculty",
      icon: "👨‍🏫",
      description: "Manage classes, students, and academic content",
    },
    { id: "Management", name: "Management", icon: "🏛️", description: "Oversee operations, reports, and administration" },
  ]

  return (
    <div className="app-login">
      <div className="card card-wide">
        <div className="card-header-maroon">
          <button onClick={onBack} className="back-button" aria-label="Go back">
            ←
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1 }}> {/* Flex container for title and subtitle */}
            <h1 className="card-title" style={{ textAlign: "left" }}>Choose Your Role</h1>
            <p style={{ opacity: 0.9, fontSize: "1rem" }}>
              Select the category that best describes you
            </p>
          </div>
        </div>
        <div className="card-content">
          <div className="category-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card" onClick={() => onCategorySelect(category.id)}>
                <div className="category-icon">
                  <span>{category.icon}</span>
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <button className="btn btn-secondary">Select Role</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Registration Form Component
function RegistrationForm({ category, onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    gender: "",
    dateOfBirth: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName || formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    }
    if (!formData.lastName || formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    }
    if (!formData.mobile || formData.mobile.length !== 10 || !/^[0-9]+$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits"
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.gender) {
      newErrors.gender = "Please select a gender"
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    onSubmit({ ...formData, category })
  }

  return (
    <div className="app-login">
      <div className="card card-wide">
        <div className="card-header-maroon">
          <button onClick={onBack} className="back-button" aria-label="Go back">
            ←
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexGrow: 1 }}> {/* Flex container for title and subtitle */}
            <h1 className="card-title" style={{ textAlign: "left" }}>{category} Registration</h1>
            <p style={{ opacity: 0.9, fontSize: "1rem" }}>Create your account to get started</p>
          </div>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="form-input"
                />
                {errors.firstName && <p className="error-text">{errors.firstName}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="form-input"
                />
                {errors.lastName && <p className="error-text">{errors.lastName}</p>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="form-input"
                />
                {errors.mobile && <p className="error-text">{errors.mobile}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="form-input"
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="error-text">{errors.gender}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth" className="form-label">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-input"
                />
                {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth}</p>}
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary btn-full">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Dashboard Component
function Dashboard({ userData, onQuickAccess, onLogout }) { // Added onLogout prop
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
        ]
      case "Teaching Faculty":
        return [
          { icon: "👥", label: "My Students", color: "blue" },
          { icon: "📅", label: "Class Schedule", color: "green" },
          { icon: "📤", label: "Assignment / Exam Upload", color: "yellow" },
          { icon: "📊", label: "Attendance Tracker", color: "purple" },
          { icon: "❓", label: "Student Queries", color: "cyan" },
          { icon: "📥", label: "Download Submissions", color: "red" },
          { icon: "📢", label: "Notices & Announcements", color: "orange" },
        ]
      case "Management":
        return [
          { icon: "👥", label: "Faculty & Student Overview", color: "blue" },
          { icon: "📊", label: "Reports (Attendance, Performance, Fees)", color: "green" },
          { icon: "📅", label: "Event & Academic Calendar", color: "yellow" },
          { icon: "⚙️", label: "Departmental Management", color: "purple" },
          { icon: "🚨", label: "System Alerts", color: "cyan" },
          { icon: "✅", label: "Approve Requests & Documents", color: "red" },
        ]
      default:
        return []
    }
  }

  const getRoleIcon = () => {
    switch (userData.role) {
      case "Student":
        return "🎓"
      case "Teaching Faculty":
        return "👨‍🏫"
      case "Management":
        return "🏛️"
      default:
        return "👤"
    }
  }

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
                    📢 Action Required: You still have {Math.ceil((100 - userData.profileCompletion) / 10)} details
                    pending.
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
                  <button onClick={() => onQuickAccess("contact")} className="quick-action-btn">
                    <span className="action-icon">📞</span>
                    Contact Admin
                  </button>
                  <button onClick={onLogout} className="quick-action-btn" style={{ color: '#dc2626' }}> {/* Logout Button */}
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
  )
}

// Reusable Document Upload Field Component
function DocumentUploadField({ label, name, onFileUpload, uploadedFile }) {
  const fileInputId = `file-upload-${name}`;
  return (
    <div className="document-item">
      <div className="document-name">{label}</div>
      {uploadedFile ? (
        <div className="document-status">✅ {uploadedFile.name}</div>
      ) : (
        <label htmlFor={fileInputId} className="document-input-button">
          Choose File
          <input
            id={fileInputId}
            type="file"
            name={name}
            onChange={(e) => onFileUpload(name, e.target.files?.[0])}
          />
        </label>
      )}
    </div>
  );
}

// Profile Update Component with comprehensive fields
function ProfileUpdate({ userData, onSubmit, onCancel }) {
  const [uploadedFiles, setUploadedFiles] = useState({})

  const handleFileUpload = (fieldName, file) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [fieldName]: file,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    onSubmit({ ...data, ...uploadedFiles })
  }

  const renderStudentFields = () => (
    <>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Student ID</label>
          <input type="text" name="studentId" className="form-input" placeholder="Enter your student ID" required />
        </div>
        <div className="form-group">
          <label className="form-label">Course Branch</label>
          <select name="courseBranch" className="form-input" required>
            <option value="">Select your branch</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Blood Group</label>
          <select name="bloodGroup" className="form-input" required>
            <option value="">Select your blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Nationality</label>
          <input
            type="text"
            name="nationality"
            className="form-input"
            defaultValue="Indian"
            placeholder="Enter your nationality"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Religion</label>
          <input type="text" name="religion" className="form-input" placeholder="Enter your religion" required />
        </div>
        <div className="form-group">
          <label className="form-label">Caste Category</label>
          <select name="caste" className="form-input" required>
            <option value="">Select your category</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>
      </div>

      <details open> {/* Open by default for better visibility during testing */}
        <summary>📎 Document Uploads</summary>
        <div className="details-content">
          <div className="document-list">
            {[
              { name: "memo10th", label: "10th Memo" },
              { name: "memoInter", label: "Inter Memo" },
              { name: "rankCard", label: "Rank Card" },
              { name: "tc", label: "Transfer Certificate" },
              { name: "casteCertificate", label: "Caste Certificate" },
              { name: "incomeCertificate", label: "Income Certificate" },
              { name: "aadharCard", label: "Aadhar Card" },
              { name: "signature", label: "Signature" },
              { name: "studentPhoto", label: "Student Photo" },
            ].map((field) => (
              <DocumentUploadField
                key={field.name}
                label={field.label}
                name={field.name}
                onFileUpload={handleFileUpload}
                uploadedFile={uploadedFiles[field.name]}
              />
            ))}
          </div>
        </div>
      </details>
    </>
  )

  const renderTeachingFacultyFields = () => (
    <>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Teaching ID</label>
          <input type="text" name="teachingId" className="form-input" placeholder="Enter your teaching ID" required />
        </div>
        <div className="form-group">
          <label className="form-label">Highest Qualification</label>
          <select name="highestQualification" className="form-input" required>
            <option value="">Select your qualification</option>
            <option value="PhD">PhD</option>
            <option value="M.Tech">M.Tech</option>
            <option value="M.Sc">M.Sc</option>
            <option value="M.A">M.A</option>
            <option value="MBA">MBA</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Course</label>
          <input type="text" name="course" className="form-input" placeholder="Enter your course" required />
        </div>
        <div className="form-group">
          <label className="form-label">Subject Expertise</label>
          <input
            type="text"
            name="subjectExpertise"
            className="form-input"
            placeholder="Enter your subject expertise"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Work Experience (Years)</label>
          <input
            type="number"
            name="workExperience"
            className="form-input"
            placeholder="Enter years of experience"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Marital Status</label>
          <select name="marriedStatus" className="form-input" required>
            <option value="">Select your status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Relocation Option</label>
          <select name="relocationOption" className="form-input" required>
            <option value="">Select option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Designation Applied</label>
          <input
            type="text"
            name="designationApplied"
            className="form-input"
            placeholder="Enter designation applied for"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Certifications</label>
        <textarea
          name="certifications"
          className="form-input textarea"
          rows="3"
          placeholder="List your certifications and achievements..."
        ></textarea>
      </div>

      <details open> {/* Open by default for better visibility during testing */}
        <summary>📎 Document Uploads</summary>
        <div className="details-content">
          <div className="document-list">
            {[
              { name: "resume", label: "Resume", accept: ".pdf,.doc,.docx" },
              { name: "facultyPhoto", label: "Faculty Photo", accept: "image/*" },
            ].map((field) => (
              <DocumentUploadField
                key={field.name}
                label={field.label}
                name={field.name}
                onFileUpload={handleFileUpload}
                uploadedFile={uploadedFiles[field.name]}
                accept={field.accept}
              />
            ))}
          </div>
        </div>
      </details>
    </>
  )

  const renderManagementFields = () => (
    <>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Employee ID</label>
          <input type="text" name="employeeId" className="form-input" placeholder="Enter your employee ID" required />
        </div>
        <div className="form-group">
          <label className="form-label">Designation</label>
          <select name="designation" className="form-input" required>
            <option value="">Select your designation</option>
            <option value="Principal">Principal</option>
            <option value="Dean">Dean</option>
            <option value="Head of Department (HOD)">Head of Department (HOD)</option>
            <option value="Administrative Officer">Administrative Officer</option>
            <option value="Exam Controller">Exam Controller</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Department/Division</label>
          <select name="department" className="form-input" required>
            <option value="">Select your department</option>
            <option value="Academics">Academics</option>
            <option value="Administration">Administration</option>
            <option value="Finance">Finance</option>
            <option value="Examination Cell">Examination Cell</option>
            <option value="IT Department">IT Department</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Role Type</label>
          <select name="roleType" className="form-input"
           required>
            <option value="">Select access level</option>
            <option value="Admin Access">Admin Access</option>
            <option value="Reviewer">Reviewer</option>
            <option value="Approval Authority">Approval Authority</option>
            <option value="Viewer Only">Viewer Only</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Work Experience (Years)</label>
          <input
            type="number"
            name="workExperience"
            className="form-input"
            placeholder="Enter years of experience"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Current Address</label>
        <textarea
          name="currentAddress"
          className="form-input textarea"
          rows="3"
          placeholder="Enter your complete current address..."
          required
        ></textarea>
      </div>

      <details open> {/* Open by default for better visibility during testing */}
        <summary>📎 Document Upload</summary>
        <div className="details-content">
          <div className="document-list">
            <DocumentUploadField
              label="Management Person Photo"
              name="managementPhoto"
              onFileUpload={handleFileUpload}
              uploadedFile={uploadedFiles["managementPhoto"]}
              accept="image/*"
            />
          </div>
        </div>
      </details>
    </>
  )

  return (
    <div className="app">
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "2rem" }}
      >
        <div className="main-card" style={{ maxWidth: "900px" }}>
          <div className="card-header-maroon" style={{ display: "flex", alignItems: "center" }}>
            <button onClick={onCancel} className="back-button" aria-label="Go back">
              ←
            </button>
            <h3 className="card-title">Update Profile - {userData.role}</h3>
          </div>
          <div style={{ padding: "3rem" }}>
            <form onSubmit={handleSubmit}>
              {userData.role === "Student" && renderStudentFields()}
              {userData.role === "Teaching Faculty" && renderTeachingFacultyFields()}
              {userData.role === "Management" && renderManagementFields()}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "2rem" }}>
                <button type="button" onClick={onCancel} className="btn-grey">
                  Cancel
                </button>
                <button type="submit" className="btn-maroon">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

// Change Password Component
function ChangePassword({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Password changed successfully!")
    onSubmit()
  }

  return (
    <div className="app-login">
      <div className="card">
        <div className="card-header">
          <div className="header-with-back">
            <button onClick={onCancel} className="back-btn" aria-label="Go back">
              ←
            </button>
            <h1 className="card-title">Change Password</h1>
          </div>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="currentPassword" className="form-label">
                Current Password
              </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter your current password"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={onCancel} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Submit Request Component
function SubmitRequest({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    requestType: "",
    subject: "",
    priority: "",
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Request submitted successfully!")
    onSubmit()
  }

  return (
    <div className="app-login">
      <div className="card card-medium">
        <div className="card-header">
          <div className="header-with-back">
            <button onClick={onCancel} className="back-btn" aria-label="Go back">
              ←
            </button>
            <h1 className="card-title">Submit a Request</h1>
          </div>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="requestType" className="form-label">
                Request Type
              </label>
              <select
                id="requestType"
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select request type</option>
                <option value="Leave Application">Leave Application</option>
                <option value="Certificate Request">Certificate Request</option>
                <option value="Fee Related">Fee Related</option>
                <option value="Academic Query">Academic Query</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter request subject"
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={onCancel} className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// Contact Admin Component
function ContactAdmin({ onCancel }) {
  return (
    <div className="app-login">
      <div className="card card-medium">
        <div className="card-header">
          <div className="header-with-back">
            <button onClick={onCancel} className="back-btn" aria-label="Go back">
              ←
            </button>
            <h1 className="card-title">Contact Admin</h1>
          </div>
        </div>
        <div className="card-content">
          <div className="form">
            <div className="form-group">
              <h3 style={{ color: "#1f2937", marginBottom: "1.5rem", fontSize: "1.25rem", fontWeight: "700" }}>
                📞 Contact Information
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>
                  <strong>Phone:</strong> +91 9876543210
                </p>
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>
                  <strong>Email:</strong> admin@college.edu
                </p>
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>
                  <strong>Office:</strong> Admin Block, Room 101
                </p>
                <p style={{ fontSize: "1rem", fontWeight: "500" }}>
                  <strong>Office Hours:</strong> Mon-Fri, 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>
            <div className="form-actions">
              <button onClick={onCancel} className="btn btn-primary btn-full">
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState("login")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [userData, setUserData] = useState(null)
  const [showProfileUpdate, setShowProfileUpdate] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showSubmitRequest, setShowSubmitRequest] = useState(false)
  const [showContactAdmin, setShowContactAdmin] = useState(false)

const handleLogin = (user) => {
  console.log("✅ Logged in user:", user)

  setUserData({
    ID: user.ID,
    firstName: user.Firstname,
    lastName: user.Lastname,
    name: `${user.Firstname} ${user.Lastname}`,
    role: "Student", // Or fetch from your DB if you store role
    mobile: user.Phonenumber,
    email: user.MailID,
    lastLogin: new Date().toLocaleString(),
    profileCompletion: 25, // You can improve this later
  })

  setCurrentPage("dashboard")
}

  const handleSignUp = () => setCurrentPage("category")
  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setCurrentPage("registration")
  }

const handleRegistration = async (formData) => {
  try {
    const payload = {
      Firstname: formData.firstName,
      Lastname: formData.lastName,
      Phonenumber: formData.mobile,
      Gender: formData.gender,
      MailID: formData.email,
      DOB: formData.dateOfBirth,
    };

    const res = await axios.post("http://127.0.0.1:8000/customers", payload);

    console.log("✅ Registered successfully:", res.data);

    // Save user data to state
    setUserData({
      ...formData,
      ID: res.data.ID,
      name: `${res.data.Firstname} ${res.data.Lastname}`,
      role: selectedCategory,
      lastLogin: new Date().toLocaleString(),
      profileCompletion: 25,
    });

    setCurrentPage("dashboard");
  } catch (error) {
    console.error("❌ Registration failed:", error.response?.data || error.message);
    alert("Registration failed: " + (error.response?.data?.detail || error.message));
  }
};

  // New handleLogout function
  const handleLogout = () => {
    setUserData(null); // Clear user data
    setCurrentPage("login"); // Go back to login page
    setShowProfileUpdate(false);
    setShowChangePassword(false);
    setShowSubmitRequest(false);
    setShowContactAdmin(false);
    alert("You have been logged out.");
  };

  const handleProfileUpdate = (profileData) => {
    console.log("Profile update data:", profileData)
    if (userData) {
      setUserData({
        ...userData,
        ...profileData,
        profileCompletion: Math.min(100, userData.profileCompletion + 25),
      })
    }
    setShowProfileUpdate(false)
    alert("Profile updated successfully!")
  }

  const handleQuickAccess = (action) => {
    switch (action) {
      case "profile":
        setShowProfileUpdate(true)
        break
      case "password":
        setShowChangePassword(true)
        break
      case "request":
        setShowSubmitRequest(true)
        break
      case "contact":
        setShowContactAdmin(true)
        break
      default:
        break
    }
  }

  const renderCurrentPage = () => {
    if (showProfileUpdate && userData) {
      return (
        <ProfileUpdate
          userData={userData}
          onSubmit={handleProfileUpdate}
          onCancel={() => setShowProfileUpdate(false)}
        />
      )
    }
    if (showChangePassword) {
      return (
        <ChangePassword onSubmit={() => setShowChangePassword(false)} onCancel={() => setShowChangePassword(false)} />
      )
    }
    if (showSubmitRequest) {
      return <SubmitRequest onSubmit={() => setShowSubmitRequest(false)} onCancel={() => setShowSubmitRequest(false)} />
    }
    if (showContactAdmin) {
      return <ContactAdmin onCancel={() => setShowContactAdmin(false)} />
    }

    switch (currentPage) {
      case "login":
        return <LoginPage onLogin={handleLogin} onSignUp={handleSignUp} />
      case "category":
        // Pass a function to go back to login page
        return <CategorySelection onCategorySelect={handleCategorySelect} onBack={() => setCurrentPage("login")} />
      case "registration":
        // Pass a function to go back to category selection
        return <RegistrationForm category={selectedCategory} onSubmit={handleRegistration} onBack={() => setCurrentPage("category")} />
      case "dashboard":
        return userData ? <Dashboard userData={userData} onQuickAccess={handleQuickAccess} onLogout={handleLogout} /> : null // Pass onLogout
      default:
        return <LoginPage onLogin={handleLogin} onSignUp={handleSignUp} />
    }
  }

  return (
    <>
      <style>{styles}</style>
      {renderCurrentPage()}
    </>
  )
}

export default App
