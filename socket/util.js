/**
 * @param {object} game - game to act on.
 * @return {object} game
 */
const secureGame = game => {
	const _game = Object.assign({}, game);

	delete _game.internals;
	return _game;
};

module.exports.secureGame = secureGame;

/**
 * @param {object} game - game to act on.
 * @param {string} username - name of user to act on.
 * @return {array} list of chats.
 */
const combineInProgressChats = (game, username) => {
	const player =
		username && game.gameState.isStarted
			? game.internals.seatedPlayers.find(player => player.username === username)
			: undefined;

	return player ? player.gameChats.concat(game.playerChats) : game.playerChats;
};

/**
 * @param {object} game - game to act on.
 */
// todo-release make this accept a socket argument and emit only to it if it exists
module.exports.sendInProgressGameUpdate = game => {
	const seatedPlayerNames = game.publicPlayersState.map(player => player.username);

	let roomSockets;
	let playerSockets;
	let observerSockets;

	if (io.sockets.adapter.rooms[game.info.uid]) {
		roomSockets = Object.keys(io.sockets.adapter.rooms[game.info.uid].sockets).map(
			sockedId => io.sockets.connected[sockedId]
		);

		playerSockets = roomSockets.filter(
			socket =>
				socket &&
				socket.handshake.session.passport &&
				Object.keys(socket.handshake.session.passport).length &&
				seatedPlayerNames.includes(socket.handshake.session.passport.user)
		);

		observerSockets = roomSockets.filter(
			socket =>
				(socket && !socket.handshake.session.passport) ||
				(socket && !seatedPlayerNames.includes(socket.handshake.session.passport.user))
		);
	}

	if (playerSockets) {
		playerSockets.forEach(sock => {
			const _game = Object.assign({}, game);
			const { user } = sock.handshake.session.passport;

			if (!game.gameState.isCompleted) {
				const privatePlayer = _game.internals.seatedPlayers.find(player => user === player.username);

				if (!_game || !privatePlayer) {
					return;
				}
				_game.playersState = privatePlayer.playersState;
				_game.inventory = privatePlayer.inventory;
			}

			_game.chats = combineInProgressChats(_game, user);
			sock.emit('gameUpdate', secureGame(_game));
		});
	}

	if (observerSockets) {
		observerSockets.forEach(sock => {
			const _game = Object.assign({}, game);

			_game.chats = combineInProgressChats(_game);
			sock.emit('gameUpdate', secureGame(_game));
		});
	}
};

module.exports.secureGame = secureGame;
