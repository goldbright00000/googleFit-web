import React from 'react';
import {GoogleAPI,GoogleLogin,GoogleLogout} from 'react-google-oauth'
import axios from 'axios';


const scope = 'profile https://www.googleapis.com/auth/fitness.activity.write https://www.googleapis.com/auth/fitness.body.write https://www.googleapis.com/auth/fitness.location.write https://www.googleapis.com/auth/fitness.nutrition.write';

class App extends React.Component {

    constructor() {
        super();
          
        this.state = {
           data: [],
           test: ''
        }
      
        this.responseGooglelogin = this.responseGooglelogin.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.getFitnessData = this.getFitnessData.bind(this);
        this.callback = this.callback.bind(this);
    };

    getFitnessData(accessToken){

		var endTimeMillis = new Date().getTime();
		var startTimeMillis = endTimeMillis - 604800000;
		var dataTypeName = 'com.google.step_count.delta';
		
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
		.catch(function (error) {
			console.log(error);
		});
    }
    
    callback (response) {
        this.setState({data: response.data.bucket});
        // this.setState({test: response.data.bucket[3].dataset[0].point[0].value[0].intVal});
        console.log(this.state.data);
        localStorage.setItem('@myData', JSON.stringify(this.state.data));
    }

    responseGooglelogin (googleUser) {
		//anything else you want to do(save to localStorage)...
        this.setState({data: 'Data updated from the child component...'});
		this.getFitnessData(googleUser.getAuthResponse().access_token);
	}

	responseGoogle (googleUser) {
        console.log(googleUser);
        var data = localStorage.getItem('@myData');
        var temp = JSON.parse(data);
        console.log(temp);
	}

    render() {
        return (
        <div>
            <GoogleAPI clientId="583659066312-vqjr3agafnsthkd6j9o7ribjb1hmo0ri.apps.googleusercontent.com"
						scope={scope}
						onUpdateSigninStatus={this.responseGoogle}
						onInitFailure={ arg => console.log(arg) } >
						<div>
					<div><GoogleLogin onLoginSuccess={this.responseGooglelogin} /></div>
					<div><GoogleLogout onLogoutSuccess={ arg => console.log(arg) }/></div>
				</div>
			</GoogleAPI>
            <h1>{this.state.test}</h1>
        </div>
        );
    }
}
export default App;