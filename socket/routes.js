const { handleUpdateUserSettings, handleSocketDisconnect } = require('./user-events/account');
const { handlePlayerJoiningGame, handleAddNewGamechat, handleAddNewGame } = require('./user-events/game');
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
				// handleSocketDisconnect(socket);
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
			.on('leaveGame', data => {
				// const game = findGame(data);
				// if (io.sockets.adapter.rooms[game.general.uid] && socket) {
				// 	socket.leave(game.general.uid);
				// }
				// if (isAuthenticated && game) {
				// 	handleUserLeaveGame(socket, game, data, passport);
				// }
			})
			.on('createGame', data => {
				if (isAuthenticated) {
					handleAddNewGame(socket, data);
				}
			})
			.on('joinGame', uid => {
				if (isAuthenticated && !ensureInGame) {
					handlePlayerJoiningGame(socket, uid);
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
				const game = games[data.uid];

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
