import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Mid from './Mid';
import DraggableSidebarBorder from './DraggableSidebarBorder';
import AppHeader from './Header';

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
		const { userInfo, routeProps, socket } = this.props;

		return (
			<Layout className="app-container">
				<AppHeader userInfo={userInfo} routeProps={routeProps} />
				<Content>
					<Sidebar updateSidebarWidth={this.updateSidebarWidth} sidebarWidth={sidebarWidth} />
					<DraggableSidebarBorder isCollapsed={sidebarIsCollapsed} updateSidebarWidth={this.updateSidebarWidth} />
					<Mid socket={socket} updateSidebarWidth={this.updateSidebarWidth} userInfo={userInfo} />
				</Content>
			</Layout>
		);
	}
}

Main.propTypes = {
	userInfo: PropTypes.object,
	sidebarWidth: PropTypes.string,
	socket: PropTypes.object,
	routeProps: PropTypes.object,
};

export default Main;
