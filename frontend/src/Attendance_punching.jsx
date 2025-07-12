import React, { useState, useEffect } from 'react';
import './Attendance_punching.css';
import backgroundImg from './background.png';

const AttendancePunching = ({ onBack }) => {
  const [punchInImage, setPunchInImage] = useState(null);
  const [punchOutImage, setPunchOutImage] = useState(null);
  const [punchInBase64, setPunchInBase64] = useState('');
  const [punchOutBase64, setPunchOutBase64] = useState('');
  const [status, setStatus] = useState('');
  const [showPunchInBase64, setShowPunchInBase64] = useState(false);
  const [showPunchOutBase64, setShowPunchOutBase64] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState({});

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

  // Helper to convert file to base64
  const fileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // API call to verify face
  const verifyFaceWithAPI = async (base64Image, type) => {
    setIsLoading(true);
    try {
      // You can replace this with actual customer ID from your authentication system
      const customerId = "1"; // This should come from your user session/context
      
      const response = await fetch(`http://localhost:8000/student/verify-face/${customerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_base64: base64Image
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setVerificationResult(prev => ({
        ...prev,
        [type]: result
      }));

      if (result.valid_face) {
        setStatus(`${type === 'in' ? 'Punch In' : 'Punch Out'} verified successfully! Face detected.`);
      } else {
        setStatus(`${type === 'in' ? 'Punch In' : 'Punch Out'} failed! No face or multiple faces detected.`);
      }

      return result;
    } catch (error) {
      console.error('Error verifying face:', error);
      setStatus(`Error verifying ${type === 'in' ? 'Punch In' : 'Punch Out'}: ${error.message}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // For preview
      const imageUrl = URL.createObjectURL(file);
      if (type === 'in') setPunchInImage(imageUrl);
      else setPunchOutImage(imageUrl);

      // For base64
      fileToBase64(file, async (base64String) => {
        if (type === 'in') {
          setPunchInBase64(base64String);
          console.log("Base64 String:", base64String);
        } else {
          setPunchOutBase64(base64String);
        }

        // Send to backend for verification
        await verifyFaceWithAPI(base64String, type);
      });
    }
  };

  return (
    <div className="attendance-punching-outer">
      {/* Back Button */}
      <button className="back-btn" type="button" onClick={onBack} aria-label="Back" style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: '#B00D15',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        &#8592; Back
      </button>
      <div className="attendance-punching-container">
        <h2 className="attendance-title">Attendance Punching</h2>
        {isLoading && (
          <div style={{ 
            textAlign: 'center', 
            padding: '10px', 
            backgroundColor: '#fff3cd', 
            color: '#856404',
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            Verifying face... Please wait.
          </div>
        )}
        <div className="attendance-cards-row">
          {/* Punch In Card */}
          <div className="attendance-card">
            <h3>Punch In</h3>
            <div className="card-status">Status: {punchInImage ? 'Punched In' : 'Not Punched In'}</div>
            <div className="card-info">Time: {punchInImage ? new Date().toLocaleTimeString() : '--:--:--'}</div>
            {verificationResult.in && (
              <div style={{ 
                padding: '5px', 
                margin: '5px 0',
                backgroundColor: verificationResult.in.valid_face ? '#d4edda' : '#f8d7da',
                color: verificationResult.in.valid_face ? '#155724' : '#721c24',
                borderRadius: '3px',
                fontSize: '12px'
              }}>
                Face Verification: {verificationResult.in.valid_face ? '✅ Valid' : '❌ Invalid'}
              </div>
            )}
            {punchInImage && <img src={punchInImage} alt="Punch In" className="attendance-img-preview" />}
            <label className="upload-btn">
              {punchInImage ? 'Change Image' : 'Upload Image'}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageChange(e, 'in')} />
            </label>
            {/* Show base64 string (for demo, you can remove this in production) */}
            {punchInBase64 && (
              <div style={{ marginTop: '5px' }}>
                <span
                  style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer', fontSize: '12px' }}
                  onClick={() => setShowPunchInBase64(!showPunchInBase64)}
                >
                  {showPunchInBase64 ? 'Hide Base64 String' : 'Show Base64 String'}
                </span>
                {showPunchInBase64 && (
                  <div style={{ wordBreak: 'break-all', fontSize: '10px', marginTop: '5px' }}>
                    <b>Base64:</b> {punchInBase64}
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Punch Out Card */}
          <div className="attendance-card">
            <h3>Punch Out</h3>
            <div className="card-status">Status: {punchOutImage ? 'Punched Out' : 'Not Punched Out'}</div>
            <div className="card-info">Time: {punchOutImage ? new Date().toLocaleTimeString() : '--:--:--'}</div>
            {verificationResult.out && (
              <div style={{ 
                padding: '5px', 
                margin: '5px 0',
                backgroundColor: verificationResult.out.valid_face ? '#d4edda' : '#f8d7da',
                color: verificationResult.out.valid_face ? '#155724' : '#721c24',
                borderRadius: '3px',
                fontSize: '12px'
              }}>
                Face Verification: {verificationResult.out.valid_face ? '✅ Valid' : '❌ Invalid'}
              </div>
            )}
            {punchOutImage && <img src={punchOutImage} alt="Punch Out" className="attendance-img-preview" />}
            <label className="upload-btn">
              {punchOutImage ? 'Change Image' : 'Upload Image'}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageChange(e, 'out')} />
            </label>
            {/* Show base64 string (for demo, you can remove this in production) */}
            {punchOutBase64 && (
              <div style={{ marginTop: '5px' }}>
                <span
                  style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer', fontSize: '12px' }}
                  onClick={() => setShowPunchOutBase64(!showPunchOutBase64)}
                >
                  {showPunchOutBase64 ? 'Hide Base64 String' : 'Show Base64 String'}
                </span>
                {showPunchOutBase64 && (
                  <div style={{ wordBreak: 'break-all', fontSize: '10px', marginTop: '5px' }}>
                    <b>Base64:</b> {punchOutBase64}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {status && <div className="status-message">{status}</div>}
      </div>
    </div>
  );
};

export default AttendancePunching;