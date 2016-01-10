var co = require('co');
var Database = require('../lib/database');
var Hackathon = require('../lib/hackathon');
var Event = require('../lib/event');

co(function *() {
	yield Database.init();

	try {
		var hackathons = yield Hackathon.list();
	} catch(e) {
	}

	if (!hackathons.count) {
		console.log('No such hackathon record.');
	}

	for (var index in hackathons.results) {
		var hackathon = hackathons.results[index];

		var event = yield Event.create({
			name: hackathon.name,
			desc: hackathon.desc,
			geo: hackathon.geo,
			start: hackathon.start,
			end: hackathon.end,
			loc: hackathon.loc,
			address: hackathon.address,
			registration: hackathon.registration,
			website: hackathon.website,
			available: true,
			quota: 500
		});
	}

	process.exit();
});
