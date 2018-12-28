// const Account = require('../../models/account');
// const ModAction = require('../../models/modAction');
// const PlayerReport = require('../../models/playerReport');
// const Game = require('../../models/game');

const { games, userList, generalChats } = require('./models');
const { secureGame, sendInProgressGameUpdate } = require('./game/util');
const { GAMELIST_DEBOUNCE } = require('../iso/constants');

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

module.exports.sendGameInfo = (socket, uid, shouldJoinRoom) => {
	const game = games.gameList[uid];

	if (!game) {
		return;
	}

	const { passport } = socket.handshake.session;

	if (shouldJoinRoom) {
		socket.join(uid);
	}

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
			socket.emit('gameUpdate', secureGame(game), shouldJoinRoom);
		}
	} else {
		socket.emit('gameUpdate', game, shouldJoinRoom);
	}
};

/**
 * @param {object} socket - user socket reference.
 */
module.exports.sendGameList = socket => {
	// const time = new Date().getTime();

	// if (time < games.emitDebounceTime + GAMELIST_DEBOUNCE) {
	// 	return;
	// }

	const formattedGames = {
		list: Object.keys(games.gameList).map(gameName => ({
			name: games.gameList[gameName].info.name,
			uid: games.gameList[gameName].info.uid,
		})),
		sticky: '',
	};

	if (socket) {
		socket.emit('gamesList', formattedGames);
	} else {
		io.sockets.emit('gamesList', formattedGames);
	}

	// games.emitDebounceTime = time;
};

module.exports.sendGeneralChats = socket => {
	socket.emit('generalChats', generalChats);
};
