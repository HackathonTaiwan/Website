var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Event = new mongoose.Schema({
	name: String,
	desc: String,
	start: Date,
	end: Date,
	loc: String,
	address: String,
	geo: {type: [Number], index: '2d'},
	website: String,
	registration: String,
	order_num: { type: Number, default: 0 },
	available: { type: Boolean, default: false },
	sellout: { type: Boolean, default: false },
	quota: { type: Number, default: 0 },
	registered: { type: Number, default: 0 },
	deadline: Date,
	admins: [ { type: Schema.Types.ObjectId, ref: 'Member' } ],
	created: { type: Date, default: Date.now },
	updated: { type: Date, default: Date.now }
});

Event.plugin(function(schema, options) {

	schema.pre('findOneAndUpdate', function(next) {

		if (this.quota <= this.registered)
			this.sellout = true;
		else
			this.sellout = false;

		next();
	})

	schema.pre('save', function(next) {

		if (this.quota <= this.registered)
			this.sellout = true;
		else
			this.sellout = false;

		next();
	});
});

Event.methods.generateOrderNum = function(cb) {

	return this.model('Event')
		.findOneAndUpdate({
			_id: this._id
		}, {
			$inc: {
				order_num: 1
			}
		},
		{ new: true })
		.exec(function(err, event) {
			cb(err, event.order_num);
		});
};

module.exports = mongoose.model('Event', Event);
