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
	games.push(newGame);
	sendGameList();
	socket.join(newGame.info.uid);
	socket.emit('gameUpdate', newGame, true);
};

/**
 * @param {object} data - from socket emit.
 */
module.exports.handleAddNewGamechat = data => {
	const game = games.find(game => game.info.uid === data.uid);
	const chat = {
		timestamp: new Date(),
		username: data.username,
		chat: data.chat,
	};

	game.playerChats.push(chat);

	io.to(game.info.uid).emit('addNewChat', chat);
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
