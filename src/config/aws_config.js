const aws_config = {
    apiGateway: {
		REGION: 'YOUR_API_GATEWAY_REGION',
		URL: 'YOUR_API_GATEWAY_URL'
	},
	cognito: {
		REGION: 'us-east-1',
		USER_POOL_ID: 'us-east-1_9WPEPKkZ2',
		APP_CLIENT_ID: '7kiph6frt9pu9podjv0ti6591o',
		IDENTITY_POOL_ID: ''
	}
}
export default aws_config;
