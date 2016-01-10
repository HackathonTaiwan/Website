var co = require('co');
var Event = require('../models/event');

module.exports = {
	create: function(event) {
		return function(done) {
			co(function *() {
				var _event = new Event({
					name: event.name,
					desc: event.desc,
					geo: event.geo,
					loc: event.loc,
					address: event.address,
					start: event.start,
					end: event.end,
					registration: event.registration,
					website: event.website,
					available: event.available || false,
					admins: event.admins || [],
					quota: event.quota || 0,
					deadline: event.deadline
				});

				_event.save(function(err) {

					done(err, _event);
				});
			});

		};
	},
	getEvent: function(id) {
		return function(done) {
			Event.findOne({ _id: id }, function(err, event) {
				if (err)
					return done(err);

				if (!event)
					return done();

				return done(null, event);
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

			Event.count(conditions, function(err, count) {
				if (err) {
					done(err);
					return;
				}

				if (!count) {
					done(err, { count: 0 });
					return;
				}

				Event.find(conditions, cols, opts, function(err, results) {

					done(err, {
						count: count,
						results: results 
					});
				});
			});
		};
	},
	getEventsByAdmin: function(userId, opts) {
		return function(done) {
			var conditions = {
				admins: userId
			};

			Event
				.find(conditions)
				.exec(function(err, events) {
					if (err)
						return done(err);

					if (!events)
						return done();

					return done(null, events);
				});
		};
	},
	generateOrderNum: function(id) {
		return function(done)  {
			Event
				.findOneAndUpdate({
					_id: id,
					sellout: false,
					available: true,
					deadline: {
						$gt: Date.now()
					}
				}, {
					$inc: {
						registered: 1,
						order_num: 1
					}
				},
				{ new: true })
				.exec(function(err, event) {
					if (event)
						done(err, event.order_num);
					else
						done(err, -1);
				});

		};
	},
	update: function(id, updates) {
		return function(done) {
			Event
				.findOneAndUpdate({
					_id: id
				}, updates,
				{ new: true })
				.exec(function(err, event) {

					if (event)
						done(err, event);
					else
						done(err);
				});
		};
	}
};
