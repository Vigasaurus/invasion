import React from 'react';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import { DropTarget } from 'react-dnd';
import { Icon } from 'antd';

const collect = (connect, monitor) => ({ connectDropTarget: connect.dropTarget() });
const spec = {
	hover(props, monitor, component) {
		const newWidth = window.innerWidth - monitor.getClientOffset().x;

		props.updateSidebarWidth(newWidth >= 100 ? newWidth.toString() : '100');
	},
	drop(props, monitor, component) {
		const newWidth = window.innerWidth - monitor.getClientOffset().x;

		props.updateSidebarWidth(newWidth <= 100 ? '0' : newWidth.toString());
		props.cookies.set('sidebarWidth', newWidth <= 100 ? 0 : newWidth, { path: '/' });
	},
};

export class Sidebar extends React.Component {
	renderContent() {
		const { sidebarWidth } = this.props;

		if (sidebarWidth && sidebarWidth <= 100) {
			return (
				<div className="expand-collapse-sidebar">
					<Icon type="verticle-left" />
				</div>
			);
		}
	}

	render() {
		const { connectDropTarget, sidebarWidth } = this.props;

		return connectDropTarget(
			<section className="sidebar-container" style={{ width: `${sidebarWidth}px` }}>
				{this.renderContent()}
			</section>
		);
	}
}

Sidebar.propTypes = {
	sidebarWidth: PropTypes.string,
	updateSidebarWidth: PropTypes.func,
	cookies: PropTypes.object,
};

export default withCookies(DropTarget('sidebar', spec, collect)(Sidebar));
