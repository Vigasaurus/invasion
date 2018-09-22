const { sendInProgressGameUpdate } = require('../util.js');
const _ = require('lodash');
const Account = require('../../models/account.js');

/**
 * @param {object} game - game to act on.
 */
module.exports.handlePlayerStartGame = game => {
	game.info.status = 'Dealing roles..';
	sendInProgressGameUpdate(game);
};
