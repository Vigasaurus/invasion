import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import cn from 'classnames';

const Players = ({ socket, gameInfo, userInfo }) => {
	const handleJoinGameSubmit = () => {
		socket.emit('joinGame', gameInfo.info.uid);
	};

	const handleCreatorStartGameClick = () => {
		socket.emit('startGame', gameInfo.info.uid);
	};

	const renderPlayers = () => {
		const { gameState, publicPlayersState } = gameInfo;
		const { isStarted } = gameState;

		return publicPlayersState.map((player, index) => {
			const classes = cn(
				'player-container',
				isStarted ? `started-player-${player.seatNumber}-${publicPlayersState.length}` : `unstarted-player-${index}`
			);

			return (
				<div className={classes} key={player.username}>
					<span>{player.username}</span>
					<div className="user-icon" />
				</div>
			);
		});
	};

	const renderCreatorStartGame = () => (
		<Icon type="caret-right" onClick={handleCreatorStartGameClick} className="creator-start-game-icon">
			Start game
		</Icon>
	);

	const { gameState } = gameInfo;
	const { gameCreator } = gameInfo.info;
	const { isStarted } = gameInfo.gameState;
	const playerIsInGame = Boolean(gameInfo.publicPlayersState.find(player => player.username === userInfo.username));

	return (
		<section className="players-container">
			{renderPlayers()}
			{!isStarted &&
				gameState.isWaitingToForCreatorToStart &&
				userInfo.username &&
				userInfo.username === gameCreator &&
				renderCreatorStartGame()}
			{!isStarted &&
				!playerIsInGame && (
					<Button className="join-game" type="primary" onClick={handleJoinGameSubmit} disabled={!userInfo.username}>
						Join this game
					</Button>
				)}
		</section>
	);
};

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
