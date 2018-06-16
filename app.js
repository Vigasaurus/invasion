const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const socketSession = require('express-socket.io-session');
const passport = require('passport');
const mongoose = require('mongoose');
const compression = require('compression');
const Strategy = require('passport-local').Strategy;
const Account = require('./models/account');
const routesIndex = require('./routes/index');
const session = require('express-session')({
	secret: process.env.SECRETSESSIONKEY,
	resave: false,
	saveUninitialized: false,
});

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.locals.pretty = true;
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(`${__dirname}/public/favicon.ico`));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`, { maxAge: 86400000 * 28 }));
app.use(session);

io.use(
	socketSession(session, {
		autoSave: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
mongoose.connect(`mongodb://localhost:${process.env.MONGOPORT}/invasion-app`);
mongoose.Promise = global.Promise;

routesIndex();
