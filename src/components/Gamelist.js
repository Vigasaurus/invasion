import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export class Gamelist extends React.Component {
	handleCreateGameClick = () => {
		const { socket, userInfo } = this.props;

		socket.emit('createGame', {
			gameCreator: userInfo.username,
		});
	};

	renderGamelist() {
		const { gamesList, userInfo } = this.props;

		return gamesList.list.map(game => (
			<Link to={userInfo.username ? `/game/table/${game.uid}` : `/observe/table/${game.uid}`} key={game.uid}>
				<div className="game-item">{game.name}</div>
			</Link>
		));
	}

	render() {
		const { gamesList, userInfo } = this.props;

		return (
			<section className="gamelist-container">
				{userInfo.username && (
					<Button type="primary" size="large" className="creategame-button" onClick={this.handleCreateGameClick}>
						Create a new game
					</Button>
				)}
				{gamesList.list && this.renderGamelist()}
			</section>
		);
	}
}

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
