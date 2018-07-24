export const UPDATE_GAMEINFO = 'UPDATE_GAMEINFO';
export const APPEND_NEW_GAMECHAT = 'APPEND_NEW_GAMECHAT';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case UPDATE_GAMEINFO: {
			const newState = {
				...action.payload,
			};
			return newState;
		}
		case APPEND_NEW_GAMECHAT: {
			const newState = {
				...state,
			};
			newState.playerChats.push(action.payload);
			return newState;
		}
		default:
			return state;
	}
}

export function updateGameInfo(data) {
	return {
		type: UPDATE_GAMEINFO,
		payload: data,
	};
}

export function appendNewGamechat(data) {
	return {
		type: APPEND_NEW_GAMECHAT,
		payload: data,
	};
}
