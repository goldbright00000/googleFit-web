import React from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';

const data = [{name: 'Group A', value: 100}, {name: 'Group B', value: 80}];
const COLORS = ['#A8A761', '#359971'];

class CustomProgressSmallChart extends React.Component {

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

            <PieChart width={84} height={84}>
                <Pie
                data={data}
                dataKey="value"
                cx={40} 
                cy={40}
                outerRadius={38} 
                innerRadius={35.5} 
                strokeWidth={0}
                fill="#8884d8"
                startAngle={90}
                endAngle={-270}
                >
                    {
                    data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                }
                </Pie>
                <Tooltip />
            </PieChart>

        );
    }
}
export default CustomProgressSmallChart;