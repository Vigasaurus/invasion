import 'babel-polyfill';
import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import AppComponent from './components/Main.container';
import polyfills from '../iso/polyfills.js';
import reducer from './mainReducer';

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('game-container');

	polyfills();

	if (container) {
		const store = createStore(reducer);

		render(
			<ReduxProvider store={store}>
				<CookiesProvider>
					<AppComponent />
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
