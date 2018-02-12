import React from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 80}];
const COLORS = ['#27CA7B', '#C5F0DC'];

class CustomPieChart extends React.Component {

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

            <PieChart width={200} height={135}>
                <Pie
                data={data}
                dataKey="value"
                cx={120} 
                cy={62}         
                outerRadius={58} 
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
export default CustomPieChart;