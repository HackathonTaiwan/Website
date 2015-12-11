var co = require('co');
var Ticket = require('../models/ticket');
var Event = require('../models/event');

module.exports = {
	create: function(ticket) {
		return function(done) {
			co(function *() {
				var _ticket = new Ticket({
					name: ticket.name,
					email: ticket.email,
					phone: ticket.phone,
					organization: ticket.organization,
					skills: ticket.skills,
					realname: ticket.realname,
					idno: ticket.idno,
					birthday: ticket.birthday,
					owner: ticket.owner,
					event: ticket.event,
					number: ticket.number
				});

				_ticket.save(function(err) {

					done(err, _ticket);
				});
			});

		};
	},
	getTicket: function(id, opts) {
		return function(done) {
			var _ticket = Ticket.findOne({ _id: id });

			if (opts) {
				if (opts.eventInfo) {
					_ticket.populate('event', '-__v');
				}
			}

			_ticket.exec(function(err, ticket) {
					if (err)
						return done(err);

					if (!ticket)
						return done();

					return done(null, ticket);
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

			Ticket.count(conditions, function(err, count) {
				if (err) {
					done(err);
					return;
				}

				if (!count) {
					done(err, { count: 0 });
					return;
				}

				Ticket.find(conditions, cols, opts, function(err, results) {

					done(err, {
						count: count,
						results: results 
					});
				});
			});
		};
	},
	hasTicket: function(eventId, userId) {

		return function(done) {
			Ticket.findOne({ event: eventId, owner: userId, valid: true }, function(err, ticket) {
				if (err)
					return done(err);

				if (!ticket)
					return done(null, false);

				return done(null, true);
			});
		};
	},
	getTicketByInfo: function(eventId, userId) {

		return function(done) {
			Ticket.findOne({ event: eventId, owner: userId, valid: true }, function(err, ticket) {
				if (err)
					return done(err);

				if (!ticket)
					return done(null, ticket);

				return done(null, ticket);
			});
		};
	},
	refund: function(id, userId, comment) {

		return function(done) {

			// Finding ticket
			Ticket
				.findOneAndUpdate({
					_id: id,
					owner: userId
				}, {
					refund_comment: comment,
					valid: false
				})
				.exec(function(err, ticket) {
					if (err)
						return done(err);

					if (!ticket)
						return done(null, false);

					// Reducing number
					Event.findOneAndUpdate({ _id: ticket.event }, {
						$inc: {
							registered: -1
						}
					}, function(err, event) {
						if (err)
							return done(err);

						if (!event)
							return done(null, false);

						done(null, true);
					});	
				});

		};
	}
};
