"use client"

import React, { useState } from "react"
import "./Login.css"
import axios from "axios"
import backgroundImg from "./background.png"

const LoginPage = (props) => {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  })

  const [errors, setErrors] = useState({
    mobileNumber: "",
    password: "",
  })

  const [touched, setTouched] = useState({
    mobileNumber: false,
    password: false,
  })

  const validateMobileNumber = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/
    if (!mobile) return "Mobile number is required"
    if (!mobileRegex.test(mobile)) return "Enter a valid 10-digit mobile number"
    return ""
  }

  const validatePassword = (password) => {
    if (!password) return "Password is required"
    if (password.length < 6) return "Password must be at least 6 characters"
    return ""
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (touched[field]) {
      const error = field === "mobileNumber" ? validateMobileNumber(value) : validatePassword(value)
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }))
    }
  }

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }))

    const error =
      field === "mobileNumber"
        ? validateMobileNumber(formData[field])
        : validatePassword(formData[field])

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log("Form Data:", formData);
    try {
      // Validate all fields before making the API call
      const mobileError = validateMobileNumber(formData.mobileNumber)
      const passwordError = validatePassword(formData.password)

      setErrors({
        mobileNumber: mobileError,
        password: passwordError,
      })

      if (mobileError || passwordError) {
        console.error("Validation errors:", { mobileError, passwordError });
        return;
      }

      const response = await axios.post('http://localhost:8000/customers/login', {
        user_name: formData.mobileNumber,
        password: formData.password,
      });

    if (response.status === 200) {
      console.log("Login successful:", response.data);
    } else {
      console.error("Login failed:", response.data);
  }

    } catch (error) {
      console.error("Error during validation:", error);
      alert("An error occurred during validation. Please try again.");
      return; 
    }

    
}

  return (
    <div className="login-page" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      {/* Bubble animation container */}
      <div className="bubble-animation">
        {/* Centered and spread bubbles, all with UI color */}
        <div className="bubble" style={{ left: '50%', animationDelay: '0s', width: '32px', height: '32px' }}></div>
        <div className="bubble" style={{ left: '47%', animationDelay: '1.2s', width: '22px', height: '22px' }}></div>
        <div className="bubble" style={{ left: '53%', animationDelay: '2.1s', width: '26px', height: '26px' }}></div>
        <div className="bubble" style={{ left: '44%', animationDelay: '0.7s', width: '18px', height: '18px' }}></div>
        <div className="bubble" style={{ left: '56%', animationDelay: '1.7s', width: '20px', height: '20px' }}></div>
        <div className="bubble" style={{ left: '41%', animationDelay: '2.8s', width: '15px', height: '15px' }}></div>
        <div className="bubble" style={{ left: '59%', animationDelay: '2.5s', width: '17px', height: '17px' }}></div>
        <div className="bubble" style={{ left: '38%', animationDelay: '3.2s', width: '13px', height: '13px' }}></div>
        <div className="bubble" style={{ left: '62%', animationDelay: '3.5s', width: '14px', height: '14px' }}></div>
        <div className="bubble" style={{ left: '35%', animationDelay: '4.1s', width: '11px', height: '11px' }}></div>
        <div className="bubble" style={{ left: '65%', animationDelay: '4.3s', width: '12px', height: '12px' }}></div>
      </div>
      <div className="login-container">
        <div className="login-box">
          <div className="meron-top" />
          <div className="login-content">
            <div className="text-wrapper">Login Here</div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group mobile-number">
                <div className="input-wrapper">
                  <input
                    type="tel"
                    className="mobile-input"
                    placeholder="Enter Mobile Number"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                    onBlur={() => handleBlur("mobileNumber")}
                    maxLength={10}
                  />
                  <div className="rectangle" />
                </div>
                {errors.mobileNumber && touched.mobileNumber && <div className="error-hint">{errors.mobileNumber}</div>}
              </div>

              <div className="input-group enter-password">
                <div className="input-wrapper">
                  <input
                    type="password"
                    className="password-input"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onBlur={() => handleBlur("password")}
                  />
                  <div className="rectangle" />
                </div>
                {errors.password && touched.password && <div className="error-hint">{errors.password}</div>}
              </div>

              <button type="submit" className="login-button">
                <div className="button-content">
                  <div className="button-text">Login</div>
                </div>
              </button>
            </form>

            <p className="register-text">
              <span className="span">Don't Have an account ? </span>
              <span className="text-wrapper-4" onClick={props.onSignUp} style={{ cursor: 'pointer', color: '#b00d15', fontWeight: 600 }}>
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
