import React, { useState, useEffect } from 'react';
import Sidebar from './leftbar';
import TopBar from './upperbar';
import { database } from '../firebase';

function generateUniqueFIR(existingFIRs) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let firNumber = '';
  do {
    firNumber = '';
    for (let i = 0; i < 4; i++) {
      firNumber += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 4; i++) {
      firNumber += Math.floor(Math.random() * 10);
    }
  } while (existingFIRs.has(firNumber));
  return firNumber;
}

function Page4() {
  const [formData, setFormData] = useState({
    firNumber: '',
    personName: '',
    cnicNumber: '',
    phoneNumber: '',
    vehicleNumber: '',
    vehicleModel: '',
    vehicleColor: '',
    dateTime: '',
  });
  const [uniqueFIRs, setUniqueFIRs] = useState(new Set());
  const [firs, setFirs] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const newFIR = generateUniqueFIR(uniqueFIRs);
    setUniqueFIRs(prevFIRs => new Set(prevFIRs).add(newFIR));
    setFormData(prevFormData => ({ ...prevFormData, firNumber: newFIR }));

    const stolenVehicleRef = database.ref('stolenvehicle');
    const onValueChange = stolenVehicleRef.on('value', (snapshot) => {
      const firsData = snapshot.val() || {};
      const loadedFIRs = Object.keys(firsData).map(key => ({
        ...firsData[key],
        id: key,
      }));
      setFirs(loadedFIRs);
    });

    return () => {
      stolenVehicleRef.off('value', onValueChange);
    };
  }, []);

  useEffect(() => {
    const stolenCarRef = database.ref('stolenCar');
    
    const onValueChange = snapshot => {
      console.log("Firebase snapshot:", snapshot.val());  
      const data = snapshot.val() || {};
      const activeAlerts = Object.values(data).filter(car => {
        return car.detectedRoadId && parseInt(car.detectedRoadId) !== 0 && car.detectedRoadId !== 'NA';
      }).map(car => {
        return car;
      });
      console.log("Processed alerts:", activeAlerts);  
      setAlerts(activeAlerts);
    };
  
    stolenCarRef.on('value', onValueChange);
  
    
    const intervalId = setInterval(() => {
      stolenCarRef.once('value', onValueChange);
    }, 5000);
  
    
    return () => {
      stolenCarRef.off('value', onValueChange);
      clearInterval(intervalId);
    };
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const stolenVehicleRef = database.ref(`stolenvehicle/${formData.firNumber}`);
    stolenVehicleRef.set(formData, error => {
      if (error) {
        console.error('Data could not be saved.', error);
      } else {
        console.log('Data saved successfully.');
        alert("Data is saved");
        const stolenCarData = {
          firNumber: formData.firNumber,
          vehicleNumber: formData.vehicleNumber,
          detectedRoadId: 'NA',
          time: 'NA',
          image: 'NA'
        };
        const stolenCarRef = database.ref(`stolenCar/${formData.firNumber}`);
        stolenCarRef.set(stolenCarData, error => {
          if (error) {
            console.error('Stolen car data could not be saved.', error);
          } else {
            console.log('Stolen car data saved successfully.');
          }
        });
        const newFIR = generateUniqueFIR(uniqueFIRs);
        setUniqueFIRs(prevFIRs => new Set(prevFIRs).add(newFIR));
        setFormData({
          firNumber: newFIR,
          personName: '',
          cnicNumber: '',
          phoneNumber: '',
          vehicleNumber: '',
          vehicleModel: '',
          vehicleColor: '',
          dateTime: '',
        });
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (firId) => {
    database.ref('stolenvehicle').child(firId).remove();
    database.ref('stolenCar').child(firId).remove();
  };

  const styles = {
    pageContainer: {
      display: 'flex',
      backgroundImage: 'url("background1.jpg")',
      color: 'white',
      height: '100vh',
    },
    mainContent: {
      flexGrow: 1,
      
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'scroll',
      
      

    },
    alertBox: {
      position: 'fixed',
      right: '10px',
      top: '200px',
      backgroundColor: '#1e1e1e',
      color: '#fff',
      padding: '40px',
      borderRadius: '5px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      width: '500px',
      height: '1000px',
      overflowY: 'auto',
      
    },
    alertTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textAlign: 'center',
    },
    formBox: {
      
      marginTop: '10px',
      backgroundColor: '#1e1e1e',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      maxWidth: '400px',
      margin: '20px auto',
      marginLeft: '40px',
    },
    label: {
      marginBottom: '0.5em',
      color: '#ccc',
      width: '100%',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #555',
      borderRadius: '4px',
      backgroundColor: '#333',
      color: '#fff',
    },
    button: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#5cb85c',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px',
      width: '100%',
    },
    firEntry: {
      marginLeft: '40px', 
    backgroundColor: '#1e1e1e',
    borderRadius: '5px',
    padding: '10px',
    margin: '20px 0',
    width: '50%',
    maxWidth: '2000px',
  },
    deleteButton: {
      backgroundColor: 'red',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    
    alertImage: {
        width: '400px', 
        height: '300px',
        display: 'block',
        marginBottom: '10px'
    }
  };
  const buttonStyle = {
    backgroundColor: 'red',
    color: 'white', 
    border: 'none', 
    padding: '10px 20px', 
    borderRadius: '5px', 
    cursor: 'pointer', 
  };

  return (
    <div style={styles.pageContainer}>
      <Sidebar />
      <div style={styles.mainContent}>
        <TopBar />
        <div style={styles.formBox}>
        <div style={styles.alertTitle}>Stolen Car Data</div>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((field) => (
              <div key={field} style={styles.label}>
                {`${field.charAt(0).toUpperCase()}${field.slice(1).replace(/([A-Z])/g, ' $1')}:`}
                <input
                  type={field === 'dateTime' ? 'datetime-local' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
            ))}
            <button type="submit" style={styles.button}>Submit</button>
            
          </form>
        </div>
        {firs.map((fir) => (
          <div key={fir.id} style={styles.firEntry}>
            <div style={styles.alertTitle}>Stolen Car Info</div>
            <p>FIR Number: {fir.firNumber}</p>
            <p>Name: {fir.personName}</p>
            <p>CNIC: {fir.cnicNumber}</p>
            <p>Phone: {fir.phoneNumber}</p>
            <p>Vehicle Number: {fir.vehicleNumber}</p>
            <p>Vehicle Model: {fir.vehicleModel}</p>
            <p>Vehicle Color: {fir.vehicleColor}</p>
            <p>Date Time: {fir.dateTime}</p>
            <button style={styles.deleteButton} onClick={() => handleDelete(fir.id)}>
              Delete
            </button>
          </div>
        ))}
        <div style={styles.alertBox}>
          <div style={styles.alertTitle}>Alert</div>
          {alerts.map((alert, index) => (
            <div key={index}>
              <p>Vehicle Number: {alert.vehicleNumber}</p>
              <p>FIR Number: {alert.firNumber}</p>
              <p>Detected Road ID: {alert.detectedRoadId}</p>
              <p>Time: {alert.time}</p>
              <img src={alert.image} alt={`FIR ${alert.firNumber}`} style={styles.alertImage} />
              <button onClick={() => handleDelete(alert.firNumber)} style={buttonStyle}>Dismiss</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page4;

