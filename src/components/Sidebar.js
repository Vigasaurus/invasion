import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { Icon } from 'antd';

const collect = (connect, monitor) => ({ connectDropTarget: connect.dropTarget() });
const spec = {
	hover(props, monitor, component) {
		const newWidth = window.innerWidth - monitor.getClientOffset().x;

		if (newWidth <= 100 && !component.state.isCollapsed && !component.state.isExpanding) {
			if (!component.state.isCollapsing) {
				component.setState({
					isCollapsing: true,
				});
			}
		} else {
			props.updateSidebarWidth(window.innerWidth - monitor.getClientOffset().x);
		}
	},
	drop(props, monitor, component) {
		const newWidth = window.innerWidth - monitor.getClientOffset().x;

		if (newWidth <= 100 && !component.state.isCollapsed) {
			props.updateSidebarWidth(0);
		}
	},
};

export class Sidebar extends React.Component {
	constructor() {
		super();

		this.state = {
			isCollapsed: false,
			isCollapsing: false,
			isExpanding: false,
		};
	}

	renderContent() {
		const { isCollapsed, isCollapsing, isExpanding } = this.state;

		if (isCollapsing || isExpanding) {
			return (
				<div className="expand-collapse-sidebar">
					<Icon type={isExpanding ? 'verticle-right' : 'verticle-left'} />
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
	sidebarWidth: PropTypes.number,
	updateSidebarWidth: PropTypes.func,
};

export default DropTarget('sidebar', spec, collect)(Sidebar);
