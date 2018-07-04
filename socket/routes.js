const {
	handleAddNewGame,
	handleAddNewGameChat,
	handleNewGeneralChat,
	handleUpdateUserSettings,
	handleSocketDisconnect,
	handleUserLeaveGame,
	checkUserStatus,
	updateSeatedUser,
	handleModerationAction,
	handlePlayerReport,
	handlePlayerReportDismiss,
	handleUpdatedBio,
	handleUpdatedRemakeGame,
	handleUpdatedPlayerNote,
} = require('./user-events/account');
const {
	sendPlayerNotes,
	sendUserReports,
	sendGameInfo,
	sendUserGameSettings,
	sendModInfo,
	sendGameList,
	sendGeneralChats,
	sendUserList,
	sendReplayGameChats,
	updateUserStatus,
} = require('./user-requests');
const { games } = require('./models');

const ensureAuthenticated = socket => socket.handshake.session.passport && socket.handshake.session.passport.user;

const findGame = data => games && data && data.uid && games.find(el => el.general.uid === data.uid);

const ensureInGame = (passport, game) => {
	if (game && game.publicPlayersState && game.gameState && passport && passport.user) {
		const player = game.publicPlayersState.find(player => player.userName === passport.user);

		return Boolean(player);
	}
};

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
				handleSocketDisconnect(socket);
			})
			.on('addNewGame', data => {
				if (authenticated) {
					handleAddNewGame(socket, passport, data);
				}
			})
			.on('updateUserSettings', data => {
				if (authenticated) {
					handleUpdateUserSettings(socket, passport, data);
				}
			})
			.on('leaveGame', data => {
				// const game = findGame(data);
				// if (io.sockets.adapter.rooms[game.general.uid] && socket) {
				// 	socket.leave(game.general.uid);
				// }
				// if (authenticated && game) {
				// 	handleUserLeaveGame(socket, game, data, passport);
				// }
			})

			// user-requests
			.on('getGameList', () => {
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

			.on('selectedAwayTeamVote', data => {
				// const game = findGame(data);
				// if (authenticated && ensureInGame(passport, game)) {
				// 	selectVoting(passport, game, data);
				// }
			});
	});
};
