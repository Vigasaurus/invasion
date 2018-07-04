export const UPDATE_GAMESLIST = 'UPDATE_GAMESLIST';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case UPDATE_GAMESLIST: {
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

export function updateGamesList(data) {
	return {
		type: UPDATE_GAMESLIST,
		payload: data,
	};
}
