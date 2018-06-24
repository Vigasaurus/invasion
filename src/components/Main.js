import React from 'react';
import { connect } from 'react-redux';
import { withCookies, cookie } from 'react-cookie';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import '../scss/app.scss';
import { Layout } from 'antd';
import io from 'socket.io-client';

import Sidebar from './Sidebar';
import Mid from './Mid';
import DraggableSidebarBorder from './DraggableSidebarBorder';
import AppHeader from './Header';

const socket = io({ reconnect: false });

const select = state => state;

export class Main extends React.Component {
	state = {
		sidebarWidth: this.props.allCookies.sidebarWidth || '400',
		sidebarIsCollapsed: this.props.allCookies.sidebarWidth === '0',
	};

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
	updateSidebarWidth = sidebarWidth => {
		this.setState({ sidebarWidth });
	};

	render() {
		const { Content } = Layout;
		const { cookies } = this.props;
		const { sidebarIsCollapsed, sidebarWidth } = this.state;

		return (
			<Layout className="app-container">
				<AppHeader />
				<Content>
					<Sidebar updateSidebarWidth={this.updateSidebarWidth} sidebarWidth={sidebarWidth} cookies={cookies} />
					<DraggableSidebarBorder isCollapsed={sidebarIsCollapsed} updateSidebarWidth={this.updateSidebarWidth} />
					<Mid updateSidebarWidth={this.updateSidebarWidth} />
				</Content>
				{/* <Footer style={{ textAlign: 'center' }}>footer here</Footer> */}
			</Layout>
		);
	}
}

Main.propTypes = {};

export default DragDropContext(HTML5Backend)(withCookies(connect(select)(Main)));
