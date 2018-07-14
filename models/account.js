const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;
const Account = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	timestampsEnabled: Boolean,
	helpDisabled: Boolean,
	signupIP: String,
	lastConnectedIP: String,
	hashUid: String,
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
