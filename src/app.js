import babelPolyfill from 'babel-polyfill'; // eslint-disable-line
import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import AppComponent from './components/Main';
import polyfills from '../iso/polyfills.js';
import reducer from './mainReducer';

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('game-container');

	polyfills();

	if (container) {
		const store = createStore(reducer);

		render(
			<CookiesProvider>
				<ReduxProvider store={store}>
					<AppComponent />
				</ReduxProvider>
			</CookiesProvider>,
			container
		);
	}

	document.addEventListener('keyDown', e => {
		if (e.ctrlKey && e.keyCode === 65) {
			return false;
		}
	});
});
