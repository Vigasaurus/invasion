const { sendInProgressGameUpdate } = require('../util.js');
const _ = require('lodash');

/**
 * @param {object} game - game to act on.
 */
module.exports.handlePlayerStartGame = game => {
	game.info.status = 'Dealing roles..';
	game.info.timeStarted = new Date();

	const alienCount = Math.floor(game.publicPlayersState.length / 2) + 1;
	const humanCount = game.publicPlayersState.length - alienCount - 1;
	const roles = [
		{
			cardName: 'overlord',
			icon: 0,
			team: 'alien',
		},
	]
		.concat(
			_.shuffle(
				_.range(0, 6).map(el => ({
					cardName: 'human',
					icon: el,
					team: 'human',
				}))
			).slice(0, humanCount)
		)
		.concat(
			_.shuffle(
				_.range(0, 3).map(el => ({
					cardName: 'alien',
					icon: el,
					team: 'alien',
				}))
			).slice(0, alienCount)
		);

	game.internals.seatedPlayers = _.shuffle(game.internals.seatedPlayers);

	game.internals.seatedPlayers.forEach((player, i) => {
		const index = Math.floor(Math.random() * roles.length);

		player.role = roles[index];
		roles.splice(index, 1);
		player.playersState = _.range(0, game.publicPlayersState.length).map(play => ({}));

		player.playersState.forEach((play, index) => {
			play.notificationStatus = play.nameStatus = '';
			play.cardStatus = i === index ? { cardBack: player.role } : {};
		});

		player.gameChats.push({
			timestamp: new Date(),
			gameChat: true,
			chat: [
				{
					text: `You are ${
						player.role.cardName === 'overlord' ? 'the ' : player.role.cardName === 'alien' ? 'an ' : 'a '
					}`,
				},
				{
					text: player.role.cardName,
					type: player.role.cardName,
				},
				{
					text: ' and take seat ',
				},
				{
					text: `#${i + 1}.`,
					type: 'player',
				},
			],
		});
	});

	game.publicPlayersState.forEach(player => {
		const playerIndex = game.internals.seatedPlayers.findIndex(play => play.username === player.username);

		player.seatNumber = playerIndex;
		player.cardStatus.displayed = true;
	});

	game.internals.unSeatedGameChats = [
		{
			gameChat: true,
			timestamp: new Date(),
			chat: [
				{
					text: 'The game begins.',
				},
			],
		},
	];

	const overlordPlayer = game.internals.seatedPlayers.find(player => player.role.cardName === 'overlord');
	const playerCount = game.internals.seatedPlayers.length;
	const otherAliens = game.internals.seatedPlayers.filter(player => player.role.cardName === 'alien');
	const overlordChat = {
		timestamp: new Date(),
		gameChat: true,
		chat: [
			{
				text: 'You see that the other ',
			},
			{
				text: playerCount < 7 ? 'alien ' : 'aliens ',
				type: 'alien',
			},
			{
				text: `in this game ${playerCount < 7 ? 'is ' : 'are '}`,
			},
		],
	};

	if (playerCount < 7) {
		overlordChat.chat.push({
			text: `{${game.internals.seatedPlayers.indexOf(otherAliens[0]) + 1}} ${otherAliens[0].username}`,
			type: 'alien',
		});
	} else if (playerCount < 9) {
		overlordChat.chat.push(
			{
				text: `{${game.internals.seatedPlayers.indexOf(otherAliens[0]) + 1}} ${otherAliens[0].username}`,
				type: 'alien',
			},
			{
				text: ' and ',
				type: 'text',
			},
			{
				text: `{${game.internals.seatedPlayers.indexOf(otherAliens[1]) + 1}} ${otherAliens[1].username}`,
				type: 'alien',
			}
		);
	} else {
		overlordChat.chat.push(
			{
				text: `{${game.internals.seatedPlayers.indexOf(otherAliens[0]) + 1}} ${otherAliens[0].username}`,
				type: 'alien',
			},
			{
				text: ', ',
				type: 'text',
			},
			{
				text: `{${game.internals.seatedPlayers.indexOf(otherAliens[1]) + 1}} ${otherAliens[1].username}`,
				type: 'alien',
			},
			{
				text: ', and ',
				type: 'text',
			},
			{
				text: `{${game.internals.seatedPlayers.indexOf(otherAliens[2]) + 1}} ${otherAliens[2].username}`,
				type: 'alien',
			}
		);
	}

	overlordPlayer.gameChats.push(overlordChat);
	console.log(game);
	game.gameState.isStarted = true;
	sendInProgressGameUpdate(game);
};
