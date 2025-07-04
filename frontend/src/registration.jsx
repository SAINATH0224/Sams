"use client"

import { useState } from "react"
import "./registration.css"
import StudentDashboard from "./Dashboard/Student_dashboard"

export default function StudentRegistration({ onBack, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    mailId: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [registered, setRegistered] = useState(false)
  const [registeredName, setRegisteredName] = useState({ firstName: "", lastName: "" })

  const validateField = (name, value) => {
    let error = ""

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          error = "This field is required"
        } else if (value.length < 2) {
          error = "Must be at least 2 characters"
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Only letters and spaces allowed"
        }
        break

      case "mobileNumber":
        if (!value.trim()) {
          error = "Mobile number is required"
        } else if (!/^\d{10}$/.test(value.replace(/\s/g, ""))) {
          error = "Enter a valid 10-digit mobile number"
        }
        break

      case "mailId":
        if (!value.trim()) {
          error = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Enter a valid email address"
        }
        break

      case "gender":
        if (!value) {
          error = "Please select your gender"
        }
        break

      case "dateOfBirth":
        if (!value) {
          error = "Date of birth is required"
        } else {
          const today = new Date()
          const birthDate = new Date(value)
          const age = today.getFullYear() - birthDate.getFullYear()
          if (age < 16 || age > 100) {
            error = "Age must be between 16 and 100 years"
          }
        }
        break

      case "password":
        if (!value) {
          error = "Password is required"
        } else if (value.length < 8) {
          error = "Password must be at least 8 characters"
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = "Password must contain uppercase, lowercase, and number"
        }
        break

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password"
        } else if (value !== formData.password) {
          error = "Passwords do not match"
        }
        break

      default:
        break
    }

    return error
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    const error = validateField(name, value)
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key])
      if (error) {
        newErrors[key] = error
      }
    })

    setErrors(newErrors)
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}))

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully:", formData)
      alert("Registration successful!")
      setFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        mailId: "",
        gender: "",
        dateOfBirth: "",
        password: "",
        confirmPassword: "",
      })
      setTouched({})
      setRegisteredName({ firstName: formData.firstName, lastName: formData.lastName })
      setRegistered(true)
      if (onRegisterSuccess) onRegisterSuccess({ firstName: formData.firstName, lastName: formData.lastName })
    }
  }

  if (registered) {
    return <StudentDashboard firstName={registeredName.firstName} lastName={registeredName.lastName} />
  }

  return (
    <div className="student-registration">
      <div className="overlap-wrapper">
        <div className="overlap">
          <button className="back-button" onClick={onBack}>&larr; Back</button>
          <form onSubmit={handleSubmit} className="div">
            <div className="category-top" />
            <div className="text-wrapper-2">Student Registration</div>

            <div className="name">
              <div className="overlap-group">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="First Name"
                  className="input-field"
                />
                <div className="rectangle" />
                {touched.firstName && errors.firstName && <div className="error-hint">{errors.firstName}</div>}
              </div>
            </div>

            <div className="name-3">
              <div className="overlap-group">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Last Name"
                  className="input-field"
                />
                <div className="rectangle" />
                {touched.lastName && errors.lastName && <div className="error-hint">{errors.lastName}</div>}
              </div>
            </div>

            <div className="overlap-group-wrapper">
              <div className="overlap-group">
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Mobile Number"
                  className="input-field"
                />
                <div className="rectangle" />
                {touched.mobileNumber && errors.mobileNumber && <div className="error-hint">{errors.mobileNumber}</div>}
              </div>
            </div>

            <div className="name-4">
              <div className="overlap-group">
                <input
                  type="email"
                  name="mailId"
                  value={formData.mailId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Mail ID"
                  className="input-field"
                />
                <div className="rectangle" />
                {touched.mailId && errors.mailId && <div className="error-hint">{errors.mailId}</div>}
              </div>
            </div>

            <div className="div-wrapper">
              <div className="overlap-group">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className="input-field select-field"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="rectangle" />
                {touched.gender && errors.gender && <div className="error-hint">{errors.gender}</div>}
              </div>
            </div>

            <div className="name-5">
              <div className="overlap-group">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Date of birth"
                  className="input-field date-field"
                />
                <div className="rectangle" />
                {touched.dateOfBirth && errors.dateOfBirth && <div className="error-hint">{errors.dateOfBirth}</div>}
              </div>
            </div>

            <div className="name-2">
              <div className="overlap-group">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  className="input-field"
                />
                <div className="rectangle" />
                {touched.password && errors.password && <div className="error-hint">{errors.password}</div>}
              </div>
            </div>

            <div className="name-6">
              <div className="overlap-group">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Confirm Password"
                  className="input-field"
                />
                <div className="rectangle" />
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="error-hint">{errors.confirmPassword}</div>
                )}
              </div>
            </div>

            <button type="submit" className="group">
              <div className="overlap-2">
                <div className="text-wrapper-3">Submit</div>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
