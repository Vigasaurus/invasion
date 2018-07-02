import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { Redirect, withRouter, Switch, Route } from 'react-router-dom';

import Settings from './Settings';

const collect = (connect, monitor) => ({ connectDropTarget: connect.dropTarget() });
const spec = {
	hover(props, monitor, component) {
		props.updateSidebarWidth((window.innerWidth - monitor.getClientOffset().x).toString());
	},
};

const Mid = ({ connectDropTarget, socket, userInfo }) =>
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
			</Switch>
		</section>
	);

Mid.propTypes = {
	updateSidebarWidth: PropTypes.func,
	socket: PropTypes.object,
	userInfo: PropTypes.object,
};

export default withRouter(DropTarget('sidebar', spec, collect)(Mid));
