var Router = require('koa-router');
var Middleware = require('../lib/middleware');

var router = module.exports = new Router();

router.get('/hackathon/room', function *() {

	// Get hackathons from database
	var data = yield Hackathon.list();

	this.body = {
		hackathons: data.results
	};
});
