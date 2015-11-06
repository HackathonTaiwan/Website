var Router = require('koa-router');
var Middleware = require('../lib/middleware');
var Hackathon = require('../lib/hackathon');

var router = module.exports = new Router();

router.get('/api/map/hackathon', function *() {

	// Get hackathons from database
	var hackathons = yield Hackathon.getHackathons();
	/*
	var m = {
		name: member.name,
		email: member.email,
		created: member.created
	};

	this.body = {
		success: true,
		member: m
	};
	*/
});

router.post('/api/map/hackathon', function *() {
	var name = this.request.body.name || null;
	var desc = this.request.body.desc || null;
	var address = this.request.body.address || null;
	var loc = this.request.body.loc || null;
	var latlng = this.request.body.latlng || null;
	var startdate = this.request.body.startdate || null;
	var enddate = this.request.body.enddate || null;
	var website = this.request.body.website || '';
	var registration = this.request.body.registration || '';

	console.log(name, desc, address, loc, latlng, startdate, enddate, website, registration);

	if (!name || !desc || !address || !loc || !latlng ||
		!startdate || !enddate ||!website || !registration) {
		this.status = 401;
		return;
	}

	try {
		// Add to database
		var hackathon = yield Hackathon.create({
			name: name,
			desc: desc,
			geo: latlng,
			start: startdate,
			end: enddate,
			loc: loc,
			address: address,
			website: website,
			registration: registration
		});
	} catch(e) {
		throw e;
	}

	this.body = {
		success: true
	};
});
