import React from 'react';
import PropTypes from 'prop-types';

const processInventoryItem = item => {
	switch (item.type) {
		case 'greeting':
			return <div className="inventory-item-greeting">G</div>;
	}
};

const Inventory = ({ gameInfo }) => (
	<div className="inventory-container">
		{gameInfo.inventory.map((item, index) => (
			<div className="inventory-item" key={index}>
				{processInventoryItem(item)}
			</div>
		))}
	</div>
);

Inventory.defaultProps = {
	userInfo: {},
	gameInfo: {
		playerChats: [],
		gameState: {},
		inventory: [],
	},
};

Inventory.propTypes = {
	userInfo: PropTypes.object,
	gameInfo: PropTypes.object,
	socket: PropTypes.object,
};

export default Inventory;
