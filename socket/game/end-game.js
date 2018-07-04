const { sendInProgressGameUpdate, rateEloGame } = require('../util.js');
const { userList, games } = require('../models.js');
const { sendUserList, sendGameList } = require('../user-requests.js');
const Account = require('../../models/account.js');
const Game = require('../../models/game');
const animals = require('../../utils/animals');
const adjectives = require('../../utils/adjectives');
const _ = require('lodash');

/**
 * @param {object} game - game to act on.
 */
const saveGame = game => {
	const gameToSave = new Game({});

	gameToSave.save();
};

module.exports.completeGame = game => {};
