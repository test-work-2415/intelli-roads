import React, { useState, useEffect } from 'react';
import TopBar from './upperbar';
import Sidebar from './leftbar';
import { database } from '../firebase';

function Page5() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [zones, setZones] = useState({});
  const [noZoneRoads, setNoZoneRoads] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const calibrationSnapshot = await database.ref('calibration_history').once('value');
        const livefeedSnapshot = await database.ref('Livefeed').once('value');
        const calibrationData = calibrationSnapshot.val() || {};
        const liveFeeds = livefeedSnapshot.val() || {};
  
        const zonesData = {};
        const unzonedRoads = [];
  
        
        Object.keys(calibrationData).forEach(roadId => {
          const { zoneId, roadType, zoneName } = calibrationData[roadId];
          if (roadType === 'Intersection' && zoneId) {
            if (!zonesData[zoneId]) {
              zonesData[zoneId] = { zoneName, roads: [] };
            }
            zonesData[zoneId].roads.push({
              roadId,
              vehicleCount: liveFeeds[roadId]?.vehicleCount || 0,
              ambulanceCount: liveFeeds[roadId]?.ambulanceCount || 0
            });
          }
        });
  
        
        Object.keys(zonesData).forEach(zoneId => {
          let foundGreen = false;
          zonesData[zoneId].roads.forEach(road => {
            if (!foundGreen && road.ambulanceCount > 0) {
              foundGreen = true; 
            } else {
              road.ambulanceCount = 0; 
            }
          });
        });
  
       
        Object.keys(calibrationData).forEach(roadId => {
          const { vehicleCount, ambulanceCount } = liveFeeds[roadId] || {};
          const { roadType, zoneId } = calibrationData[roadId];
          if (roadType !== 'Intersection' && zoneId) {
            unzonedRoads.push({
              roadId,
              vehicleCount: vehicleCount || 0,
              ambulanceCount: ambulanceCount || 0,
              roadType
            });
          }
        });
  
        setZones(zonesData);
        setNoZoneRoads(unzonedRoads);
        setLoading(false);
      } catch (errorObject) {
        setError('Error fetching data: ' + errorObject.message);
        setLoading(false);
      }
    };
  
    const intervalId = setInterval(fetchData, 5000); 
    fetchData();
  
    return () => clearInterval(intervalId);
  }, []);
  

  const renderSignalLight = (ambulanceCount) => (
    <>
      <div style={{
        ...styles.signalLight,
        backgroundColor: 'red',
        opacity: ambulanceCount === 0 ? 1 : 0.1,
      }} />
      <div style={{
        ...styles.signalLight,
        backgroundColor: 'green',
        opacity: ambulanceCount > 0 ? 1 : 0.1,
      }} />
    </>
  );

  const renderUnzonedRoadRow = ({ roadId, vehicleCount, ambulanceCount }) => {
    if (!roadId) return null; 
    return (
      <div key={roadId} style={styles.signalRow}>
        <span style={styles.roadLabel}>
          Road {roadId} (Vehicles Count: {vehicleCount}):
        </span>
        {renderSignalLight(ambulanceCount)}
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <Sidebar />
      <div style={styles.content}>
        <TopBar />
        <div style={styles.splitPage}>
          <div style={styles.column}>
            <h2 style={styles.header}>Zoned Traffic Control</h2>
            {loading && <div style={styles.loading}>Loading signals...</div>}
            {error && <div style={styles.error}>{error}</div>}
            <div style={styles.signalsGrid}>
              {Object.keys(zones).map(zoneId => {
                const { zoneName, roads } = zones[zoneId];
                return (
                  <div key={zoneId} style={styles.zoneContainer}>
                    <div style={styles.zoneHeader}>{zoneName} - Zone ID: {zoneId}</div>
                    {roads.map(({ roadId, vehicleCount, ambulanceCount }) => 
                      <div key={roadId} style={styles.signalRow}>
                        <span style={styles.roadLabel}>
                          Road {roadId} (Vehicles Count: {vehicleCount}) 
                        </span>
                        {renderSignalLight(ambulanceCount)} 
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={styles.column}>
            <h2 style={styles.header}>Unzoned Roads</h2>
            {noZoneRoads.map(renderUnzonedRoadRow)}
          </div>
        </div>
      </div>
    </div>
  );
  
}

const styles = {
  page: {
    display: 'flex',
    backgroundImage: 'url("background1.jpg")',
    color: 'white',
    height: '100vh',
    
  },
  content: {
    flexGrow: 1,
    padding: '0px',
  },
  header: {
    borderBottom: '1px solid gray',
    paddingBottom: '10px',
    color: '#EFEFEF',
    fontSize: '24px',
  },
  loading: {
    color: 'yellow',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  signalsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  zoneContainer: {
    border: '1px solid gray',
    borderRadius: '8px',
    padding: '10px',
    margin: '10px',
    backgroundColor: '#333',
  },
  zoneHeader: {
    color: '#EFEFEF',
    fontWeight: 'bold',
    fontSize: '16px',
    marginBottom: '10px',
  },
  signalRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: '#222',
    padding: '10px',
    borderRadius: '8px',
    marginTop: '5px',
  },
  signalLightContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '20px',
  },
  signalLight: {
    width: '20px',
    height: '20px',
    borderRadius: '10px',
    marginRight: '5px',
  },
  roadLabel: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  splitPage: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    padding: '10px',
  }
};

export default Page5;


