import React, { Component } from 'react';
import firebase from '../firebase';
import 'firebase/database';
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
    constructor() {
        super();
        this.state = {
            dataPoints: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        

        this.fetchData(); 
        this.interval = setInterval(() => {
            this.fetchData(); // Fetch data every 30 seconds
        }, 30000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval); 
        }
    }

    fetchData() {
        const dbRef = firebase.database().ref('Livefeed');
        dbRef.on('value', snapshot => {
            try {
                const rawData = snapshot.val();
                const dataPoints = [];
                const colors = ["Red"]; // Array of colors
                let i = 0;
                Object.keys(rawData).forEach(key => {
                    const item = rawData[key];
                    const color = colors[i % colors.length];
                    dataPoints.push({
                        
                        x: parseFloat(key),
                        y: item.vehicleCount,
                        indexLabel: `ID: ${key}`,
                        indexLabelFontColor: 'white',
                        color: color
                    });
                    i++;
                });
                this.setState({ dataPoints, loading: false });
            } catch (error) {
                this.setState({ loading: false, error: error.message });
            }
        });
    }

    render() {
        const { dataPoints, loading, error } = this.state;

        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

        const options = {
            animationEnabled: true,// ask saad about it 
            exportEnabled: true,// ask sad about it 
            theme: "dark2",
            title: {
                text: "Vehicle Count "
            },
            axisY: {
                title:'COUNT',
                includeZero: true,
                maximum: 10
            },
            axisX: {
				title: "ROADID",
				
				interval: 1
			},
            data: [{
                
                type: "line",
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: dataPoints
            }],
            width: 700,
            height: 400
        };

        return (
            <div>
                <CanvasJSChart options={options}
                    containerProps={{ width: '50%', height: '300px', margin: 'auto' }}
                />
            </div>
        );
    }
}

export default App;



