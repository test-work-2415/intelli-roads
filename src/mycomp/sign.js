
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { set, ref } from "firebase/database";
import { auth, database } from '../firebase'; 

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const styles = {
    signUpPage: {
      position: 'relative',
      height: '100vh',
      backgroundImage: `url('/coverpage.jpg')`,
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    formContainer: {
      width: '500px',
      padding: '40px',
      backgroundColor: '#333',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
      zIndex: 2,
    },
    signUpForm: {
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
    signUpButton: {
      padding: '15px',
      margin: '20px 0',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '20px',
      cursor: 'pointer',
    },
    checkBoxSection: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0',
      color: '#fff',
    },
    checkBoxLabel: {
      marginLeft: '5px',
      fontSize: '16px',
    },
    signInText: {
      textAlign: 'center',
      color: '#fff',
      fontSize: '16px',
    },
    signInLink: {
      color: '#007bff',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
   
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Check if any field is empty
    if (!username || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    // Check password complexity
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and contain at least one uppercase letter.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    // Check if terms accepted
    if (!termsAccepted) {
      alert('Please accept the terms and privacy policy.');
      return;
    }

    // Create user
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });

      
      await set(ref(database, 'users/' + userCredential.user.uid), {
        username: username,
        email: email,
      });

      navigate('/page1');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred while signing up. Please try again later.');
    }
  };

  return (
    <div style={styles.signUpPage}>
      <div style={styles.overlay}></div>
      <div style={styles.formContainer}>
        <form style={styles.signUpForm} onSubmit={handleSignUp}>
          <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Create Account</h1>
          <input
            type="text"
            placeholder="Username"
            style={styles.inputField}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            style={styles.inputField}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div style={styles.checkBoxSection}>
            <input
              id="termsCheckbox"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="termsCheckbox" style={styles.checkBoxLabel}>
              I accept the terms and privacy policy
            </label>
          </div>
          <button type="submit" style={styles.signUpButton}>
            Sign up
          </button>
          <div style={styles.signInText}>
            Already have an account?{' '}
            <span style={styles.signInLink} onClick={() => navigate('/login')}>
              Log in
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;


