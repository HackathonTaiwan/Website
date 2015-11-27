var Router = require('koa-router');
var Middleware = require('../lib/middleware');
var Hackathon = require('../lib/hackathon');

var router = module.exports = new Router();

router.get('/api/event/:id', function *() {

	// Get hackathons from database
	var data = yield Hackathon.getEvent(this.params.id);

	this.body = {
		_id: data._id,
		name: data.name,
		desc: data.desc,
		geo: data.geo,
		loc: data.loc,
		start: data.start,
		end: data.end,
		address: data.address,
		website: data.website
	};
});
