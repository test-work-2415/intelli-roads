import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const styles = {
    sidebar: {
      width: '150px',
      height: '100vh',
      backgroundColor: '#000',
      color: '#B25093',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: '26px',
      boxSizing: 'border-box',
    },
    logo: {
      width: '100px',
      height: '100px',
      marginBottom: '20px',
    },
    menuItem: {
      width: '100%',
      padding: '20px 0',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '16px',
      borderBottom: '5px solid #000',
      backgroundColor: '#fff',
    },
    image: {
      width: '50px',
      height: '50px',
      marginBottom: '10px',
    },
    text: {
      marginTop: '10px',
    }
  };

  return (
    <div style={styles.sidebar}>
      <img src={`${process.env.PUBLIC_URL}/logo.jpg`} alt="Logo" style={styles.logo} />

      <button style={styles.menuItem} onClick={() => navigate('/page1')}>
        <img src={`${process.env.PUBLIC_URL}/dashboard.jpg`} alt="Dashboard" style={styles.image} />
        <span style={styles.text}>Dashboard</span>
      </button>
      <button style={styles.menuItem} onClick={() => navigate('/page2')}>
        <img src={`${process.env.PUBLIC_URL}/cctv.jpg`} alt="CCTV" style={styles.image} />
        <span style={styles.text}>CCTV</span>
      </button>
      <button style={styles.menuItem} onClick={() => navigate('/page3')}>
        <img src={`${process.env.PUBLIC_URL}/report.jpg`} alt="Reports" style={styles.image} />
        <span style={styles.text}>Add Cam Info</span>
      </button>
      <button style={styles.menuItem} onClick={() => navigate('/page4')}>
        <img src={`${process.env.PUBLIC_URL}/violation.jpg`} alt="Stolen Vehicle" style={styles.image} />
        <span style={styles.text}>Stolen Vehicle</span>
      </button>
      <button style={styles.menuItem} onClick={() => navigate('/page5')}>
        <img src={`${process.env.PUBLIC_URL}/adddata.jpg`} alt="Signal Control" style={styles.image} />
        <span style={styles.text}>Signal Control</span>
      </button>
    </div>
  );
}

export default Sidebar;
