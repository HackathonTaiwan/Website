var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Hackathon = new mongoose.Schema({
	name: String,
	desc: String,
	start: Date,
	end: Date,
	location: String,
	address: String,
	register_url: String,
	website: String,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hackathon', Hackathon);
