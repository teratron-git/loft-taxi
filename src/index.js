import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { theme } from 'loft-taxi-mui-theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';

import './index.css';

const store = createStore(rootReducer);
console.log('store:', store.getState());

console.log('store:', store.getState());
// localStorage.isLoggedIn = localStorage.isLoggedIn ? false : localStorage.isLoggedIn;

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
