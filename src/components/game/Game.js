import React from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import Gamechat from './Gamechat';

export class Game extends React.Component {
	render() {
		console.log(this.props.gameInfo, 'gi');
		return (
			<section className="game-container">
				<section className="game-left-column-container">
					<Map />
				</section>
				<Gamechat />
			</section>
		);
	}
}

Game.propTypes = {
	gameInfo: PropTypes.object,
	userInfo: PropTypes.object,
};

export default Game;
