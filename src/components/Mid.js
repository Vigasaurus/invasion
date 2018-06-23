import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const collect = (connect, monitor) => ({ connectDropTarget: connect.dropTarget() });
const spec = {
	hover(props, monitor, component) {
		props.updateSidebarWidth((window.innerWidth - monitor.getClientOffset().x).toString());
	},
};

export class Mid extends React.Component {
	render() {
		const { connectDropTarget } = this.props;

		return connectDropTarget(<section className="mid-container">mid</section>);
	}
}

Mid.propTypes = {
	updateSidebarWidth: PropTypes.func,
};

export default DropTarget('sidebar', spec, collect)(Mid);
