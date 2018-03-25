import React from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';
import axios from 'axios';
import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyC-w1MNaDzNxltk8NMeQexzUQ1Vo1ngxsU",
    authDomain: "fitness-project-195723.firebaseio.com",
    databaseURL: "https://fitness-project-195723.firebaseio.com/",
    projectId: "fitness-project-195723",
    storageBucket: "",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);
const chartData = [{name: 'Calories Used', value: 400}, {name: 'Rest Calories', value: 80}];
const COLORS = ['#27CA7B', 'transparent'];

class CustomPieChart extends React.Component {

    constructor(props) {
        super(props);
          
        this.state = {
            data: [],
            date: [],
            startAngle: 90,
            endAngle: -270
        };
        
        this.getFitnessData = this.getFitnessData.bind(this);
        this.callback = this.callback.bind(this);
        this.setAuth = this.setAuth.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    };

    componentWillMount () {
        this.getFitnessData(this.props.access_token);
        // this.interval = setInterval(this.forceUpdateHandler, 10);
    }

    getFitnessData(accessToken){

		var current = new Date();
        var year = current.getFullYear();
        var month = current.getMonth();
        var date = current.getDate();

		var endTimeMillis = new Date(year, month, (date+1)).getTime();
		var startTimeMillis = endTimeMillis - 604800000;
		var dataTypeName = 'com.google.calories.expended';
		
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

        // this.setState({data: result});
        
        if (result[6] < 3600) {
            chartData[0].value = result[6];    
            chartData[1].value = 3600 - result[6];
            console.log(chartData);   
        }
        else {
            this.interval = setInterval(this.forceUpdateHandler, 40);
        }
        
        console.log("updated calories data.");
        var dd=new Date();
        var current_date=dd.getDate();
        var client_id='2fP7ys7alZRS6Xtg7SkQmSJ3Wqu1';
        let dbCon = firebase.app().database().ref('/user/'+client_id+'/CaloriesIn/data/'+current_date);
        dbCon.update({
          'calorie':chartData[1].value
        });
        let dbCon1 = firebase.app().database().ref('/user/'+client_id+'/CaloriesOut/data/'+current_date);
        dbCon1.set({
            calorie:chartData[0].value
          });
        this.setState({data: chartData});
    }

    setAuth (error) {
         //this.props.setAuth();
    }

    forceUpdateHandler () {
        this.setState({startAngle: this.state.startAngle - 1});
        this.setState({endAngle: this.state.endAngle - 1});
        

    }
 
    render() {
        return (

            <PieChart width={200} height={135}>
                <Pie
                data={this.state.data}
                dataKey="value"
                cx={120} 
                cy={62}         
                outerRadius={58} 
                strokeWidth={2}
                fill="#13715A"
                stroke='#13715A'
                startAngle={this.state.startAngle}
                endAngle={this.state.endAngle}
                >
                    {
                    this.state.data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                }
                </Pie>
                <Tooltip />
            </PieChart>

        );
    }
}
export default CustomPieChart;