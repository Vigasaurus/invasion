export const UPDATE_USERINFO = 'UPDATE_USERINFO';

export default (state = {}, action) => {
	console.log(action, 'a');
	switch (action.type) {
		case UPDATE_USERINFO: {
			const newState = {
				...state,
				userInfo: {
					...action.payload,
				},
			};
			return newState;
		}
		default:
			return state;
	}
};

export function updateUserInfo(data) {
	console.log(data, 'a data');
	return {
		type: UPDATE_USERINFO,
		payload: data,
	};
}
