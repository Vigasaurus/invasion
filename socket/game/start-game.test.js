import React from 'react'; // eslint-disable-line
import exp, { handlePlayerStartGame } from './start-game';

describe('Start game file', () => {
	it('should have 1 export', () => {
		expect(Object.keys(exp).length).toBe(1);
	});

	it('should export a handlePlayerStartGame function', () => {
		expect(typeof handlePlayerStartGame).toBe('function');
	});
});
