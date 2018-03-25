import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import axios from 'axios';
import firebase from 'firebase'; 


const chartData = [
    {name: 'A', uv: 40, pv: 2400, amt: 2400},
    {name: 'B', uv: 30, pv: 1398, amt: 2210},
    {name: 'C', uv: 20, pv: 9800, amt: 2290},
    {name: 'D', uv: 27.8, pv: 3908, amt: 2000},
    {name: 'E', uv: 18.9, pv: 4800, amt: 2181},
    {name: 'F', uv: 23.9, pv: 3800, amt: 2500},
    {name: 'G', uv: 34.9, pv: 4300, amt: 2100},
];

class CustomCalorieBarChart extends React.Component {

    constructor(props) {
        super(props);
          
        this.state = {
            data: [],
            date: []
        };
        
        this.getFitnessData = this.getFitnessData.bind(this);
        this.callback = this.callback.bind(this);
        this.setAuth = this.setAuth.bind(this);
    };

    componentWillMount() {

        var weeks = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        var date = new Date();
        var xlabels = [];
        for (let i=6; i>=0; i--){
            var day = date.getDay()-i-1 ;
            if (day < 0) day = day + 7;
            // xlabels[6 - i] = weeks[day] + ' ' + (date.getDate()-i);
            xlabels[6 - i] = (date.getDate()-i);
        }
        this.setState({date: xlabels});

        this.getFitnessData(this.props.access_token);
    }

    getFitnessData(accessToken){

		var current = new Date();
        var year = current.getFullYear();
        var month = current.getMonth();
        var date = current.getDate();

		var endTimeMillis = new Date(year, month, (date+1)).getTime();
		var startTimeMillis = endTimeMillis - 604800000;
		var dataTypeName = this.props.dataTypeName;
		
		var data = {
			"aggregateBy": [{"dataTypeName":dataTypeName}],
			"bucketByTime":{"durationMillis":86400000},
			"startTimeMillis":startTimeMillis,
			"endTimeMillis":endTimeMillis
		};

		var axiosconfig = {
			headers: { Authorization: `Bearer ${accessToken}`,
						'content-type': 'application/json'},
		};

		axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate?alt=json', data, axiosconfig)
        .then(response => this.callback(response))
		.catch(error => this.setAuth(error));
    }
    
    callback (response) {
        var data = response.data.bucket;
        var result = [];
        var count = data.length;
        for (let i = 0; i < count; i++) {
            if (data[i].dataset[0].point.length == 0) {
                result[i] = 0;
            } else {
                result[i] = data[i].dataset[0].point[0].value[0].fpVal;
            }
        }

        var date = this.state.date;

        for (let i = 0; i < count; i++) {
            chartData[i].name = date[i];
            chartData[i].val = result[i];
        } 
        
        console.log("updated calories data.");
        
        var  client_id='2fP7ys7alZRS6Xtg7SkQmSJ3Wqu1';
        for (let i = 0; i < count; i++) {
            let dbCon = firebase.app().database().ref('/user/'+client_id+'/CaloriesIn/data/'+date[i]);
            dbCon.update({
              'calorie':3600-result[i] 
            });
            let dbCon1 = firebase.app().database().ref('/user/'+client_id+'/CaloriesOut/data/'+date[i]);
            dbCon1.set({
                calorie:result[i] 
              });

            let rate=75-Math.round(Math.random()*10);
            let dbCon2 = firebase.app().database().ref('/user/'+client_id+'/HeartRate/data/'+date[i]);
            dbCon2.update({
              'heartRate':rate
            }); 
        }
        this.setState({data: chartData});
        
        
    }

    setAuth (error) {
        //this.props.setAuth();
    }

    render() {
        return (

            <div className='bottom_section'>
                <span style={{fontSize: 22, color: '#359971', paddingBottom: 25}}>Daily Calories Out</span>
                {/* <span style={{color: 'white', fontSize: 32}}>741</span> */}
                {/* <span style={{color: '#A29349',fontSize: 12, marginTop: 0}}>Inactive Calories</span> */}
                {/* <div style={{width: 74, height: 30, backgroundColor: '#F3C031', borderRadius: 15, textAlign: 'center', paddingTop: 5, margin: 5}}>
                    <span style={{color: '#43432C',fontSize: 14, marginTop: 0}}>32%</span>                            
                </div> */}
                {/* <span style={{color: 'white', fontSize: 12}}>736</span> */}
                <BarChart width={270} height={200} data={this.state.data}
                        margin={{top: 10, right: 20, left: -15, bottom: 0}}>
                    <XAxis stroke='#31BC7F' dataKey="name"/>
                    <YAxis stroke='#31BC7F'/>
                    <CartesianGrid strokeDasharray="1 1" vertical={false} stroke='#31BC7F'/>
                    <Tooltip cursor={{ stroke: 'white', strokeWidth: 1, fill: 'rgba(255,255,255,0.1)'}} />
                    <Bar dataKey="val" stroke='#31BC7F' fill="rgba(24,53,57,0.8)" />
                </BarChart>
                <span style={{color: '#A29349',fontSize: 12, marginTop: 20}}>- Wait Time Today (ms) -</span>
            </div>

            

        );
    }
}
export default CustomCalorieBarChart;