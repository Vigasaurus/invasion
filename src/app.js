import 'babel-polyfill';
import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { createStore } from 'redux';
import AppComponent from './components/Main.container';
import polyfills from '../iso/polyfills.js';
import reducer from './mainReducer';

import { Provider as ReduxProvider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('game-container');

	polyfills();

	if (container) {
		const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
		const history = createBrowserHistory();

		render(
			<ReduxProvider store={store}>
				<CookiesProvider>
					<Router history={history}>
						<Switch>
							<Route path="/" render={routeProps => <AppComponent routeProps={routeProps} />} />
						</Switch>
					</Router>
				</CookiesProvider>
			</ReduxProvider>,
			container
		);
	}

	document.addEventListener('keyDown', e => {
		if (e.ctrlKey && e.keyCode === 65) {
			return false;
		}
	});
});
