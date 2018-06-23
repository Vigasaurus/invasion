import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { Icon } from 'antd';

const collect = (connect, monitor) => ({ connectDropTarget: connect.dropTarget() });
const spec = {
	hover(props, monitor, component) {
		const newWidth = window.innerWidth - monitor.getClientOffset().x;

		if (newWidth <= 100) {
			if (!component.state.isCollapsing) {
				component.setState({
					isCollapsing: true,
				});
			}
		} else {
			// if (newWidth > 100 && component.state.isCollapsing) {
			// 	component.setState({ isCollapsing: false });
			// }
			props.updateSidebarWidth((window.innerWidth - monitor.getClientOffset().x).toString());
		}
	},
	drop(props, monitor, component) {
		const newWidth = window.innerWidth - monitor.getClientOffset().x;

		props.cookies.set('sidebarWidth', newWidth, { path: '/' });

		if (newWidth <= 100 && !component.state.isCollapsed) {
			component.setState(
				{
					isCollapsed: true,
				},
				() => {
					props.updateSidebarWidth('0');
				}
			);
		}
	},
};

export class Sidebar extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isCollapsed: Boolean(props.sidebarWidth === 0),
			isCollapsing: false,
		};
	}

	renderContent() {
		const { isCollapsing } = this.state;

		if (isCollapsing) {
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

export default DropTarget('sidebar', spec, collect)(Sidebar);
