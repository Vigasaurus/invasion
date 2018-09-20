import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { Redirect, withRouter, Switch, Route } from 'react-router-dom';

import Settings from './Settings';
import Gamelist from './Gamelist';
import Creategame from './Creategame';
import Game from './game/Game';

const collect = (connect, monitor) => ({ connectDropTarget: connect.dropTarget() });
const spec = {
	hover(props, monitor, component) {
		props.updateSidebarWidth((window.innerWidth - monitor.getClientOffset().x).toString());
	},
};

const renderGameList = (gamesList, socket, userInfo) => (
	<Gamelist gamesList={gamesList} socket={socket} userInfo={userInfo} />
);

const renderGame = (socket, gameInfo, userInfo, uid, gamesList) => {
	// console.log(gamesList, 'gl');

	return Boolean(gamesList.list && gamesList.list.find(game => game.uid === uid)) ? (
		<Game socket={socket} gameInfo={gameInfo} userInfo={userInfo} uid={uid} />
	) : userInfo.username ? (
		<Redirect to="/game" />
	) : (
		<Redirect to="/observe" />
	);
};

const Mid = ({ connectDropTarget, socket, userInfo, gamesList, gameInfo }) =>
	connectDropTarget(
		<section className="mid-container">
			<Switch>
				<Route
					exact
					path="/game/settings"
					render={() =>
						userInfo.username ? <Settings socket={socket} userInfo={userInfo} /> : <Redirect to="/observe" />
					}
				/>
				<Route exact path="/game/creategame" render={() => <Creategame />} />
				<Route exact path="/game" render={() => renderGameList(gamesList, socket, userInfo)} />
				<Route exact path="/observe" render={() => renderGameList(gamesList, socket, userInfo)} />
				<Route
					exact
					path="/observe/table/:id"
					render={routeProps => renderGame(socket, gameInfo, userInfo, routeProps.match.params.id, gamesList)}
				/>
				<Route
					exact
					path="/game/table/:id"
					render={routeProps => renderGame(socket, gameInfo, userInfo, routeProps.match.params.id, gamesList)}
				/>
			</Switch>
		</section>
	);

Mid.propTypes = {
	updateSidebarWidth: PropTypes.func,
	socket: PropTypes.object,
	userInfo: PropTypes.object,
	gamesList: PropTypes.object,
	gameInfo: PropTypes.object,
};

export default withRouter(DropTarget('sidebar', spec, collect)(Mid));
