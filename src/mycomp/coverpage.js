import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CoverPage() {
  const navigate = useNavigate();
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isSignUpHovered, setIsSignUpHovered] = useState(false);

  const styles = {
    coverPage: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: `url("${process.env.PUBLIC_URL}/coverpage.jpg") no-repeat center center`,
      backgroundSize: 'cover',
      textAlign: 'center',
      color: 'white',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: 500,
      left: 700,
      right: 600,
      bottom: 500,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px',
    },
    logoText: {
      fontWeight: 'bold',
      fontSize: '4rem',
      textShadow: '2px 2px 4px #000000',
      marginBottom: '2rem',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
    },
    button: {
      padding: '15px 30px',
      fontSize: '1.2rem',
      letterSpacing: '1px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '5px',
      transition: 'all 0.3s ease',
      fontWeight: 'bold',
    },
    loginButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      boxShadow: '0 5px 10px 0 rgba(76,175,80,.5)',
    },
    signUpButton: {
      backgroundColor: 'transparent',
      color: 'white',
      border: '2px solid #fff',
      boxShadow: '0 5px 10px 0 rgba(255,255,255,.5)',
    },
    loginButtonHover: {
      backgroundColor: '#369956',
    },
    signUpButtonHover: {
      backgroundColor: '#ffffff',
      color: '#4CAF50',
    },
  };

  return (
    <div style={styles.coverPage}>
      <div style={styles.overlay}>
        <div style={styles.logoText}>INTELLIROADS</div>
        <div style={styles.buttons}>
          <button
            style={{
              ...styles.button,
              ...styles.loginButton,
              ...(isLoginHovered && styles.loginButtonHover)
            }}
            onMouseEnter={() => setIsLoginHovered(true)}
            onMouseLeave={() => setIsLoginHovered(false)}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            style={{
              ...styles.button,
              ...styles.signUpButton,
              ...(isSignUpHovered && styles.signUpButtonHover)
            }}
            onMouseEnter={() => setIsSignUpHovered(true)}
            onMouseLeave={() => setIsSignUpHovered(false)}
            onClick={() => navigate('/sign')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoverPage;
