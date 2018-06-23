import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import cn from 'classnames';
import { Icon } from 'antd';

const borderSource = {
	beginDrag: () => ({}),
	isDragging: (props, monitor) => monitor.getItem().id === props.id,
};

const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
	connectDragPreview: connect.dragPreview(),
});

export class DraggableSidebarBorder extends React.Component {
	constructor() {
		super();

		this.handleDoubleClick = this.handleDoubleClick.bind(this);
	}

	componentDidMount() {
		this.props.connectDragPreview(getEmptyImage());
	}

	handleDoubleClick() {
		const { updateSidebarWidth, isCollapsed } = this.props;

		updateSidebarWidth(isCollapsed ? 400 : 0);
	}

	render() {
		const { isDragging, isCollapsed, connectDragSource } = this.props;
		const classes = cn('sidebar-border', {
			dragging: isDragging,
			collapsed: isCollapsed,
		});

		return connectDragSource(
			<section onDoubleClick={this.handleDoubleClick} className={classes}>
				{isCollapsed && <Icon type="left" />}
			</section>
		);
	}
}

DraggableSidebarBorder.propTypes = {
	isCollapsed: PropTypes.bool,
	updateSidebarWidth: PropTypes.func,
};

export default DragSource('sidebar', borderSource, collect)(DraggableSidebarBorder);
