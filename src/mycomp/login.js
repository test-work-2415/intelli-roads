import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const styles = {
    loginPage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: `url('/coverpage.jpg')`, 
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      
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
    loginForm: {
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
    loginButton: {
      padding: '15px',
      margin: '20px 0',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '20px',
      cursor: 'pointer',
    },
    forgotPassword: {
      textAlign: 'right',
      margin: '10px 0',
      color: '#007bff',
      cursor: 'pointer',
      fontSize: '16px',
      textDecoration: 'underline',
    },
    signUpText: {
      textAlign: 'center',
      color: '#fff',
      fontSize: '16px',
    },
    signUpLink: {
      color: '#007bff',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
   
    if (!email) {
      alert('Please enter an email address.');
      return;
    }
  
    if (!password) {
      alert('Please enter a password.');
      return;
    }
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        navigate('/page1'); 
      })
      .catch((error) => {
        let customMessage = '';
        switch (error.code) {
          case 'auth/wrong-password':
            customMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/user-not-found':
            customMessage = 'Wrong email. Please try again.';
            break;
          case 'auth/invalid-email':
            customMessage = 'Invalid email format. Please check your email address and try again.';
            break;
          case 'auth/invalid-credential':
            customMessage = 'The login credentials provided are invalid. Please try again.';
            break;
          default:
            customMessage = 'Login failed. Please try again.';
        }
        alert(customMessage);
      });
  };
  
  
  const navigateToForgotPassword = () => {
    navigate('/forget');
  };

  return (
    <div style={styles.loginPage}>
      <div style={styles.overlay}>
        <div style={styles.formContainer}>
          <form style={styles.loginForm} onSubmit={handleLogin}>
            <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Login</h1>
            <input
              type="email"
              placeholder="Email"
              style={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              style={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a style={styles.forgotPassword} onClick={navigateToForgotPassword}>
              Forgot password?
            </a>
            <button type="submit" style={styles.loginButton}>
              Log in
            </button>
            <div style={styles.signUpText}>
              Don’t have an account?{' '}
              <span style={styles.signUpLink} onClick={() => navigate('/sign')}>
                Sign up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;



