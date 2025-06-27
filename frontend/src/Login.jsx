import React, { useState } from "react";
import "./Login.css";

export const Slide = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    mailId: "",
    gender: "",
    dateOfBirth: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! Data: " + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="slide">
      <div className="slide-card">
        <div className="slide-header">Student Registration</div>
        <form className="slide-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="slide-fields">
            <div className="slide-field">
              <label className="slide-label" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="slide-input"
                required
              />
            </div>
            <div className="slide-field">
              <label className="slide-label" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="slide-input"
                required
              />
            </div>
            <div className="slide-field">
              <label className="slide-label" htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Mobile Number"
                className="slide-input"
                required
              />
            </div>
            <div className="slide-field">
              <label className="slide-label" htmlFor="mailId">Mail ID</label>
              <input
                type="email"
                id="mailId"
                name="mailId"
                value={formData.mailId}
                onChange={handleInputChange}
                placeholder="Mail ID"
                className="slide-input"
                required
              />
            </div>
            <div className="slide-field">
              <label className="slide-label" htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="slide-input"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="slide-field">
              <label className="slide-label" htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="slide-input"
                required
              />
            </div>
          </div>
          <button type="submit" className="slide-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};