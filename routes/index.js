const passport = require('passport'); // eslint-disable-line no-unused-vars
const Account = require('../models/account'); // eslint-disable-line no-unused-vars
const socketRoutes = require('../socket/routes');
const accounts = require('./accounts');
const { games } = require('../socket/models');
// const version = require('../version');
// const fs = require('fs');

/**
 * @param {object} req - express request object.
 * @param {object} res - express response object.
 * @param {function} next - express middleware function
 * @return {function} returns next() if user is authenticated.
 */
const ensureAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/observe');
};

module.exports = () => {
	/**
	 * @param {object} req - express request object.
	 * @param {object} res - express response object.
	 * @param {string} pageName - name of the pug page to render
	 * @param {string} varName - name of the pug variable to insert.
	 */
	const renderPage = (req, res, pageName, varName) => {
		const renderObj = {};

		renderObj[varName] = true;

		if (req.user) {
			renderObj.username = req.user.username;
		}

		res.render(pageName, renderObj);
	};

	accounts();
	socketRoutes();

	app.get('/', (req, res) => {
		renderPage(req, res, 'page-home', 'home');
	});

	app.get('/rules', (req, res) => {
		renderPage(req, res, 'page-rules', 'rules');
	});

	app.get('/about', (req, res) => {
		renderPage(req, res, 'page-about', 'about');
	});

	app.get(/^\/game/, ensureAuthenticated, (req, res) => {
		const { username } = req.user;

		if (req.user.isBanned) {
			res.redirect('/observe');
		} else {
			Account.findOne({ username }, (err, account) => {
				res.render('game', {
					game: true,
					username,
					timestampsEnabled: Boolean(account.timestampsEnabled),
					helpDisabled: Boolean(account.helpDisabled),
					gameList: Object.keys(games.gameList).length
						? Object.keys(games.gameList).map(gameName => ({
								name: games.gameList[gameName].info.name,
								uid: games.gameList[gameName].info.uid,
						  }))
						: false,
				});
			});
		}
	});

	app.get(/^\/observe/, (req, res) => {
		if (req.user) {
			req.session.destroy();
			req.logout();
		}

		res.render('game', {
			game: true,
			gameList: Object.keys(games.gameList).length
				? Object.keys(games.gameList).map(gameName => ({
						name: games.gameList[gameName].info.name,
						uid: games.gameList[gameName].info.uid,
				  }))
				: false,
		});
	});

	app.get('*', (req, res) => {
		renderPage(req, res, '404', '404');
	});
};
