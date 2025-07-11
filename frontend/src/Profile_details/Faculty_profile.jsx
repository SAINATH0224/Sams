// === FACULTY PROFILE COMPONENT ===
// This component renders the faculty profile (Profile Details) form and handles validation and document uploads.
// ------------------------------------
import React, { useState, useEffect } from 'react';
import './Faculty_profile.css';
import backgroundImg from '../background.png';
import axios from 'axios';

const FacultyProfile = ({ onBack, lockedFields }) => {
  // === STATE & VALIDATION ===
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    mobileNumber: '',
    emailId: '',
    dob: '',
    facultyId: '',
    department: '',
    bloodGroup: '',
    nationality: '',
    religion: '',
    category: '',
    documents: {
      highestDegree: null,
      experienceCertificate: null,
      aadharCard: null,
      facultySignature: null,
      facultyPhoto: null
    }
  });
  const [showDocuments, setShowDocuments] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // === BACKGROUND EFFECT ===
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

  // Fetch user data from backend
  useEffect(() => {
    const facultyId = localStorage.getItem('facultyId');
    if (facultyId) {
      axios.get(`http://localhost:8000/customers/${facultyId}`)
        .then(res => {
          // If backend returns an array, use the first item
          const data = Array.isArray(res.data) ? res.data[0] : res.data;
          setFormData(prev => ({
            ...prev,
            firstName: data.Firstname || '',
            secondName: data.Lastname || '',
            mobileNumber: data.Phonenumber || '',
            emailId: data.MailID || '',
            dob: data.DOB || '',
            // keep other fields as is
          }));
        })
        .catch(err => {
          console.error('Error fetching faculty data:', err);
        });
    }
  }, []);

  // === VALIDATION FUNCTION ===
  const validate = (field, value) => {
    if (field.startsWith('documents.')) {
      if (!value) return 'This document is required.';
      return '';
    }
    switch (field) {
      case 'firstName':
        if (!value) return 'First Name is required.';
        if (value.length < 2) return 'First Name must be at least 2 characters.';
        return '';
      case 'secondName':
        if (!value) return 'Second Name is required.';
        if (value.length < 2) return 'Second Name must be at least 2 characters.';
        return '';
      case 'mobileNumber':
        if (!value) return 'Mobile Number is required.';
        if (!/^\d{10}$/.test(value)) return 'Enter a valid 10-digit mobile number.';
        return '';
      case 'emailId':
        if (!value) return 'Email ID is required.';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Enter a valid email address.';
        return '';
      case 'dob':
        if (!value) return 'Date of Birth is required.';
        return '';
      case 'facultyId':
        if (!value) return 'Faculty ID is required.';
        return '';
      case 'department':
        if (!value) return 'Department is required.';
        return '';
      case 'bloodGroup':
        if (!value) return 'Blood Group is required.';
        return '';
      case 'nationality':
        if (!value) return 'Nationality is required.';
        return '';
      case 'religion':
        if (!value) return 'Religion is required.';
        return '';
      case 'category':
        if (!value) return 'Category is required.';
        return '';
      default:
        return '';
    }
  };

  // === HANDLERS ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0] || null;
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [name]: file
      }
    }));
    setTouched(prev => ({ ...prev, ["documents." + name]: true }));
    setErrors(prev => ({ ...prev, ["documents." + name]: validate('documents.' + name, file) }));
  };

  const handleBlur = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setTouched(prev => ({ ...prev, ["documents." + name]: true }));
      setErrors(prev => ({ ...prev, ["documents." + name]: validate('documents.' + name, formData.documents[name]) }));
    } else {
      setTouched(prev => ({ ...prev, [name]: true }));
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key === 'documents') {
        Object.keys(formData.documents).forEach(docKey => {
          newErrors["documents." + docKey] = validate('documents.' + docKey, formData.documents[docKey]);
        });
      } else {
        newErrors[key] = validate(key, formData[key]);
      }
    });
    setErrors(newErrors);
    setTouched({
      ...Object.keys(formData).reduce((acc, key) => {
        if (key === 'documents') {
          Object.keys(formData.documents).forEach(docKey => {
            acc["documents." + docKey] = true;
          });
        } else {
          acc[key] = true;
        }
        return acc;
      }, {})
    });
    if (Object.values(newErrors).every((err) => !err)) {
      console.log('Faculty Profile submitted:', formData);
      // Handle form submission here
    }
  };

  // === RENDER ===
  return (
    <div className="form-container">
      <button className="back-btn" type="button" onClick={onBack} aria-label="Back">
        &#8592; Back
      </button>
      <div className="form-wrapper">
        <div className="form-header">
          <h1>Faculty Profile Details</h1>
        </div>
        <div className="form-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              {/* Basic user information fields */}
              <div className="input-group">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="First Name"
                  className="input-field"
                  readOnly={lockedFields}
                />
                {touched.firstName && errors.firstName && <div className="error-hint">{errors.firstName}</div>}
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="secondName"
                  value={formData.secondName}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Second Name"
                  className="input-field"
                  readOnly={lockedFields}
                />
                {touched.secondName && errors.secondName && <div className="error-hint">{errors.secondName}</div>}
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Mobile Number"
                  className="input-field"
                  readOnly={lockedFields}
                />
                {touched.mobileNumber && errors.mobileNumber && <div className="error-hint">{errors.mobileNumber}</div>}
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Email ID"
                  className="input-field"
                  readOnly={lockedFields}
                />
                {touched.emailId && errors.emailId && <div className="error-hint">{errors.emailId}</div>}
              </div>
              <div className="input-group">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Date of Birth"
                  className="input-field"
                  readOnly={lockedFields}
                />
                {touched.dob && errors.dob && <div className="error-hint">{errors.dob}</div>}
              </div>
              {/* Faculty specific fields */}
              <div className="input-group">
                <input
                  type="text"
                  name="facultyId"
                  placeholder="Faculty ID"
                  value={formData.facultyId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.facultyId && errors.facultyId && <div className="error-hint">{errors.facultyId}</div>}
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.department && errors.department && <div className="error-hint">{errors.department}</div>}
              </div>
              <div className="input-group">
                <select 
                  name="bloodGroup" 
                  value={formData.bloodGroup} 
                  onChange={handleInputChange} 
                  onBlur={handleBlur}
                  required
                >
                  <option value="">Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                {touched.bloodGroup && errors.bloodGroup && <div className="error-hint">{errors.bloodGroup}</div>}
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="nationality"
                  placeholder="Nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.nationality && errors.nationality && <div className="error-hint">{errors.nationality}</div>}
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="religion"
                  placeholder="Religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.religion && errors.religion && <div className="error-hint">{errors.religion}</div>}
              </div>
              <div className="input-group">
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange} 
                  onBlur={handleBlur}
                  required
                >
                  <option value="">Category</option>
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                  <option value="ews">EWS</option>
                </select>
                {touched.category && errors.category && <div className="error-hint">{errors.category}</div>}
              </div>
            </div>
            <div style={{ margin: '24px 0' }}>
              <button
                type="button"
                className="submit-btn upload-documents-btn"
                style={{ marginBottom: '16px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', position: 'relative' }}
                onClick={() => setShowDocuments(v => !v)}
              >
                <span style={{ flex: 1, textAlign: 'center', fontWeight: 600 }}>Upload Documents</span>
                <span style={{ position: 'absolute', right: 24, display: 'flex', alignItems: 'center', transition: 'transform 0.2s', transform: showDocuments ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
              {showDocuments && (
                <div className="documents-upload-grid">
                  {[
                    { key: 'highestDegree', label: 'Highest Degree Certificate' },
                    { key: 'experienceCertificate', label: 'Experience Certificate' },
                    { key: 'aadharCard', label: 'Aadhar Card' },
                    { key: 'facultySignature', label: 'Faculty Signature' },
                    { key: 'facultyPhoto', label: 'Faculty Photo' },
                  ].map(doc => (
                    <div className="input-group file-upload" key={doc.key}>
                      <label className="file-label" htmlFor={doc.key}>{doc.label}</label>
                      <div className="file-upload-row">
                        <label htmlFor={doc.key} className="choose-file-btn">Choose File</label>
                        <input
                          type="file"
                          id={doc.key}
                          name={doc.key}
                          onChange={handleFileChange}
                          onBlur={handleBlur}
                          accept=".pdf,.jpg,.jpeg,.png"
                          style={{ display: 'none' }}
                        />
                        <span className="file-chosen-name">{formData.documents[doc.key]?.name || 'No file chosen'}</span>
                      </div>
                      {touched['documents.' + doc.key] && errors['documents.' + doc.key] && (
                        <div className="error-hint">{errors['documents.' + doc.key]}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="submit-container">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile; 