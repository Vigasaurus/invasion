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

		return (
			<Layout className="app-container">
				<AppHeader userInfo={this.props.userInfo} />
				<Content>
					<Sidebar updateSidebarWidth={this.updateSidebarWidth} sidebarWidth={sidebarWidth} />
					<DraggableSidebarBorder isCollapsed={sidebarIsCollapsed} updateSidebarWidth={this.updateSidebarWidth} />
					<Mid updateSidebarWidth={this.updateSidebarWidth} />
				</Content>
				{/* <Footer style={{ textAlign: 'center' }}>footer here</Footer> */}
			</Layout>
		);
	}
}

Main.propTypes = {
	userInfo: PropTypes.object,
	sidebarWidth: PropTypes.string,
};

export default Main;
