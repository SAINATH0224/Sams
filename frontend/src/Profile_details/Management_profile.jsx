import React, { useState, useEffect } from 'react';
import './Management_profile.css';
import backgroundImg from '../background.png';
import axios from 'axios';

const ManagementProfile = ({ onBack, lockedFields }) => {
  const [registrationDetails, setRegistrationDetails] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    emailId: '',
    dob: '',
  });

  const [formData, setFormData] = useState({
    managementId: '',
    department: '',
    bloodGroup: '',
    nationality: '',
    religion: '',
    category: '',
    documents: {
      appointmentLetter: null,
      idProof: null,
      aadharCard: null,
      managementSignature: null,
      managementPhoto: null
    }
  });
  const [showDocuments, setShowDocuments] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Fetch management registration details from backend
  useEffect(() => {
    const managementId = localStorage.getItem('managementId');
    if (managementId) {
      axios.get(`http://localhost:8000/customers/${managementId}`)
        .then(res => {
          const data = Array.isArray(res.data) ? res.data[0] : res.data;
          setRegistrationDetails({
            firstName: data.Firstname || '',
            lastName: data.Lastname || '',
            mobileNumber: data.Phonenumber || '',
            emailId: data.MailID || '',
            dob: data.DOB || '',
          });
        })
        .catch(() => {});
    }
  }, []);

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

  const validate = (field, value) => {
    if (field.startsWith('documents.')) {
      if (!value) return 'This document is required.';
      return '';
    }
    switch (field) {
      case 'managementId':
        if (!value) return 'Management ID is required.';
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
      console.log('Management Profile submitted:', formData);
      // Handle form submission here
    }
  };

  return (
    <div className="form-container">
      <button className="back-btn" type="button" onClick={onBack} aria-label="Back">
        &#8592; Back
      </button>
      <div className="form-wrapper">
        <div className="form-header">
          <h1>Management Profile Details</h1>
        </div>
        <div className="form-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              {/* Registration Details (read-only in complete profile, editable in update profile) */}
              <div className="input-group">
                <input
                  type="text"
                  name="firstName"
                  value={registrationDetails.firstName}
                  placeholder="First Name"
                  readOnly={lockedFields}
                  disabled={lockedFields}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="lastName"
                  value={registrationDetails.lastName}
                  placeholder="Last Name"
                  readOnly={lockedFields}
                  disabled={lockedFields}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  name="mobileNumber"
                  value={registrationDetails.mobileNumber}
                  placeholder="Mobile Number"
                  readOnly={lockedFields}
                  disabled={lockedFields}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="emailId"
                  value={registrationDetails.emailId}
                  placeholder="Email ID"
                  readOnly={lockedFields}
                  disabled={lockedFields}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <input
                  type="date"
                  name="dob"
                  value={registrationDetails.dob}
                  placeholder="Date of Birth"
                  readOnly={lockedFields}
                  disabled={lockedFields}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="managementId"
                  placeholder="Management ID"
                  value={formData.managementId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  disabled={lockedFields}
                />
                {touched.managementId && errors.managementId && <div className="error-hint">{errors.managementId}</div>}
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
                  disabled={lockedFields}
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
                  disabled={lockedFields}
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
                  disabled={lockedFields}
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
                  disabled={lockedFields}
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
                  disabled={lockedFields}
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
                    { key: 'appointmentLetter', label: 'Appointment Letter' },
                    { key: 'idProof', label: 'ID Proof' },
                    { key: 'aadharCard', label: 'Aadhar Card' },
                    { key: 'managementSignature', label: 'Management Signature' },
                    { key: 'managementPhoto', label: 'Management Photo' },
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

export default ManagementProfile; 