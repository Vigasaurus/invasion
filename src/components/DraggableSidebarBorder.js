import React from 'react';
import PropTypes from 'prop-types';
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

export class DraggableSidebarBorder extends React.PureComponent {
	constructor() {
		super();

		this.handleDoubleClick = this.handleDoubleClick.bind(this);
	}

	componentDidMount() {
		this.props.connectDragPreview(getEmptyImage());
	}

	handleDoubleClick() {
		const { updateSidebarWidth, isCollapsed } = this.props;

		updateSidebarWidth(isCollapsed ? '400' : '0');
	}

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
};

export default DropTarget('sidebar', spec, dropCollect)(
	DragSource('sidebar', borderSource, dragCollect)(DraggableSidebarBorder)
);
