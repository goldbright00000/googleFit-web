import React from 'react';
import CustomAreaChart from '../component/CustomAreaChart.jsx';

class ChartHome extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            access_token: ''
        };
        
        this.setAuth = this.setAuth.bind(this);
    }

    setAuth () {
        this.props.setAuth();
    }

    componentWillMount () {
        this.setState({access_token: this.props.access_token});
    }

    render() {
        return (
            <div className='container'>
                <nav className="navbar">
                    <ul className="nav navbar-nav">
                        <li className='active'><a href="#">Overview</a></li>
                        <li><a href="#">Exercise</a></li>
                        <li><a href="#">Nutrition</a></li>
                        <li><a href="#">Rest</a></li>
                        <li><a href="#">Health</a></li>
                    </ul>
                </nav>
                <div className='section' style={{marginTop: 7}}>
                    <div className='top_section'>
                        <div className='row_section blue_line'>
                            <div className='part_section'>
                                <span className='large_number'>TODAY</span>
                                <span className='medium_number'>Physical Activity</span>
                                <span style={{color: 'white', fontSize: 36}}>85<span className='medium_number'>/</span><span className='small_number'>number of steps yesterday</span> </span>
                            </div>
                            <div className='part_section'>
                                <span className='medium_number' style={{marginTop: 6, marginLeft: 30}}>Weight</span>
                                <CustomAreaChart setAuth={this.setAuth} access_token={this.state.access_token}/>
                            </div>
                        </div>
                        <div className='row_section'>
                            <div className='part_section'>
                                <span className='medium_number'>Last 7 Days</span>
                            </div>
                            <div className='part_section'></div>
                        </div>
                    </div>
                    <div className='top_section'></div>
                </div>
                <div className='section'>
                    <div className='bottom_section'></div>
                    <div className='bottom_section'></div>
                    <div className='bottom_section'></div>
                </div>
            </div>
        );
    }
}
export default ChartHome;