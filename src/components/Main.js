import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Mid from './Mid';
import DraggableSidebarBorder from './DraggableSidebarBorder';
import AppHeader from './Header';
import DevHelpers from './DevHelpers';

export class Main extends React.Component {
	state = {
		sidebarWidth: this.props.sidebarWidth || '400',
		sidebarIsCollapsed: this.props.sidebarWidth === '0',
	};

	updateSidebarWidth = sidebarWidth => {
		this.setState({ sidebarWidth, sidebarIsCollapsed: sidebarWidth === '0' });
	};

	render() {
		const { Content } = Layout;
		const { sidebarIsCollapsed, sidebarWidth } = this.state;
		const { gameInfo, userInfo, routeProps, socket, gamesList } = this.props;

		return (
			<Layout className="app-container">
				<AppHeader userInfo={userInfo} routeProps={routeProps} />
				<DevHelpers />
				<Content>
					<Sidebar updateSidebarWidth={this.updateSidebarWidth} sidebarWidth={sidebarWidth} />
					<DraggableSidebarBorder
						isHelpDisabled={userInfo.helpDisabled}
						isCollapsed={sidebarIsCollapsed}
						updateSidebarWidth={this.updateSidebarWidth}
					/>
					<Mid
						gamesList={gamesList}
						socket={socket}
						updateSidebarWidth={this.updateSidebarWidth}
						userInfo={userInfo}
						gameInfo={gameInfo}
					/>
				</Content>
			</Layout>
		);
	}
}

Main.propTypes = {
	gamesList: PropTypes.object,
	userInfo: PropTypes.object,
	sidebarWidth: PropTypes.string,
	socket: PropTypes.object,
	routeProps: PropTypes.object,
	gameInfo: PropTypes.object,
};

export default Main;
