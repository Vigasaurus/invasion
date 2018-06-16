import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import io from 'socket.io-client';

const socket = io({ reconnect: false });

const select = state => state;

export class Main extends React.Component {
	constructor() {
		super();

		this.state = {
			collapsed: false,
		};

		this.handleSidebarVisibilityUpdate = this.handleSidebarVisibilityUpdate.bind(this);
	}
	// state = {
	//   collapsed: false,
	// }

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

	handleSidebarVisibilityUpdate(collapsed) {
		this.setState({
			collapsed,
		});
	}

	render() {
		const { Header, Content, Footer, Sider } = Layout;

		return (
			<Layout style={{ minHeight: '100vh' }} className="app-container">
				<Sider
					collapsible
					collapsed={this.state.collapsed}
					onCollapse={this.handleSidebarVisibilityUpdate}
					collapsedWidth={18}
					width={340}
				>
					<div className="logo" />
					sidebar here
				</Sider>
				<Layout>
					<Header style={{ background: '#fff', padding: 0 }}>header here</Header>
					<Content style={{ margin: '0 16px' }}>content here</Content>
					<Footer style={{ textAlign: 'center' }}>footer here</Footer>
				</Layout>
			</Layout>
		);
	}
}

Main.propTypes = {};

export default connect(select)(Main);
