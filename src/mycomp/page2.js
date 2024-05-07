
import React, { useState, useEffect } from 'react';

import TopBar from './upperbar';
import Sidebar from './leftbar';

function MenuCamera({ areas, setAreas, cameraVisibility, setCameraVisibility }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cameraInput, setCameraInput] = useState({});

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addArea = () => {
    const newAreaId = areas.length + 1;
    const newArea = {
      id: newAreaId,
      name: `Area ${newAreaId}`,
      cameras: []
    };
    setAreas([...areas, newArea]);
  };

  const deleteArea = (areaId) => {
    const updatedAreas = areas.filter(area => area.id !== areaId);
    setAreas(updatedAreas);
  };

  const deleteCamera = (areaId, cameraId) => {
    const updatedAreas = areas.map(area => {
      if (area.id === areaId) {
        const updatedCameras = area.cameras.filter(camera => camera.id !== cameraId);
        return { ...area, cameras: updatedCameras };
      }
      return area;
    });
    setAreas(updatedAreas);
  };

  const addCamera = (areaId) => {
    const newCameraId = areas.reduce((maxId, area) => Math.max(maxId, ...area.cameras.map(camera => camera.id)), 0) + 1;
    const newCameraName = cameraInput[areaId]?.name || `Camera ${newCameraId}`;
    const newVideoUrl = cameraInput[areaId]?.url || 'public/default.mp4';
    const newCamera = {
      id: newCameraId,
      name: newCameraName,
      videoUrl: newVideoUrl
    };
    setCameraVisibility(prev => ({...prev, [newCameraId]: true}));
    const updatedAreas = areas.map(area => {
      if (area.id === areaId) {
        return { ...area, cameras: [...area.cameras, newCamera] };
      }
      return area;
    });
    setAreas(updatedAreas);
    setCameraInput(prev => ({ ...prev, [areaId]: { name: '', url: '' } })); 
  };

  const handleCameraInputChange = (areaId, field, value) => {
    setCameraInput(prev => ({
      ...prev,
      [areaId]: { ...prev[areaId], [field]: value }
    }));
  };


  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      height: '100vh',
      backgroundImage: 'url("background1.jpg")',
      color: '#333',
      position: 'relative',
    },
    menuButton: {
      padding: '10px 20px',
      backgroundColor: '#0056b3',
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      margin: '10px 20px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    sidebar: {
      position: 'fixed',
      top: 125, 
      right: 0, 
      height: '100vh',
      width: '300px',
      backgroundImage: 'url("background1.jpg")',
      transition: 'transform 0.3s ease-in-out',
      transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)', 
      overflowY: 'auto',
      zIndex: 100,
      padding: '20px',
      color: '#fff',
    },
    menuHeader: {
      padding: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
      borderBottom: '1px solid #444',
    },
    menuItem: {
      padding: '15px',
      borderBottom: '1px solid #444',
      marginBottom: '10px',
    },
    subItem: {
      padding: '10px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    smallButton: {
      padding: '10px 20px',
      backgroundColor: '#28a745',
      color: '#fff',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      marginLeft: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    addButton: {
      padding: '12px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      width: '100%',
      textAlign: 'center',
      marginTop: '20px',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.12)',
    },
    deleteButton: {
      padding: '5px 10px',
      backgroundColor: '#dc3545',
      color: '#fff',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      marginLeft: '10px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    deleteButton2: {
      padding: '5px 10px',
      backgroundColor: 'white',
      color: 'black',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      marginLeft: '10px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    }
  };
  return (
    <div style={styles.container}>
      <button onClick={toggleSidebar} style={styles.menuButton}>
        {isSidebarOpen ? 'Close NewCamera' : 'NewCamera'}
      </button>
      <div style={{...styles.sidebar, right: isSidebarOpen ? '0' : '-100%'}}>
        <div style={styles.menuHeader}>NewCamera</div>
        {areas.map((area) => (
          <div key={area.id} style={styles.menuItem}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{fontSize: '18px', fontWeight: 'bold'}}>{area.name}</span>
              <div>
                <button onClick={() => deleteArea(area.id)} style={styles.deleteButton}>Delete</button> 
              </div>
            </div>
            {area.cameras.map((camera) => (
              <div key={camera.id} style={styles.subItem}>
                <span style={{fontSize: '16px', fontWeight: 'bold'}}>{camera.name}</span>
                <button onClick={() => deleteCamera(area.id, camera.id)} style={styles.deleteButton2}>Delete</button>
              </div>
            ))}
            <input
              type="text"
              placeholder="Camera Name"
              value={cameraInput[area.id]?.name || ''}
              onChange={(e) => handleCameraInputChange(area.id, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Video URL"
              value={cameraInput[area.id]?.url || ''}
              onChange={(e) => handleCameraInputChange(area.id, 'url', e.target.value)}
            />
            <button onClick={() => addCamera(area.id)} style={styles.smallButton}>
              Add Camera
            </button>
          </div>
        ))}
        <button onClick={addArea} style={styles.addButton}>Add Area</button>
      </div>
    </div>
  );
}

function Page2() {
  const [areas, setAreas] = useState(() => {
    const savedAreas = JSON.parse(localStorage.getItem('areas'));
    return savedAreas || [];
  });

  const [cameraVisibility, setCameraVisibility] = useState(() => {
    const savedVisibility = JSON.parse(localStorage.getItem('cameraVisibility'));
    return savedVisibility || {};
  });

  useEffect(() => {
    localStorage.setItem('areas', JSON.stringify(areas));
  }, [areas]);

  useEffect(() => {
    localStorage.setItem('cameraVisibility', JSON.stringify(cameraVisibility));
  }, [cameraVisibility]);

  return (
    <div style={{ display: 'flex',  backgroundImage: 'url("background1.jpg")', color: 'white' }}>
      <Sidebar /> 
      <div style={{ flexGrow: 1 }}>
        <TopBar /> 
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '20px' }}>
          {areas.map((area) => (
            area.cameras.map((camera) => (
              <div key={`${area.id}-${camera.id}`} style={{ marginBottom: '40px', width: '700px', height: '700px', position: 'relative' }}>
                <video width="100%" height="100%" controls autoPlay muted onEnded={(e) => e.target.play()}>
                  <source src={camera.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div style={{position: 'absolute',bottom: '-50px',  left: '0',padding: '10px',background: 'black',fontSize: '16px', fontWeight: 'bold',color: 'white'  // Ensuring the text is clearly visible against the dark background
}}>{area.name} - {camera.name}</div>
              </div>
            ))
          ))}
        </div>
        <MenuCamera areas={areas} setAreas={setAreas} cameraVisibility={cameraVisibility} setCameraVisibility={setCameraVisibility} />
      </div>
    </div>
  );
}

export default Page2;



