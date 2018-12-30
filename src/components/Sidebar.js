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

const Sidebar = ({ sidebarWidth, connectDropTarget }) => {
	const renderContent = () => {
		if (sidebarWidth && sidebarWidth <= 100 && sidebarWidth > 0) {
			return (
				<div className="expand-collapse-sidebar">
					<Icon type="verticle-left" />
				</div>
			);
		}
	};

	return connectDropTarget(
		<section className="sidebar-container" style={{ width: `${sidebarWidth}px` }}>
			{renderContent()}
		</section>
	);
};

Sidebar.propTypes = {
	sidebarWidth: PropTypes.string,
	updateSidebarWidth: PropTypes.func,
	cookies: PropTypes.object,
	connectDropTarget: PropTypes.func,
};

export default withCookies(DropTarget('sidebar', spec, collect)(Sidebar));
