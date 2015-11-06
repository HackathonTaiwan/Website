var co = require('co');
var Hackathon = require('../models/hackathon');

module.exports = {
	create: function(event) {
		return function(done) {
			co(function *() {
				var _hackathon = new Hackathon({
					name: event.name,
					desc: event.desc,
					geo: event.geo,
					loc: event.loc,
					address: event.address,
					start: event.start,
					end: event.end,
					registration: event.registration,
					website: event.website
				});

				_hackathon.save(function(err) {

					done(err, _hackathon);
				});
			});

		};
	},
	list: function() {

		var conditions = {};
		var columns;
		var opts = {};
		if (arguments.length == 3) {
			conditions = arguments[0];
			columns = arguments[1];
			opts = arguments[2];
		} else if (arguments.length == 2) {
			if (arguments[0] instanceof Array) {
				columns = arguments[0];
				opts = arguments[1];
			} else if (arguments[1] instanceof Array) {
				conditions = arguments[0];
				columns = arguments[1];
			} else {
				conditions = arguments[0];
				opts = arguments[1];
			}
		} else if (arguments.length == 1) {
			columns = null;
			opts = arguments[0];
		}

		return function(done) {

			var cols = null;
			if (columns)
				cols = columns.join(' ');

			Hackathon.count(conditions, function(err, count) {
				if (err) {
					done(err);
					return;
				}

				if (!count) {
					done(err, { count: 0 });
					return;
				}

				Hackathon.find(conditions, cols, opts, function(err, results) {

					done(err, {
						count: count,
						results: results 
					});
				});
			});
		};
	}
};
