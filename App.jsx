import React from 'react';
import {GoogleAPI,GoogleLogin,GoogleLogout} from 'react-google-oauth'
import axios from 'axios';
import ChartHome from './public/Home/ChartHome.jsx';


const scope = 'profile https://www.googleapis.com/auth/fitness.activity.write https://www.googleapis.com/auth/fitness.body.write https://www.googleapis.com/auth/fitness.location.write https://www.googleapis.com/auth/fitness.nutrition.write';

class App extends React.Component {

    constructor(props) {
        super(props);
          
        this.state = {
           data: [],
           auth: false,
           access_token: ''
        }
              
        this.responseGooglelogin = this.responseGooglelogin.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.setAuth = this.setAuth.bind(this);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.forceUpdate = this.forceUpdate.bind(this);
    };

    componentWillMount () {
        const access_token = localStorage.getItem('@access_token');
        this.setState({access_token: access_token});
    }

    responseGooglelogin (googleUser) {
        var access_token = googleUser.getAuthResponse().access_token;
        localStorage.setItem('@access_token', access_token);
        this.setState({access_token: access_token});
        this.setState({auth: true});
        // console.log(googleUser);
	}

	responseGoogle (auth) {
        this.setState({auth: auth});
 
        
        console.log(this.state.auth);
    }
    
    setAuth () {
        this.setState({auth: false});
    }

    forceUpdateHandler(){
        // window.location="http://localhost:3000";
        this.refs.ChartHome.componentWillMount();
        this.refs.ChartHome.refresh();
    };

    render() {

        return (
            <GoogleAPI clientId="583659066312-vqjr3agafnsthkd6j9o7ribjb1hmo0ri.apps.googleusercontent.com"
						scope={scope}
						onUpdateSigninStatus={this.responseGoogle}
						onInitFailure={ arg => console.log(arg) } >
                    { this.state.auth ?
					    <div><div className='top_buttons'><button onClick={this.forceUpdateHandler}>Refresh</button><GoogleLogout backgroundColor='#13212A'/></div><ChartHome ref='ChartHome' setAuth={ this.setAuth } access_token={ this.state.access_token } /></div>
                        
					:   <div className='login'><GoogleLogin onLoginSuccess={this.responseGooglelogin} backgroundColor='#2B8E71'/></div>
                    }
			</GoogleAPI>
        );
    }
    
}
export default App;