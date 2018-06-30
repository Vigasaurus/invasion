import { combineReducers } from 'redux';
import userInfo from './ducks/userInfo';

const rootReducer = combineReducers({
	userInfo,
});

export default rootReducer;
