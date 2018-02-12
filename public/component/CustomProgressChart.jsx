import React from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';

const data = [{name: 'Group A', value: 100}, {name: 'Group B', value: 80}];
const COLORS = ['#A8A761', '#359971'];

class CustomProgressChart extends React.Component {

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

            <PieChart width={170} height={170}>
                <Pie
                data={data}
                dataKey="value"
                cx={85} 
                cy={85}         
                outerRadius={80} 
                innerRadius={77.5} 
                strokeWidth={0}
                fill="#8884d8"
                startAngle={90}
                endAngle={-270}
                >
                    {
                    data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                }
                </Pie>
                <Tooltip />
            </PieChart>

        );
    }
}
export default CustomProgressChart;