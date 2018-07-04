import { combineReducers } from 'redux';
import userInfo from './ducks/userInfo';
import gamesList from './ducks/gamesList';

const rootReducer = combineReducers({
	gamesList,
	userInfo,
});

export default rootReducer;
