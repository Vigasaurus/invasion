const { handleUpdateUserSettings } = require('./user-events/account');
``;
const {
	handlePlayerLeaveGame,
	handlePlayerJoinGame,
	handleAddNewGamechat,
	handleAddNewGame,
	handleSocketDisconnect,
} = require('./user-events/game');
const { handlePlayerStartGame } = require('./game/start-game');
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
					handleSocketDisconnect(socket, passport.user);
				}
			})
			.on('leaveGame', uid => {
				if (!uid) {
					return;
				}

				const game = games.gameList[uid];

				if (game) {
					socket.leave(game.info.uid);
					socket.emit('gameUpdate', {});
					if (passport) {
						handlePlayerLeaveGame(socket, game, passport.user);
					}
				}
			})
			.on('addNewGame', data => {
				if (isAuthenticated) {
					// handleAddNewGame(socket, passport, data);
				}
			})
			.on('updateUserSettings', data => {
				if (isAuthenticated && data) {
					handleUpdateUserSettings(socket, passport, data);
				}
			})
			.on('createGame', data => {
				if (isAuthenticated && data) {
					handleAddNewGame(socket, data);
				}
			})
			.on('joinGame', uid => {
				const game = games.gameList[uid];

				if (uid && isAuthenticated && game && !ensureInGame(passport, game)) {
					handlePlayerJoinGame(socket, uid);
				}
			})
			.on('startGame', uid => {
				const game = games.gameList[uid];

				if (uid && ensureAuthenticated && ensureInGame(passport, game) && game && !game.info.isStarted) {
					handlePlayerStartGame(game);
				}
			})
			// user-requests
			.on('getGamesList', () => {
				sendGameList(socket);
			})
			.on('getGameInfo', (uid, shouldJoinRoom) => {
				sendGameInfo(socket, uid, shouldJoinRoom);
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
				if (!data || !data.uid) {
					return;
				}
				const game = games.gameList[data.uid];

				if (isAuthenticated && game) {
					handleAddNewGamechat(socket, data);
				}
			})

			.on('selectedAwayTeamVote', data => {
				// if (isAuthenticated && ensureInGame(passport, game)) {
				// 	selectVoting(passport, game, data);
				// }
			});
	});
};
