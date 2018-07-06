import React from 'react';
// import PropTypes from 'prop-types';
import Map from './Map';
import Gamechat from './Gamechat';

export class Game extends React.Component {
	render() {
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

Game.propTypes = {};

export default Game;
