import React from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import cn from 'classnames';
import { Icon } from 'antd';

const borderSource = {
	beginDrag: () => ({}),
	isDragging: (props, monitor) => monitor.getItem().id === props.id,
};

const dragCollect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
	connectDragPreview: connect.dragPreview(),
});

const dropCollect = (connect, monitor) => ({ connectDropTarget: connect.dropTarget() });
const spec = {
	hover(props, monitor, component) {
		props.updateSidebarWidth((window.innerWidth - monitor.getClientOffset().x).toString());
	},
	drop(props, monitor, component) {
		const newWidth = (window.innerWidth - monitor.getClientOffset().x).toString();

		props.cookies.set('sidebarWidth', newWidth, { path: '/' });
	},
};

export class DraggableSidebarBorder extends React.PureComponent {
	componentDidMount() {
		this.props.connectDragPreview(getEmptyImage());
	}

	handleDoubleClick = () => {
		const { updateSidebarWidth, isCollapsed, cookies } = this.props;
		const newWidth = isCollapsed ? '400' : '0';

		updateSidebarWidth(newWidth);
		cookies.set('sidebarWidth', newWidth, { path: '/' });
	};

	render() {
		const { isDragging, isCollapsed, connectDragSource, connectDropTarget } = this.props;
		const classes = cn('sidebar-border', {
			dragging: isDragging,
			collapsed: isCollapsed,
		});

		return connectDragSource(
			connectDropTarget(
				<section onDoubleClick={this.handleDoubleClick} className={classes}>
					{isCollapsed && <Icon type="left" />}
				</section>
			)
		);
	}
}

DraggableSidebarBorder.propTypes = {
	isCollapsed: PropTypes.bool,
	updateSidebarWidth: PropTypes.func,
	cookies: PropTypes.instanceOf(Cookies),
	connectDragPreview: PropTypes.func,
	connectDragSource: PropTypes.func,
	connectDropTarget: PropTypes.func,
	isDragging: PropTypes.bool,
};

export default withCookies(
	DropTarget('sidebar', spec, dropCollect)(DragSource('sidebar', borderSource, dragCollect)(DraggableSidebarBorder))
);
