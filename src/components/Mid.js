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
				<Route
					exact
					path="/game"
					render={() => <Gamelist gamesList={gamesList} socket={socket} userInfo={userInfo} />}
				/>
				<Route
					exact
					path="/observe"
					render={() => <Gamelist gamesList={gamesList} socket={socket} userInfo={userInfo} />}
				/>
				<Route path="/game/table/:id" render={() => <Game socket={socket} gameInfo={gameInfo} userInfo={userInfo} />} />
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
