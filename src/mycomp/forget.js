import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { sendPasswordResetEmail } from "firebase/auth";

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const styles = {
    forgotPasswordPage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      position: 'relative',
      backgroundColor: '#fff',
      backgroundImage: 'url("coverpage.jpg")', 
      backgroundSize: 'cover',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      width: '500px',
      padding: '40px',
      backgroundColor: '#333',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
      zIndex: 2,
    },
    forgotPasswordForm: {
      display: 'flex',
      flexDirection: 'column',
      color: '#fff',
    },
    inputField: {
      margin: '10px 0',
      padding: '15px',
      borderRadius: '5px',
      border: '1px solid #fff',
      fontSize: '18px',
      backgroundColor: 'transparent',
      color: '#fff',
    },
    submitButton: {
      padding: '15px',
      margin: '20px 0',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '20px',
      cursor: 'pointer',
    },
    instructionText: {
      textAlign: 'center',
      color: '#fff',
      fontSize: '16px',
      marginBottom: '20px',
    },
  };

  const handleResetRequest = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      alert("Please enter your email address.");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email sent.');
        navigate('/login'); 
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert("Error: " + (errorMessage || 'Failed to send password reset email.'));
      });
  };

  return (
    <div style={styles.forgotPasswordPage}>
      <div style={styles.overlay}> 
        <div style={styles.formContainer}>
          <form style={styles.forgotPasswordForm} onSubmit={handleResetRequest}>
            <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Reset Password</h1>
            <p style={styles.instructionText}>Enter your email to receive password reset instructions.</p>
            <input
              type="email"
              placeholder="Email"
              style={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
