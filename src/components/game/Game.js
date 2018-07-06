import React from 'react';
// import PropTypes from 'prop-types';
import Map from './map';

export class Game extends React.Component {
	render() {
		return (
			<section className="game-container">
				<Map />
			</section>
		);
	}
}

Game.propTypes = {};

export default Game;
