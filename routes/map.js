var Router = require('koa-router');
var Middleware = require('../lib/middleware');
var Hackathon = require('../lib/hackathon');

var router = module.exports = new Router();

router.get('/api/map/hackathons', function *() {

	// Get hackathons from database
	var data = yield Hackathon.list();

	this.body = {
		hackathons: data.results
	};
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

	if (!name || !desc || !address || !loc || !latlng ||
		!startdate || !enddate || !registration) {
		this.status = 400;
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
		success: true,
		hackathon: hackathon
	};
});
