var argv = require('minimist')(process.argv.slice(2));

if (!argv._.length) {
	console.error('Usage: enable_registration [hackathon id]');
	process.exit();
	return;
}

var id = argv._[0];

var co = require('co');
var Database = require('../lib/database');
var Hackathon = require('../lib/hackathon');
var Event = require('../lib/event');

co(function *() {
	yield Database.init();

	try {
		var hackathon = yield Hackathon.getEvent(id);
	} catch(e) {
	}

	if (!hackathon) {
		console.log('No such hackathon record.');
	}

	var event = yield Event.create({
		name: hackathon.name,
		desc: hackathon.desc,
		geo: hackathon.geo,
		start: hackathon.start,
		end: hackathon.end,
		loc: hackathon.loc,
		address: hackathon.address,
		website: hackathon.website,
		available: true,
		quota: 500
	});

	console.log(event);
/*
	try {
		var num = yield Event.generateOrderNum(event._id);
	} catch(e) {
		console.log(e);
	}

	console.log(num);
*/
	process.exit();
});
