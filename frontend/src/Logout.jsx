import React from "react";

const LogoutPage = ({ onLogin }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #B00D15 0%, #3F0003 100%)' }}>
    <div style={{ background: 'white', padding: '40px 32px', borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
      <h1 style={{ color: '#B00D15', marginBottom: '16px' }}>You have been logged out</h1>
      <p style={{ marginBottom: '32px', color: '#333' }}>Thank you for using the Student Portal.</p>
      <button onClick={onLogin} style={{ background: '#B00D15', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 32px', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 600 }}>Go to Login</button>
    </div>
  </div>
);

export default LogoutPage; 