import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Icon } from 'antd';

const TabPane = Tabs.TabPane;

export class Inventory extends React.Component {
	state = {};

	render() {
		console.log(this.props.gameInfo);
		return <div className="inventory-container">inventory here</div>;
	}
}

Inventory.defaultProps = {
	userInfo: {},
	gameInfo: {
		playerChats: [],
		gameState: {},
	},
};

Inventory.propTypes = {
	userInfo: PropTypes.object,
	gameInfo: PropTypes.object,
	socket: PropTypes.object,
};

export default Inventory;
