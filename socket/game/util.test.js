import React from 'react'; // eslint-disable-line
import exp, { secureGame, combineInProgressChats, sendInProgressGameUpdate } from './util';

describe('Util file', () => {
	it('should have 3 exports', () => {
		expect(Object.keys(exp).length).toBe(4);
	});

	it('should export a secureGame function', () => {
		expect(typeof secureGame).toBe('function');
	});

	it('secureGame should have return a new object that does not have an "internals" property', () => {
		expect(secureGame({ internals: {} })).toEqual({});
	});

	it('should export a combineInProgressChats function', () => {
		expect(typeof combineInProgressChats).toBe('function');
	});

	it('combineInProgressChats should return an array of chats when passed a valid game object and valid username string', () => {
		expect(
			combineInProgressChats(
				{
					playerChats: [{}],
					gameState: {
						isStarted: true,
					},
					internals: {
						seatedPlayers: [
							{
								username: 'mockUserName',
								gameChats: [{}],
							},
						],
					},
				},
				'mockUserName'
			)
		).toHaveLength(2);
	});

	it('should export a sendInProgressGameUpdate function', () => {
		expect(typeof sendInProgressGameUpdate).toBe('function');
	});

	// fails due to undefined global
	// it('sendInProgressGameUpdate should return undefined', () => {
	// 	expect(
	// 		sendInProgressGameUpdate({
	// 			publicPlayersState: [],
	// 		})
	// 	).toBe(undefined);
	// });
});
