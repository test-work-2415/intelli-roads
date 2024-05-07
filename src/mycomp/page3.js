
import React, { useState } from 'react';
import Sidebar from './leftbar'; 
import TopBar from './upperbar'; 
import { database } from '../firebase';

const Page3 = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [formData, setFormData] = useState({
    zoneId: '',
    zoneName: '',
    roadId: '',
    roadName: '',
    roadType: '', 
    feedName: '',
    maskName: '',
  });

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    
    setFormData({
      zoneId: '',
      zoneName: '',
      roadId: '',
      roadName: '',
      roadType: '',
      feedName: '',
      maskName: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let dataToSave = {};
  
    if (selectedOption === 'zone') {
      if (!formData.zoneId.trim() || !formData.zoneName.trim()) {
        alert('Please fill out all fields in the zone form.');
        return;
      }
      dataToSave = {
        zoneId: formData.zoneId,
        zoneName: formData.zoneName
      };
      await database.ref(`zones/${formData.zoneId}`).set(dataToSave);
      alert('Zone data saved successfully!');
    } else if (selectedOption === 'road') {
      if (!formData.roadId.trim() || !formData.roadName.trim()) {
        alert('Please fill out all fields in the road form.');
        return;
      }
      dataToSave = {
        roadId: formData.roadId,
        roadName: formData.roadName
      };
      try {
        await database.ref(`roads/${formData.roadId}`).set(dataToSave);
        const roadTrafficData = { vehicleCount: 0, ambulanceCount: 0 };
        await database.ref(`Livefeed/${formData.roadId}`).set(roadTrafficData);
        alert('Road data saved successfully!');
      } catch (error) {
        console.error("Error saving road data: ", error);
        alert('Failed to save road data.');
      }
    } else if (selectedOption === 'calibration') {
      if (!formData.roadId.trim() || !formData.roadType.trim() || !formData.feedName.trim() || !formData.maskName.trim()) {
        alert('Please fill out all fields in the calibration form.');
        return;
      }
  
      
      if (formData.roadType === 'Intersection') {
        if (!formData.zoneId) {
          alert('Zone ID is required for Intersection road type.');
          return;
        }
        const zoneSnapshot = await database.ref(`zones/${formData.zoneId}`).once('value');
        if (!zoneSnapshot.exists()) {
          alert('The Zone ID provided does not exist.');
          return;
        }
        const roadSnapshot = await database.ref(`roads/${formData.roadId}`).once('value');
        if (!roadSnapshot.exists()) {
          alert('The Road ID provided does not exist.');
          return;
        }
      } else if ((formData.roadType === 'MID Point' || formData.roadType === 'Surveillance') && formData.zoneId.trim().toLowerCase() !== 'null') {
        alert('For MID Point and Surveillance, Zone ID must explicitly be "null".');
        return;
      }
  
      dataToSave = {
        zoneId: formData.roadType === 'Intersection' ? formData.zoneId : 'null',
        roadId: formData.roadId,
        roadType: formData.roadType,
        feedName: formData.feedName,
        maskName: formData.maskName
      };
      await database.ref(`calibrations/${formData.roadId}`).set(dataToSave);
      await database.ref(`calibration_history/${formData.roadId}`).set(dataToSave);
      alert('Calibration data saved successfully!');
    }
  
    
    setFormData({
      zoneId: '',
      zoneName: '',
      roadId: '',
      roadName: '',
      roadType: '',
      feedName: '',
      maskName: '',
    });
  };

  const styles = {
    mainContent: {
      backgroundColor: '#1e1e1e',
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '20px',
      marginTop: '60px',
      padding: '20px',
    },
    heading: {
      marginBottom: '20px',
      color: '#fff',
      textAlign: 'center',
    },
    form: {
      background: '#fff',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
    },
    formGroup: {
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    label: {
      width: '20%',
      minWidth: '75px',
      marginBottom: '5px',
    },
    input: {
      flex: '1',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '10px',
    },
    select: {
      width: '200px',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 15px',
      fontSize: '16px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#5cb85c',
      color: 'white',
      cursor: 'pointer',
      marginTop: '10px',
      width: 'fit-content',
    },
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundImage: 'url("background1.jpg")', }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <TopBar />
        <div style={styles.mainContent}>
          <h1 style={styles.heading}>Camera Calibration Setup</h1>
          <select style={styles.select} value={selectedOption} onChange={handleSelectChange}>
            
            <option value="">Select...</option>
            <option value="zone">ZONE</option>
            <option value="road">ROAD</option>
            <option value="calibration">CALIBRATION</option>
          </select>

          {selectedOption === 'zone' && (
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Zone ID:</label>
                <input style={styles.input} type="text" name="zoneId" value={formData.zoneId} onChange={handleInputChange} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Zone Name:</label>
                <input style={styles.input} type="text" name="zoneName" value={formData.zoneName} onChange={handleInputChange} />
              </div>
              <button style={styles.button} type="submit">Save</button>
            </form>
          )}

          {selectedOption === 'road' && (
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Road ID:</label>
                <input style={styles.input} type="text" name="roadId" value={formData.roadId} onChange={handleInputChange} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Road Name:</label>
                <input style={styles.input} type="text" name="roadName" value={formData.roadName} onChange={handleInputChange} />
              </div>
              <button style={styles.button} type="submit">Save</button>
            </form>
          )}

          {selectedOption === 'calibration' && (
            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Zone ID:</label>
                <input style={styles.input} type="text" name="zoneId" value={formData.zoneId} onChange={handleInputChange} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Road ID:</label>
                <input style={styles.input} type="text" name="roadId" value={formData.roadId} onChange={handleInputChange} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Road Type:</label>
                <select style={styles.input} name="roadType" value={formData.roadType} onChange={handleInputChange}>
                  <option value="">Select Road Type</option>
                  <option value="MID Point">MID Point</option>
                  <option value="Intersection">Intersection</option>
                  <option value="Surveillance">Surveillance</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Feed Name:</label>
                <input style={styles.input} type="text" name="feedName" value={formData.feedName} onChange={handleInputChange} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Mask Name:</label>
                <input style={styles.input} type="text" name="maskName" value={formData.maskName} onChange={handleInputChange} />
              </div>
              <button style={styles.button} type="submit">Save</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page3;
