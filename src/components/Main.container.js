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

const socket = io({ reconnect: false });

export class Main extends React.Component {
	componentDidMount() {
		const { classList } = document.getElementById('game-container');
		const { updateUserInfo } = this.props;

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

		// socket.on('manualDisconnection', () => {
		// 	window.location.pathname = '/observe';
		// });

		// socket.on('manualReload', () => {
		// 	window.location.reload();
		// });
	}

	render() {
		return (
			<MainComponent
				routeProps={this.props.routeProps}
				socket={socket}
				userInfo={this.props.userInfo}
				sidebarWidth={this.props.allCookies.sidebarWidth}
			/>
		);
	}
}

const mapStateToProps = state => ({ userInfo: state.userInfo });

const mapDispatchToProps = dispatch => ({
	updateUserInfo(data) {
		dispatch(updateUserInfo(data));
	},
});

Main.defaultProps = {
	userInfo: {},
};

Main.propTypes = {
	allCookies: PropTypes.object,
	cookies: PropTypes.instanceOf(Cookies),
	updateUserInfo: PropTypes.func,
	userInfo: PropTypes.object,
	routeProps: PropTypes.object,
};

export default DragDropContext(HTML5Backend)(
	withCookies(
		connect(
			mapStateToProps,
			mapDispatchToProps
		)(Main)
	)
);
