var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Hackathon = new mongoose.Schema({
	name: String,
	desc: String,
	start: Date,
	end: Date,
	loc: String,
	address: String,
	geo: {type: [Number], index: '2d'},
	registration: String,
	website: String,
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

Hackathon.methods.findNear = function(cb) {
	return this.model('Place').find({
		geo: {
			$nearSphere: this.geo,
			$maxDistance: 0.01
		}
	}, cb);
}

module.exports = mongoose.model('Hackathon', Hackathon);
