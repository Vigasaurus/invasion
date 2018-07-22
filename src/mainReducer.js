import { combineReducers } from 'redux';
import userInfo from './ducks/userInfo';
import gamesList from './ducks/gamesList';
import gameInfo from './ducks/gameInfo';

const rootReducer = combineReducers({
	gamesList,
	userInfo,
	gameInfo,
});

export default rootReducer;
