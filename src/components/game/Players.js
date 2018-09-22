import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import cn from 'classnames';

class Players extends React.Component {
	handleJoinGameSubmit = () => {
		const { socket, gameInfo } = this.props;

		socket.emit('joinGame', gameInfo.info.uid);
	};

	handleCreatorStartGameClick = () => {
		this.props.socket.emit('startGame', this.props.gameInfo.info.uid);
	};

	renderPlayers() {
		return this.props.gameInfo.publicPlayersState.map((player, index) => {
			const classes = cn('player-container', `unstarted-player-${index}`);

			return (
				<div className={classes} key={player.username}>
					<span>{player.username}</span>
					<div className="user-icon" />
				</div>
			);
		});
	}

	renderCreatorStartGame() {
		return (
			<Icon type="caret-right" onClick={this.handleCreatorStartGameClick} className="creator-start-game-icon">
				Start game
			</Icon>
		);
	}

	render() {
		const { gameInfo, userInfo } = this.props;
		const { gameState } = gameInfo;
		const { gameCreator } = gameInfo.info;
		const { isStarted } = gameInfo.gameState;
		const playerIsInGame = Boolean(gameInfo.publicPlayersState.find(player => player.username === userInfo.username));

		return (
			<section className="players-container">
				{this.renderPlayers()}
				{!isStarted &&
					gameState.isWaitingToForCreatorToStart &&
					userInfo.username &&
					userInfo.username === gameCreator &&
					this.renderCreatorStartGame()}
				{!isStarted &&
					!playerIsInGame && (
						<Button
							className="join-game"
							type="primary"
							onClick={this.handleJoinGameSubmit}
							disabled={!userInfo.username}
						>
							Join this game
						</Button>
					)}
			</section>
		);
	}
}

Players.defaultProps = {
	gameInfo: {
		gameState: {},
		info: {},
		publicPlayersState: [],
	},
	userInfo: {},
};

Players.propTypes = {
	socket: PropTypes.object,
	gameInfo: PropTypes.object,
	userInfo: PropTypes.object,
};

export default Players;
