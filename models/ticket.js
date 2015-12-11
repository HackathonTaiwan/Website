var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ticket = new mongoose.Schema({
	name: String,
	realname: String,
	email: String,
	phone: String,
	organization: String,
	birthday: Date,
	idno: String,
	skills: {
		student: Boolean,
		software: Boolean,
		hardware: Boolean,
		design: Boolean
	},
	owner: { type: Schema.Types.ObjectId, ref: 'Member' },
	event: { type: Schema.Types.ObjectId, ref: 'Event' },
	number: { type: Number, default: 0 },
	valid: { type: Boolean, default: true },
	refund_comment: String,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', Ticket);
