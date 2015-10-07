var Router = require('koa-router');
var Middleware = require('../lib/middleware');

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
