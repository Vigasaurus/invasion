import React from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import Gamechat from './Gamechat';
import Meters from './Meters';
import Players from './Players';

const Game = ({ gameInfo, socket, userInfo, uid }) => {
	const hasGameInfo = Object.keys(gameInfo).length;

	if (!hasGameInfo) {
		socket.emit('getGameInfo', uid, true);
	}

	return Object.keys(gameInfo).length ? (
		<section className="game-container">
			<section className="game-left-column-container">
				<div className="status">{gameInfo.info.status}</div>
				<Map gameInfo={gameInfo} />
				<Meters />
				<Players gameInfo={gameInfo} userInfo={userInfo} socket={socket} />
			</section>
			<Gamechat gameInfo={gameInfo} socket={socket} userInfo={userInfo} />
		</section>
	) : null;
};

Game.defaultProps = {
	gameInfo: {},
	socket: {
		emit: () => {},
	},
};

Game.propTypes = {
	gameInfo: PropTypes.object,
	userInfo: PropTypes.object,
	socket: PropTypes.object,
	uid: PropTypes.string,
};

export default Game;
