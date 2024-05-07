import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
function TopBar() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();
  const auth = getAuth(); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });

    return () => {
      clearInterval(timer);
      unsubscribe(); 
    };
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    return date.toLocaleTimeString(undefined, options);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const styles = {    topBar: {
    width: '100%',
    height: '145px',
    backgroundColor: '#000',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    boxSizing: 'border-box',
  },
  logoText: {
    fontSize: '3.5em',
  },
  dateTime: {
    fontSize: '1.5em',
    textAlign: 'center',
    marginLeft: '20px',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.5em',
  },
  userProfileIcon: {
    fontSize: '2em',
    marginRight: '10px',
  },
  logoutButton: {
    cursor: 'pointer',
    padding: '10px 20px',
    backgroundColor: '#f00',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.3em',
    
  } };

  return (
    <div style={styles.topBar}>
      <span style={styles.logoText}>IntelliRoads</span>
      <div style={styles.dateTime}>
        <span>{formatDate(currentDateTime)}</span>
        <br />
        <span>{formatTime(currentDateTime)}</span>
      </div>
      <div style={styles.userSection}>
        <div style={styles.userProfileIcon}>👤</div>
        <div>
          <div style={styles.userName}>{user ? user.displayName : 'Loading...'}</div>
          <div style={styles.userRole}>Traffic Control Room</div>
        </div>
      </div>
      <button style={styles.logoutButton} onClick={handleLogout}>⏻ Logout</button>
    </div>
  );
}

export default TopBar;


