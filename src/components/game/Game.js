import React from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import Gamechat from './Gamechat';

class Game extends React.Component {
	componentDidMount() {
		const { gameInfo, socket, uid } = this.props;

		if (!Object.keys(gameInfo).length) {
			socket.emit('getGameInfo', uid);
		}
	}

	render() {
		const { gameInfo, userInfo, socket } = this.props;

		return (
			<section className="game-container">
				<section className="game-left-column-container">
					<Map />
				</section>
				<Gamechat gameInfo={gameInfo} socket={socket} userInfo={userInfo} />
			</section>
		);
	}
}

Game.propTypes = {
	gameInfo: PropTypes.object,
	userInfo: PropTypes.object,
	socket: PropTypes.object,
	uid: PropTypes.string,
};

export default Game;
