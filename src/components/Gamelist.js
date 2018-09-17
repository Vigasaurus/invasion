import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export class Gamelist extends React.Component {
	// render() {
	// 	return (
	// 		<section className="gamelist-container">
	// 			{this.props.userInfo.username && (
	// 				<Link to="/game/creategame">
	// 					<Button type="primary" size="large" className="creategame-button" disabled={!this.props.userInfo.username}>
	// 						Create a new game
	// 					</Button>
	// 				</Link>
	// 			)}
	// 		</section>
	// 	);
	// }

	renderGamelist() {
		const { gamesList, userInfo } = this.props;

		return gamesList.list.map(game => (
			<Link to={userInfo.username ? `/game/table/${game.uid}` : `/observe/table/${game.uid}`} key={game.uid}>
				<div className="game-item">{game.name}</div>
			</Link>
		));
	}

	render() {
		const { socket, gamesList, userInfo } = this.props;

		const click = () => {
			socket.emit('createGame', {
				gameCreator: userInfo.username,
			});
		};

		return (
			<section className="gamelist-container">
				<Button type="primary" size="large" className="creategame-button" onClick={click}>
					Create a new game
				</Button>
				{gamesList.list && this.renderGamelist()}
			</section>
		);
	}
}

Gamelist.propTypes = {
	userInfo: PropTypes.object,
	gamesList: PropTypes.object,
	socket: PropTypes.object,
};

export default Gamelist;
