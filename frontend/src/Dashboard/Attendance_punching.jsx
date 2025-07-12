import React, { useState, useEffect } from 'react';
import './Attendance_punching.css';
import backgroundImg from '../background.png';

const AttendancePunching = () => {
  const [punchInImage, setPunchInImage] = useState(null);
  const [punchOutImage, setPunchOutImage] = useState(null);
  const [status, setStatus] = useState('');

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

  const handleImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === 'in') setPunchInImage(URL.createObjectURL(file));
      else setPunchOutImage(URL.createObjectURL(file));
      setStatus(`${type === 'in' ? 'Punch In' : 'Punch Out'} image stored!`);
    }
  };

  return (
    <div className="attendance-punching-outer">
      <div className="attendance-punching-container">
        <h2 className="attendance-title">Attendance Punching</h2>
        <div className="attendance-cards-row">
          {/* Punch In Card */}
          <div className="attendance-card">
            <h3>Punch In</h3>
            <div className="card-status">Status: {punchInImage ? 'Punched In' : 'Not Punched In'}</div>
            <div className="card-info">Time: {punchInImage ? new Date().toLocaleTimeString() : '--:--:--'}</div>
            {punchInImage && <img src={punchInImage} alt="Punch In" className="attendance-img-preview" />}
            <label className="upload-btn">
              {punchInImage ? 'Change Image' : 'Upload Image'}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageChange(e, 'in')} />
            </label>
          </div>
          {/* Punch Out Card */}
          <div className="attendance-card">
            <h3>Punch Out</h3>
            <div className="card-status">Status: {punchOutImage ? 'Punched Out' : 'Not Punched Out'}</div>
            <div className="card-info">Time: {punchOutImage ? new Date().toLocaleTimeString() : '--:--:--'}</div>
            {punchOutImage && <img src={punchOutImage} alt="Punch Out" className="attendance-img-preview" />}
            <label className="upload-btn">
              {punchOutImage ? 'Change Image' : 'Upload Image'}
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleImageChange(e, 'out')} />
            </label>
          </div>
        </div>
        {status && <div className="status-message">{status}</div>}
      </div>
    </div>
  );
};

export default AttendancePunching; 