import React from 'react';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import '../scss/app.scss';
import io from 'socket.io-client';
import MainComponent from './Main';
import { updateUserInfo } from '../ducks/userInfo';
import { updateGamesList } from '../ducks/gamesList';
import { updateGameInfo } from '../ducks/gameInfo';

const socket = io({ reconnect: false });

export class Main extends React.Component {
	componentDidMount() {
		const { classList } = document.getElementById('game-container');
		const { updateUserInfo, updateGamesList, updateGameInfo, routeProps } = this.props;

		if (classList.length) {
			const username = classList[0].split('username-')[1];

			updateUserInfo({
				username,
				...window.settings,
			});
		}

		socket.on('updateUserSettings', data => {
			updateUserInfo({
				[data.type]: data.value,
			});
		});

		socket.on('gamesList', data => {
			updateGamesList(data);
		});

		socket.on('gameUpdate', (data, routeToGame) => {
			updateGameInfo(data);

			if (!Object.keys(data).length) {
				routeProps.history.replace(this.props.userInfo.username ? '/game' : '/observe');
			}

			if (routeToGame) {
				routeProps.history.push(
					this.props.userInfo.username ? `/game/table/${data.info.uid}` : `/observe/table/${data.info.uid}`
				);
			}
		});

		socket.on('addNewChat', data => {
			console.log(data, 'data');
		});

		socket.emit('getGamesList');

		// socket.on('manualDisconnection', () => {
		// 	window.location.pathname = '/observe';
		// });

		// socket.on('manualReload', () => {
		// 	window.location.reload();
		// });
	}

	render() {
		const { gameInfo, routeProps, userInfo, allCookies, gamesList } = this.props;

		return (
			<MainComponent
				routeProps={routeProps}
				socket={socket}
				userInfo={userInfo}
				sidebarWidth={allCookies.sidebarWidth}
				gamesList={gamesList}
				gameInfo={gameInfo}
			/>
		);
	}
}

const mapStateToProps = state => ({ userInfo: state.userInfo, gamesList: state.gamesList, gameInfo: state.gameInfo });

const mapDispatchToProps = dispatch => ({
	updateUserInfo(data) {
		dispatch(updateUserInfo(data));
	},
	updateGamesList(data) {
		dispatch(updateGamesList(data));
	},
	updateGameInfo(data) {
		dispatch(updateGameInfo(data));
	},
});

Main.defaultProps = {
	userInfo: {},
	gamesList: {},
	gameInfo: {},
};

Main.propTypes = {
	allCookies: PropTypes.object,
	cookies: PropTypes.instanceOf(Cookies),
	updateUserInfo: PropTypes.func,
	updateGameInfo: PropTypes.func,
	updateGamesList: PropTypes.func,
	userInfo: PropTypes.object,
	gamesList: PropTypes.object,
	routeProps: PropTypes.object,
	gameInfo: PropTypes.object,
};

export default DragDropContext(HTML5Backend)(
	withCookies(
		connect(
			mapStateToProps,
			mapDispatchToProps
		)(Main)
	)
);
