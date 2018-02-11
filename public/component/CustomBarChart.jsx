import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import axios from 'axios';

const data = [
    {name: 'A', uv: 40, pv: 2400, amt: 2400},
    {name: 'B', uv: 30, pv: 1398, amt: 2210},
    {name: 'C', uv: 20, pv: 9800, amt: 2290},
    {name: 'D', uv: 27.8, pv: 3908, amt: 2000},
    {name: 'E', uv: 18.9, pv: 4800, amt: 2181},
    {name: 'F', uv: 23.9, pv: 3800, amt: 2500},
    {name: 'G', uv: 34.9, pv: 4300, amt: 2100},
];

class CustomBarChart extends React.Component {

    constructor(props) {
        super(props);
          
        this.state = {
            data: [],
            date: []
        };
        
        // this.getFitnessData = this.getFitnessData.bind(this);
        // this.callback = this.callback.bind(this);
        // this.setAuth = this.setAuth.bind(this);
    };

    render() {
        return (

            <BarChart width={270} height={140} data={data}
                    margin={{top: 0, right: 20, left: -15, bottom: 0}}>
                <XAxis stroke='#31BC7F' dataKey="name"/>
                <YAxis stroke='#31BC7F'/>
                <CartesianGrid strokeDasharray="1 1" vertical={false} stroke='#31BC7F'/>
                <Tooltip cursor={{ stroke: 'white', strokeWidth: 1, fill: 'rgba(255,255,255,0.1)'}} />
                <Bar dataKey="uv" stroke='#31BC7F' fill="rgba(24,53,57,0.8)" />
            </BarChart>

        );
    }
}
export default CustomBarChart;