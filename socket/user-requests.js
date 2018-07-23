// const Account = require('../../models/account');
// const ModAction = require('../../models/modAction');
// const PlayerReport = require('../../models/playerReport');
// const Game = require('../../models/game');

const { games, userList, generalChats } = require('./models');
const { secureGame, sendInProgressGameUpdate } = require('./util');

/**
 * @param {object} socket - user socket reference.
 */
module.exports.sendUserList = socket => {
	// eslint-disable-line one-var
	if (socket) {
		socket.emit('userList', {
			list: [],
		});
	} else {
		// send to all people subbed to userlist & all not logged in
	}
};

module.exports.sendGameInfo = (socket, uid) => {
	const game = games.find(game => game.info.uid === uid);
	const { passport } = socket.handshake.session;

	if (game.info.isInProgress) {
		if (
			passport &&
			Object.keys(passport).length &&
			game.publicPlayersState.find(player => player.username === passport.user)
		) {
			player.leftGame = false;
			player.connected = true;
			sendInProgressGameUpdate(game);
		} else {
			_game = secureGame(game);
			socket.emit('gameUpdate', secureGame(game));
		}
	} else {
		socket.emit('gameUpdate', {});
	}
};

/**
 * @param {object} socket - user socket reference.
 */
module.exports.sendGameList = socket => {
	const formattedGames = {
		list: games.map(game => ({ name: game.info.name, uid: game.info.uid })),
		sticky: '',
	};

	if (socket) {
		socket.emit('gamesList', formattedGames);
	} else {
		io.sockets.emit('gamesList', formattedGames);
	}
};

module.exports.sendGeneralChats = socket => {
	socket.emit('generalChats', generalChats);
};
