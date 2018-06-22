import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const collect = (connect, monitor) => ({ connectDropTarget: connect.dropTarget() });
const spec = {
	hover(props, monitor, component) {
		component.setState({
			width: monitor.getSourceClientOffset().x,
		});
	},
};

export class Sidebar extends React.Component {
	constructor() {
		super();

		this.state = {
			width: 400,
		};
	}

	render() {
		const { connectDropTarget } = this.props;

		return connectDropTarget(
			<section style={{ background: '#222', width: `${this.state.width}px`, color: 'white' }}>sidebar</section>
		);
	}
}

Sidebar.propTypes = {};

export default DropTarget('sidebar', spec, collect)(Sidebar);
