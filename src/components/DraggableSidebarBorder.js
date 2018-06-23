import React from 'react';
// import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const borderSource = {
	beginDrag: props => ({}),
	isDragging: (props, monitor) => monitor.getItem().id === props.id,
};

const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
	connectDragPreview: connect.dragPreview(),
});

export class DraggableSidebarBorder extends React.Component {
	componentDidMount() {
		this.props.connectDragPreview(getEmptyImage());
	}

	render() {
		const { isDragging, connectDragSource } = this.props;

		return connectDragSource(<section className={isDragging ? 'sidebar-border dragging' : 'sidebar-border'} />);
	}
}

DraggableSidebarBorder.propTypes = {};

export default DragSource('sidebar', borderSource, collect)(DraggableSidebarBorder);
