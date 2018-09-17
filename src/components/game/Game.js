import React from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import Gamechat from './Gamechat';
import Meters from './Meters';
import Players from './Players';

class Game extends React.Component {
	componentDidMount() {
		const { gameInfo, socket, uid } = this.props;

		if (!Object.keys(gameInfo).length) {
			socket.emit('getGameInfo', uid);
		}
	}

	render() {
		const { gameInfo, userInfo, socket } = this.props;

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
	}
}

Game.propTypes = {
	gameInfo: PropTypes.object,
	userInfo: PropTypes.object,
	socket: PropTypes.object,
	uid: PropTypes.string,
};

export default Game;
