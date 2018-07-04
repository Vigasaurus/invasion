// const Account = require('../../models/account');
// const ModAction = require('../../models/modAction');
// const PlayerReport = require('../../models/playerReport');
// const Game = require('../../models/game');

const { games, userList, generalChats } = require('./models');
const { sendInProgressGameUpdate } = require('./util');

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

/**
 * @param {object} socket - user socket reference.
 */
module.exports.sendGameList = socket => {
	const formattedGames = games.map(game => ({ name: game.info.name }));

	if (socket) {
		socket.emit('gameList', formattedGames);
	} else {
		io.sockets.emit('gameList', formattedGames);
	}
};

module.exports.sendGeneralChats = socket => {
	socket.emit('generalChats', generalChats);
};
