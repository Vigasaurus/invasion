import React from 'react'; // eslint-disable-line
import exp, { games, userList, generalChats, siteSettings } from './models';

describe('Models file', () => {
	it('should have 4 exports', () => {
		expect(Object.keys(exp).length).toBe(4);
	});

	it('should export a games object', () => {
		expect(typeof games).toBe('object');
	});

	it('games should have an emitDebounceTime property that is a date object', () => {
		expect(games.emitDebounceTime instanceof Date).toBe(true);
	});

	it('games should have an gameList property that is an empty object', () => {
		expect(games.gameList).toEqual({});
	});

	it('should export a userList object', () => {
		expect(typeof userList).toBe('object');
	});

	it('userList should be an empty object', () => {
		expect(userList).toEqual({});
	});

	it('should export a generalChats object', () => {
		expect(typeof generalChats).toBe('object');
	});

	it('generalChats should have an sticky property that is an empty string', () => {
		expect(generalChats.sticky).toBe('');
	});

	it('generalChats should have an list property that is an empty array', () => {
		expect(Array.isArray(generalChats.list)).toBe(true);
	});

	it('should export a siteSettings object', () => {
		expect(typeof siteSettings).toBe('object');
	});

	it('siteSettings should have an accountCreationDisabled property that is a false bool', () => {
		expect(siteSettings.accountCreationDisabled).toBe(false);
	});

	it('siteSettings should have an ipbansDisabled property that is a false bool', () => {
		expect(siteSettings.ipbansDisabled).toBe(false);
	});

	it('siteSettings should have a gameCreationDisabled property that is a false bool', () => {
		expect(siteSettings.gameCreationDisabled).toBe(false);
	});
});
