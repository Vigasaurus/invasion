import babelPolyfill from 'babel-polyfill'; // eslint-disable-line
import React from 'react'; // eslint-disable-line no-unused-vars
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppComponent from './components/Main';
import polyfills from '../iso/polyfills.js';
import reducer from './mainReducer';

document.addEventListener('DOMContentLoaded', () => {
	const container = document.getElementById('game-container');

	polyfills();

	if (container) {
		const store = createStore(reducer);

		render(
			<Provider store={store}>
				<AppComponent />
			</Provider>,
			container
		);
	}

	document.addEventListener('keyDown', e => {
		if (e.ctrlKey && e.keyCode === 65) {
			return false;
		}
	});
});
