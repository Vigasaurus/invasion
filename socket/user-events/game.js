const { games, userList, generalChats } = require('../models');
const { sendGameList, sendGeneralChats, sendUserList } = require('../user-requests');
const Account = require('../../models/account');
const startGame = require('../game/start-game.js');
const { secureGame, sendInProgressGameUpdate } = require('../util.js');
const https = require('https');
const _ = require('lodash');
const animals = require('../../utils/animals');
const adjectives = require('../../utils/adjectives');
const { generateCombination } = require('gfycat-style-urls');

/**
 * @param {object} socket - user socket reference.
 * @param {object} data - from socket emit.
 */
module.exports.handleAddNewGame = (socket, data) => {
	const newGame = {
		info: {
			name: 'mockName',
			uid: generateCombination(2, '', true),
			gameCreator: data.gameCreator,
			status: 'Waiting for more players..',
		},
		playerChats: [],
		combinedChats: [],
		publicPlayersState: [
			{
				username: data.gameCreator,
			},
		],
		mapState: {
			isBlurred: true,
		},
		internals: {
			playersState: [
				{
					username: data.gameCreator,
					gameChats: [],
				},
			],
			unseatedGameChats: [],
		},
	};

	for (let index = 0; index < 40; index++) {
		newGame.playerChats.push({
			timestamp: new Date(),
			username: data.gameCreator,
			chat: 'a',
			isObserver: false,
		});
	}

	games.gameList[newGame.info.uid] = newGame;
	sendGameList();
	socket.join(newGame.info.uid);
	socket.emit('gameUpdate', newGame, true);
};

/**
 * @param {object} data - from socket emit.
 */
module.exports.handleAddNewGamechat = (socket, data) => {
	const game = games.gameList[data.uid];
	const { passport } = socket.handshake.session;

	if (!game || !passport || !passport.user) {
		return;
	}

	const chat = {
		timestamp: new Date(),
		username: passport.user,
		chat: data.chat,
		isObserver: Boolean(!game.publicPlayersState.find(player => player.username === passport.user)),
	};

	game.playerChats.push(chat);

	io.to(game.info.uid).emit('addNewChat', chat);
};

/**
 * @param {string} uid uid of game
 * @param {object} socket socket object
 */
module.exports.handlePlayerJoinGame = (socket, uid) => {
	const username = socket.handshake.session.passport ? socket.handshake.session.passport.user : null;
	const game = games.gameList[uid];

	if (!game || !username) {
		return;
	}

	game.publicPlayersState.push({
		username,
	});
	game.internals.playersState.push({
		username,
		gameChats: [],
	});

	io.in(game.info.uid).emit('gameUpdate', game);
};

module.exports.handlePlayerLeaveGame = (socket, game, username, isDisconnected) => {
	const internalPlayersState = game.internals.playersState;
	const { publicPlayersState } = game;
	const index = internalPlayersState.findIndex(player => player.username === username);
	if (index < 0) {
		return;
	}
	const { isStarted } = game.info;

	if (internalPlayersState.length && internalPlayersState.length < 2) {
		delete games.gameList[game.info.uid];
	}

	if (isStarted) {
		if (isDisconnected) {
			publicPlayersState[index].isDisconnected = true;
		} else {
			publicPlayersState[index].hasLeftGame = true;
		}
	} else {
		publicPlayersState.splice(index, 1);
		internalPlayersState.splice(index, 1);
	}

	io.in(game.info.uid).emit('gameUpdate', isStarted || publicPlayersState.length > 1 ? secureGame(game) : {});
	sendGameList();
};

module.exports.handleSocketDisconnect = (socket, username) => {
	const gameUid = Object.keys(games.gameList).find(gameUid =>
		games.gameList[gameUid].publicPlayersState.find(player => player.username === username)
	);

	if (gameUid) {
		module.exports.handlePlayerLeaveGame(socket, games.gameList[gameUid], username, true);
	} else {
		// delete from userlist here
	}
};

const crashReport = JSON.stringify({
	content: `INVASION: ${process.env.DISCORDADMINPING} the site just crashed or reset.`,
});

const crashOptions = {
	hostname: 'discordapp.com',
	path: process.env.DISCORDCRASHURL,
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': Buffer.byteLength(crashReport),
	},
};

if (process.env.NODE_ENV === 'production') {
	const crashReq = https.request(crashOptions);

	crashReq.end(crashReport);
}
