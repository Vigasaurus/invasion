import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const borderSource = {
	beginDrag: props => ({ color: props.color }),
	isDragging: (props, monitor) => monitor.getItem().id === props.id,
};

const collect = (connect, monitor) => ({ connectDragSource: connect.dragSource(), isDragging: monitor.isDragging() });

export class DraggableSidebarBorder extends React.Component {
	render() {
		const { isDragging, connectDragSource, color } = this.props;

		return connectDragSource(<section style={{ background: isDragging ? color : 'green', width: '15px' }} />);
	}
}

DraggableSidebarBorder.propTypes = {};

export default DragSource('sidebar', borderSource, collect)(DraggableSidebarBorder);
