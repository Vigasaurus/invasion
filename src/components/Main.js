import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Mid from './Mid';
import DraggableSidebarBorder from './DraggableSidebarBorder';
import AppHeader from './Header';
import DevHelpers from './DevHelpers';

const Main = props => {
	const [sidebarWidth, updateSidebarWidth] = useState(props.sidebarWidth || '400');
	const [sidebarIsCollapsed, updateSidebarIsCollapsed] = useState(props.sidebarIsCollapsed === '0');

	const handleUpdateSidebarWidth = sidebarWidth => {
		updateSidebarIsCollapsed(sidebarWidth === '0');
	};

	const { Content } = Layout;
	const { gameInfo, userInfo, routeProps, socket, gamesList } = props;

	return (
		<Layout className="app-container">
			<AppHeader userInfo={userInfo} routeProps={routeProps} />
			<DevHelpers />
			<Content>
				<Sidebar updateSidebarWidth={handleUpdateSidebarWidth} sidebarWidth={sidebarWidth} />
				<DraggableSidebarBorder
					isHelpDisabled={userInfo.helpDisabled}
					isCollapsed={sidebarIsCollapsed}
					updateSidebarWidth={handleUpdateSidebarWidth}
				/>
				<Mid
					gamesList={gamesList}
					socket={socket}
					updateSidebarWidth={handleUpdateSidebarWidth}
					userInfo={userInfo}
					gameInfo={gameInfo}
				/>
			</Content>
		</Layout>
	);
};

Main.defaultProps = {
	userInfo: {},
};

Main.propTypes = {
	gamesList: PropTypes.object,
	userInfo: PropTypes.object,
	sidebarWidth: PropTypes.string,
	socket: PropTypes.object,
	routeProps: PropTypes.object,
	gameInfo: PropTypes.object,
	sidebarIsCollapsed: PropTypes.string,
};

export default Main;
