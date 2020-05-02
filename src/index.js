import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from 'loft-taxi-mui-theme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './store/sagas'
import './index.css';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(sagaMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (noop) => noop
	)
);
sagaMiddleware.run(rootSaga);
console.log('store:', store.getState());

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
