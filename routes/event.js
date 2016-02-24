var Router = require('koa-router');
var Middleware = require('../lib/middleware');
var Event = require('../lib/event');
var Ticket = require('../lib/ticket');

var router = module.exports = new Router();

router.get('/api/event/:id', function *() {

	try {
		// Get hackathons from database
		var data = yield Event.getEvent(this.params.id);
		if (!data) {
			this.status = 404;
			return;
		}
	} catch(e) {
		this.status = 500;
		return;
	}

	// Check user has already registered if logined.
	var ticketId = '';
	if (this.isAuthenticated()) {
		if (this.state.user.id) {
			ticket = yield Ticket.getTicketByInfo(this.params.id, this.state.user.id);
			if (ticket)
				ticketId = ticket._id;
		}
	}

	this.body = {
		_id: data._id,
		name: data.name,
		desc: data.desc,
		geo: data.geo,
		loc: data.loc,
		start: data.start,
		end: data.end,
		address: data.address,
		website: data.website,
		quota: data.quota,
		registered: data.registered,
		available: data.available,
		hasTicket: ticketId
	};
});

router.put('/api/event/:id', Middleware.requireAuthorized, function *() {
	var available = this.request.body.available;

	var updates = {};

	if (available != undefined) {
		updates.available = available;
	}
	try {
		var updated = yield Event.update(this.params.id, updates);
	} catch(e) {
		this.status = 500;
		return;
	}

	this.body = updates;
});

router.get('/api/events', function *() {

	var data = yield Event.list();

	this.body = {
		event: data.results
	};
});

router.post('/api/events', Middleware.requireAuthorized, function *() {
	var name = this.request.body.name || null;
	var desc = this.request.body.desc || null;
	var address = this.request.body.address || null;
	var loc = this.request.body.loc || null;
	var latlng = this.request.body.latlng || null;
	var startdate = this.request.body.startdate || null;
	var enddate = this.request.body.enddate || null;
	var website = this.request.body.website || '';
	var quota = this.request.body.quota || 100;
	var deadline = this.request.body.deadline;
	var registration = this.request.body.registration || '';

	if (!name || !desc || !address || !loc || !latlng ||
		!startdate || !enddate) {
		this.status = 400;
		return;
	}

	var event = yield Event.create({
		name: name,
		desc: desc,
		geo: latlng,
		start: startdate,
		end: enddate,
		loc: loc,
		address: address,
		website: website,
		registration: registration,
		available: registration ? true : false,
		quota: quota,
		deadline: deadline,
		admins: [ this.state.user.id ]
	});

	this.body = {
		success: true,
		event: event 
	};
});

router.get('/api/self/events', Middleware.requireAuthorized, function *() {

	try {
		var events = yield Event.getEventsByAdmin(this.state.user.id);
		if (!events) {
			this.status = 404;
			return;
		}
	} catch(e) {
		this.status = 500;
		return;
	}

	this.body = {
		events: events
	};
});

router.get('/api/self/tickets', Middleware.requireAuthorized, function *() {

	try {
		// Get tickets
		var tickets = yield Ticket.getTicketsByOwner(this.state.user.id, { validOnly: true });
		if (!tickets) {
			this.status = 404;
			return;
		}
	} catch(e) {
		this.status = 500;
		return;
	}

	this.body = {
		tickets: tickets
	};
});

router.get('/api/ticket/:id', Middleware.requireAuthorized, function *() {

	try {
		// Get hackathons from database
		var ticket = yield Ticket.getTicket(this.params.id, { eventInfo: true });
		if (!ticket) {
			this.status = 404;
			return;
		}

		if (ticket.owner != this.state.user.id) {
			this.status = 404;
			return;
		}
	} catch(e) {
		this.status = 500;
		return;
	}

	this.body = {
		_id: ticket._id,
		name: ticket.name,
		email: ticket.email,
		phone: ticket.phone,
		organization: ticket.organization,
		skills: ticket.skills,
		realname: ticket.realname,
		idno: ticket.idno,
		birthday: ticket.birthday,
		owner: ticket.owner,
		number: ticket.number,
		event: {
			_id: ticket.event._id,
			name: ticket.event.name,
			desc: ticket.event.desc,
			geo: ticket.event.geo,
			loc: ticket.event.loc,
			start: ticket.event.start,
			end: ticket.event.end,
			address: ticket.event.address,
			website: ticket.event.website,
			quota: ticket.event.quota,
			registered: ticket.event.registered,
			available: ticket.event.available
		}
	};
});


router.put('/api/ticket/:id', Middleware.requireAuthorized, function *() {

	try {
		// Get hackathons from database
		var isRefunded = yield Ticket.refund(this.params.id, this.state.user.id, this.request.body.reason || null); 
		this.body = '';
	} catch(e) {
		console.log(e);
		this.status = 500;
		return;
	}
});

router.post('/api/tickets', Middleware.requireAuthorized, function *() {

	var eventId = this.request.body.eventId || null;
	var name = this.request.body.name || null;
	var email = this.request.body.email || null;
	var phone = this.request.body.phone || null;
	var organization = this.request.body.organization || null;
	var skills = this.request.body.skills || null;
	var realname = this.request.body.realname|| null;
	var idno = this.request.body.idno || null;
	var birthday = this.request.body.birthday || null;

	if (!name || !email || !phone || !organization || !skills ||
		!realname || !idno || !birthday) {
		this.status = 400;
		return;
	}

	try {
		// Check whether user has ticket already or not
		var exists = yield Ticket.hasTicket(eventId, this.state.user.id);
		if (exists) {
			this.status = 400;
			return;
		}

		// Getting order number
		var num = yield Event.generateOrderNum(eventId);
		if (num == -1) {
			// It's unavailable now
			this.status = 404;
			return;
		}

		// Create a new ticket
		var ticket = yield Ticket.create({
			name: name,
			email: email,
			phone: phone,
			organization: organization,
			skills: skills,
			realname: realname,
			idno: idno,
			birthday: birthday,
			owner: this.state.user.id,
			event: eventId,
			number: num
		});

		this.body = {
			_id: ticket._id,
			name: name,
			email: email,
			phone: phone,
			organization: organization,
			skills: skills,
			realname: realname,
			idno: idno,
			birthday: birthday,
			owner: this.state.user.id,
			event: eventId,
			number: num
		};
	} catch(e) {
		this.status = 500;
		return;
	}
});
