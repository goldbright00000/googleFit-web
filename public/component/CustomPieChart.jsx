import React from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';
import axios from 'axios';

const chartData = [{name: 'Calories Used', value: 400}, {name: 'Rest Calories', value: 80}];
const COLORS = ['#27CA7B', '#FAFF5C'];

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
        this.setState({data: chartData});
        console.log("updated calories data.");
        // console.log(data);
        
    }

    setAuth (error) {
        // this.props.setAuth();
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
                strokeWidth={0}
                fill="#8884d8"
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