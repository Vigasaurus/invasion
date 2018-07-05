export const UPDATE_GAMEINFO = 'UPDATE_GAMEINFO';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case UPDATE_GAMEINFO: {
			const newState = {
				...state,
				...action.payload,
			};
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
