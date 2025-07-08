// === IMPORTS ===
import React, { useState, useEffect } from 'react';
import './Student_profile.css';
import backgroundImg from '../background.png';

// === COMPONENT ===
const StudentRegistrationForm = ({ onBack }) => {
  // === STATE & VALIDATION ===
  const [formData, setFormData] = useState({
    studentId: '',
    courseBranch: '',
    bloodGroup: '',
    nationality: '',
    religion: '',
    castCategory: '',
    documents: {
      tenthMemo: null,
      twelfthMemo: null,
      rankCard: null,
      transferCertificate: null,
      casteCertificate: null,
      incomeCertificate: null,
      aadharCard: null,
      studentSignature: null,
      studentPhoto: null
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

  // === VALIDATION FUNCTION ===
  const validate = (field, value) => {
    if (field.startsWith('documents.')) {
      if (!value) return 'This document is required.';
      return '';
    }
    switch (field) {
      case 'studentId':
        if (!value) return 'Student ID is required.';
        return '';
      case 'courseBranch':
        if (!value) return 'Course Branch is required.';
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
      case 'castCategory':
        if (!value) return 'Cast Category is required.';
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
      console.log('Form submitted:', formData);
      // Handle form submission here
    }
  };

  // === RENDER ===
  return (
    // === PROFILE CONTAINER & BACKGROUND ===
    <div className="form-container">
      {/* === BACK BUTTON === */}
      <button className="back-btn" type="button" onClick={onBack} aria-label="Back">
        &#8592; Back
      </button>
      {/* === PROFILE BOX WRAPPER === */}
      <div className="form-wrapper">
        {/* === HEADER === */}
        <div className="form-header">
          <h1>Profile Details</h1>
        </div>
        {/* === BODY === */}
        <div className="form-body">
          <form onSubmit={handleSubmit} noValidate>
            {/* === GRID LAYOUT === */}
            <div className="form-grid">
              {/* === INPUTS & SELECTS === */}
              <div className="input-group">
                <input
                  type="text"
                  name="studentId"
                  placeholder="Student ID"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.studentId && errors.studentId && <div className="error-hint">{errors.studentId}</div>}
              </div>

              <div className="input-group">
                <select 
                  name="courseBranch" 
                  value={formData.courseBranch} 
                  onChange={handleInputChange} 
                  onBlur={handleBlur}
                  required
                >
                  <option value="">Course Branch</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="mechanical">Mechanical Engineering</option>
                  <option value="electrical">Electrical Engineering</option>
                  <option value="civil">Civil Engineering</option>
                  <option value="electronics">Electronics & Communication</option>
                  <option value="information-technology">Information Technology</option>
                </select>
                {touched.courseBranch && errors.courseBranch && <div className="error-hint">{errors.courseBranch}</div>}
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
                  name="castCategory" 
                  value={formData.castCategory} 
                  onChange={handleInputChange} 
                  onBlur={handleBlur}
                  required
                >
                  <option value="">Cast Category</option>
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                  <option value="ews">EWS</option>
                </select>
                {touched.castCategory && errors.castCategory && <div className="error-hint">{errors.castCategory}</div>}
              </div>
            </div>
            {/* === UPLOAD DOCUMENTS BUTTON & FIELDS === */}
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
                    { key: 'tenthMemo', label: '10th Memo' },
                    { key: 'twelfthMemo', label: '12th Memo' },
                    { key: 'rankCard', label: 'Rank Card' },
                    { key: 'transferCertificate', label: 'Transfer Certificate' },
                    { key: 'casteCertificate', label: 'Caste Certificate' },
                    { key: 'incomeCertificate', label: 'Income Certificate' },
                    { key: 'aadharCard', label: 'Aadhar Card' },
                    { key: 'studentSignature', label: 'Student Signature' },
                    { key: 'studentPhoto', label: 'Student Photo' },
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
            {/* === SUBMIT BUTTON === */}
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

export default StudentRegistrationForm;