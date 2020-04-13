import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from 'loft-taxi-mui-theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from './components/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
			<AuthProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthProvider>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
