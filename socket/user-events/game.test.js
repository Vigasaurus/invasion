import React from 'react'; // eslint-disable-line
import exp, {
	handleAddNewGame,
	handleAddNewGamechat,
	handlePlayerJoinGame,
	handlePlayerLeaveGame,
	handleSocketDisconnect,
} from './game';
import { games } from '../models';

describe('Game file', () => {
	it('should have 5 exports', () => {
		expect(Object.keys(exp).length).toBe(5);
	});

	it('should export a handleAddNewGame function', () => {
		expect(typeof handleAddNewGame).toBe('function');
	});

	// fails due to missing io global
	// it('handleAddNewGame should add a game key to the games gameList model', () => {
	// 	handleAddNewGame({}, 'mockUsername');

	// 	expect(Object.keys(games.gameList).length).toBe(1);
	// });
});
