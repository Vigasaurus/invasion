import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import io from 'socket.io-client';

const socket = io({ reconnect: false });

const select = state => state;

export class Main extends React.Component {
	componentDidMount() {
		const { dispatch } = this.props;
		const { classList } = document.getElementById('game-container');

		if (classList.length) {
			const username = classList[0].split('username-')[1];

			dispatch(updateUser(info));
		}

		socket.on('manualDisconnection', () => {
			window.location.pathname = '/observe';
		});

		socket.on('manualReload', () => {
			window.location.reload();
		});

		// socket.on('gameSettings', settings => {
		// 	const { userInfo } = this.props;

		// 	userInfo.gameSettings = settings;
		// 	dispatch(updateUser(userInfo));
		// 	this.forceUpdate(); // dunno why I need this to make it work I'm bad at this.
		// });

		// socket.on('gameUpdate', game => {
		// 	dispatch(updateGameInfo(game));
		// });

		// socket.on('userList', list => {
		// 	dispatch(updateUserList(list));
		// });

		// socket.on('generalChats', chats => {
		// 	dispatch(updateGeneralChats(chats));
		// });
	}

	makeQuickDefault() {
		// this.props.socket.emit('addNewGame', data);
	}

	// handleSeatingUser(password) {
	// 	const { gameInfo } = this.props;
	// 	const data = {
	// 		uid: gameInfo.general.uid,
	// 		password,
	// 	};

	// 	socket.emit('updateSeatedUser', data);
	// }

	// handleLeaveGame(manualLeaveGame) {
	// 	const { dispatch, userInfo, gameInfo } = this.props;

	// 	if (userInfo.isSeated) {
	// 		userInfo.isSeated = false;
	// 		dispatch(updateUser(userInfo));
	// 	}

	// 	socket.emit('leaveGame', {
	// 		userName: userInfo.userName,
	// 		uid: manualLeaveGame || gameInfo.general.uid,
	// 	});
	// }

	render() {
		return (
			<section className="app-container" style={{}}>
				hello world
				{/* <DevHelpers /> */}
			</section>
		);
	}
}

Main.propTypes = {};

export default connect(select)(Main);
