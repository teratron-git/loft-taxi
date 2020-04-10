import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from 'loft-taxi-mui-theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from './components/AuthContext';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
