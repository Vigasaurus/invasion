const { handleUpdateUserSettings } = require('./user-events/account');
``;
const {
	handlePlayerLeaveGame,
	handlePlayerJoinGame,
	handleAddNewGamechat,
	handleAddNewGame,
	handleSocketDisconnect,
} = require('./user-events/game');
const { sendGameInfo, sendUserGameSettings, sendGameList, sendGeneralChats, sendUserList } = require('./user-requests');
const { games } = require('./models');

const ensureAuthenticated = socket => socket.handshake.session.passport && socket.handshake.session.passport.user;

const ensureInGame = (passport, game) =>
	Boolean(game.publicPlayersState.find(player => player.username === passport.user));

module.exports = () => {
	io.on('connection', socket => {
		// checkUserStatus(socket);
		const { passport } = socket.handshake.session;
		const isAuthenticated = ensureAuthenticated(socket);

		// Instantly sends the userlist as soon as the websocket is created.
		// For some reason, sending the userlist before this happens actually doesn't work on the client. The event gets in, but is not used.
		// socket.conn.on('upgrade', () => {
		// 	sendUserList(socket);
		// });

		socket
			.on('disconnect', () => {
				if (ensureAuthenticated(socket)) {
					handleSocketDisconnect(passport.user);
				}
			})
			.on('leaveGame', uid => {
				const game = games.gameList[uid];

				if (isAuthenticated && game && ensureInGame(passport, game)) {
					handlePlayerLeaveGame(game, passport.user);
				}
			})
			.on('addNewGame', data => {
				if (isAuthenticated) {
					// handleAddNewGame(socket, passport, data);
				}
			})
			.on('updateUserSettings', data => {
				if (isAuthenticated) {
					handleUpdateUserSettings(socket, passport, data);
				}
			})
			.on('createGame', data => {
				if (isAuthenticated) {
					handleAddNewGame(socket, data);
				}
			})
			.on('joinGame', uid => {
				const game = games.gameList[uid];

				if (isAuthenticated && game && !ensureInGame(passport, game)) {
					handlePlayerJoinGame(socket, uid);
				}
			})
			// user-requests
			.on('getGamesList', () => {
				sendGameList(socket);
			})
			.on('getGameInfo', uid => {
				sendGameInfo(socket, uid);
			})
			.on('getUserList', () => {
				sendUserList(socket);
			})
			.on('getGeneralChats', () => {
				sendGeneralChats(socket);
			})
			.on('getUserGameSettings', () => {
				sendUserGameSettings(socket);
			})

			// user-events game
			.on('newGamechat', data => {
				const game = games.gameList[data.uid];

				if (isAuthenticated && game && ensureInGame(passport, game)) {
					handleAddNewGamechat(data);
				}
			})

			.on('selectedAwayTeamVote', data => {
				// if (isAuthenticated && ensureInGame(passport, game)) {
				// 	selectVoting(passport, game, data);
				// }
			});
	});
};
