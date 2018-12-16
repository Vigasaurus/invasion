const http = require('http');

const options = {
	method: 'POST',
	hostname: 'localhost',
	port: '8080',
	path: '/account/signup',
	headers: {
		'content-type': 'application/json; charset=UTF-8',
	},
};

const createUser = username => {
	const req = http.request(options, res => {
		const chunks = [];

		res.on('data', function(chunk) {
			chunks.push(chunk);
		});

		res.on('end', function() {
			if (res.statusCode == 200) {
				console.log(`Successfully created ${username}`);
			} else if (res.statusCode == 401) {
				console.warn(`${username} already exists`);
			} else {
				console.error(`${username} returned error code ${res.statusCode}`);
			}
		});
	});
	req.write(`{\"username\":\"${username}\",\"password\":\"snipsnap\",\"password2\":\"snipsnap\"}`);
	req.end();
};

console.log('Creating accounts in MongoDB.  May give errors for repeated runs.');
const names = ['Sombra', 'Reinhardt', 'Mei', 'Ana', 'Orisa', 'DVA', 'Junkrat', 'Winston', 'Doomfist', 'Zenyatta'];

names.forEach(name => {
	createUser(name);
});
