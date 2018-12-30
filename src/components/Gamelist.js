import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Gamelist = ({ socket, userInfo, gamesList }) => {
	const handleCreateGameClick = () => {
		socket.emit('createGame', {
			gameCreator: userInfo.username,
		});
	};

	const renderGamelist = () =>
		gamesList.list.map(game => (
			<Link to={userInfo.username ? `/game/table/${game.uid}` : `/observe/table/${game.uid}`} key={game.uid}>
				<div className="game-item">{game.name}</div>
			</Link>
		));

	return (
		<section className="gamelist-container">
			{userInfo.username && (
				<Button type="primary" size="large" className="creategame-button" onClick={handleCreateGameClick}>
					Create a new game
				</Button>
			)}
			{gamesList.list && renderGamelist()}
		</section>
	);
};

Gamelist.defaultProps = {
	userInfo: {},
	gamesList: {},
};

Gamelist.propTypes = {
	userInfo: PropTypes.object,
	gamesList: PropTypes.object,
	socket: PropTypes.object,
};

export default Gamelist;
