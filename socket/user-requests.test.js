import React from 'react'; // eslint-disable-line
import exp, { sendUserList, sendGameInfo, sendGameList, sendGeneralChats } from './user-requests';

describe('User requests file', () => {
	it('should have 4 exports', () => {
		expect(Object.keys(exp).length).toBe(4);
	});

	it('should export a sendUserList function', () => {
		expect(typeof sendUserList).toBe('function');
	});

	it('sendUserList should call an emit function on its provided socket argument', () => {
		const spy = jest.fn();
		sendUserList({ emit: spy });

		expect(spy.mock.calls).toHaveLength(1);
	});

	it('should export a sendGameInfo function', () => {
		expect(typeof sendGameInfo).toBe('function');
	});

	it('should export a sendGameList function', () => {
		expect(typeof sendGameList).toBe('function');
	});

	it('sendGameList should call an emit function on its provided socket argument', () => {
		const spy = jest.fn();
		sendGameList({ emit: spy });

		expect(spy.mock.calls).toHaveLength(1);
	});

	it('should export a sendGeneralChats function', () => {
		expect(typeof sendGeneralChats).toBe('function');
	});

	it('sendGeneralChats should call an emit function on its provided socket argument', () => {
		const spy = jest.fn();
		sendGeneralChats({ emit: spy });

		expect(spy.mock.calls).toHaveLength(1);
	});
});
