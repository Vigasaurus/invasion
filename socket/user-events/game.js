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
	games[newGame.info.uid] = newGame;
	sendGameList();
	socket.join(newGame.info.uid);
	socket.emit('gameUpdate', newGame, true);
};

/**
 * @param {object} data - from socket emit.
 */
module.exports.handleAddNewGamechat = data => {
	const game = games[data.uid];

	if (!game) {
		return;
	}
	const chat = {
		timestamp: new Date(),
		username: data.username,
		chat: data.chat,
	};

	game.playerChats.push(chat);

	io.to(game.info.uid).emit('addNewChat', chat);
};

/**
 * @param {string} uid uid of game
 * @param {object} socket socket object
 */
module.exports.handlePlayerJoiningGame = (uid, socket) => {
	const username = socket.handshake.session.passport ? socket.handshake.session.passport.user : null;
	const game = games[uid];

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

	socket.emit('gameUpdate', game);
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
