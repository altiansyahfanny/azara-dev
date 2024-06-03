import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<GoogleOAuthProvider clientId="1041477489691-8qvi9sj59kuloe7d9k82j82qqcblhir0.apps.googleusercontent.com">
				<Router />
				<Toaster
					toastOptions={{
						style: {
							fontFamily: 'sans-serif',
						},
					}}
				/>
			</GoogleOAuthProvider>
		</BrowserRouter>
	);
};

export default App;
