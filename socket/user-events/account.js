const { games, userList, generalChats } = require('../models');
const { sendGameList, sendGeneralChats, sendUserList } = require('../user-requests');
const Account = require('../../models/account');
const Generalchats = require('../../models/generalchats');
const startGame = require('../game/start-game.js');
const { secureGame, sendInProgressGameUpdate } = require('../util.js');
const https = require('https');
const _ = require('lodash');
const animals = require('../../utils/animals');
const adjectives = require('../../utils/adjectives');
const { generateCombination } = require('gfycat-style-urls');

/**
 * @param {object} socket - user socket reference.
 */
const handleSocketDisconnect = socket => {};

/**
 * @param {object} socket - socket reference.
 * @param {object} passport - socket authentication.
 * @param {object} data - from socket emit.
 */
module.exports.handleUpdateUserSettings = (socket, passport, data) => {
	// Authentication Assured in routes.js

	Account.findOne({ username: passport.user })
		.then(account => {
			account[data.type] = data.value;
			account.save(() => {
				socket.emit('updateUserSettings', {
					type: data.type,
					value: data.value,
				});
			});
		})
		.catch(err => {
			console.log(err, 'error in saving user setting');
		});
};

/**
 * @param {object} socket - user socket reference.
 * @param {object} passport - socket authentication.
 * @param {object} data - from socket emit.
 */
module.exports.handleAddNewGame = (socket, passport, data) => {};

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
