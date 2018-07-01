export const UPDATE_USERINFO = 'UPDATE_USERINFO';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case UPDATE_USERINFO: {
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

export function updateUserInfo(data) {
	return {
		type: UPDATE_USERINFO,
		payload: data,
	};
}
