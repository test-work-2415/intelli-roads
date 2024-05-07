import React, { useState } from 'react';
import TopBar from './upperbar';
import Sidebar from './leftbar';
import { GoogleMap, LoadScript, TrafficLayer } from '@react-google-maps/api';
import VehicleCountGraph from './VehicleCountGraph';

const containerStyle = {
  width: '90%',
  height: '500px',
  margin: 'auto',
  
};

const inputStyle = {
  padding: '10px',
  margin: '10px',
  backgroundColor: '#1e1e1e',
  border: 'none',
  borderRadius: '4px',
  color: 'white'
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  backgroundColor: 'red',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer'
};

const mapContainerStyle = {
  marginBottom: '100px'
};

function Page1() {
  const [mapCenter, setMapCenter] = useState({ lat: 31.4028, lng: 74.2573 });
  const [latitude, setLatitude] = useState(31.4028);
  const [longitude, setLongitude] = useState(74.2573);

  const apiKey = "AIzaSyC8ppGmAh5T4ZcjD-CfUXqbv1ltK5u5hKA";

  const handleLatChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLngChange = (e) => {
    setLongitude(e.target.value);
  };

  const updateMapCenter = () => {
    setMapCenter({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
  };

  const handleLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div style={{ display: 'flex', backgroundImage: 'url("background1.jpg")', color: 'white' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <TopBar />
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <label>Latitude</label>
          <input 
            type="number" 
            value={latitude} 
            onChange={handleLatChange} 
            placeholder="Latitude" 
            style={inputStyle}
          />
          <label>Longitude</label>
          <input 
            type="number" 
            value={longitude} 
            onChange={handleLngChange} 
            placeholder="Longitude" 
            style={inputStyle}
          />
          <button onClick={updateMapCenter} style={buttonStyle}>Update Location</button>
          <button onClick={handleLiveLocation} style={buttonStyle}>Live Location</button>
        </div>
        <div style={mapContainerStyle}>
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={18}
            >
              <TrafficLayer autoUpdate />
            </GoogleMap>
          </LoadScript>
        </div>
        <VehicleCountGraph />
      </div>
    </div>
  );
}

export default Page1;



