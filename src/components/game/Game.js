import React from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import Gamechat from './Gamechat';

const Game = ({ gameInfo, userInfo, socket }) => (
	<section className="game-container">
		<section className="game-left-column-container">
			<Map />
		</section>
		<Gamechat gameInfo={gameInfo} socket={socket} userInfo={userInfo} />
	</section>
);

Game.propTypes = {
	gameInfo: PropTypes.object,
	userInfo: PropTypes.object,
	socket: PropTypes.object,
};

export default Game;
