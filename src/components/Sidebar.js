import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const collect = (connect, monitor) => ({ connectDropTarget: connect.dropTarget() });
const spec = {
	hover(props, monitor, component) {
		props.updateSidebarWidth(window.innerWidth - monitor.getClientOffset().x);
	},
};

export class Sidebar extends React.Component {
	render() {
		const { connectDropTarget, sidebarWidth } = this.props;

		return connectDropTarget(
			<section style={{ background: '#222', width: `${sidebarWidth}px`, color: 'white' }}>sidebar</section>
		);
	}
}

Sidebar.propTypes = {
	sidebarWidth: PropTypes.number,
	updateSidebarWidth: PropTypes.func,
};

export default DropTarget('sidebar', spec, collect)(Sidebar);
