import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, loadStateFromStorage } from './config/store/configureStore';
import aws_config from 'config/aws_config';
import Amplify from 'aws-amplify';

// import { addLocaleData } from "react-intl";
// import locale_en from 'react-intl/locale-data/en';
// import locale_de from 'react-intl/locale-data/de';
// addLocaleData([...locale_en, ...locale_de]);
// import messages_de from "./translations/de.json";
// import messages_en from "./translations/en.json";

// const messages = {
// 	'de': messages_de,
// 	'en': messages_en
// };
// const language = navigator.language.split(/[-_]/)[0]; 

Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: aws_config.cognito.REGION,
		userPoolId: aws_config.cognito.USER_POOL_ID,
		identityPoolId: aws_config.cognito.IDENTITY_POOL_ID,
		userPoolWebClientId: aws_config.cognito.APP_CLIENT_ID
	},
	API: {
		endpoints: [
			{
				name: 'testApiCall',
				endpoint: aws_config.apiGateway.URL,
				region: aws_config.apiGateway.REGION
			}
		]
	}
});


loadStateFromStorage(store).then(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
