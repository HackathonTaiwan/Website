var settings = require('./config');
var socketio = require('socket.io');

var io = null;

module.exports = {
	init: function(app) {

		return function(done) {
			if (io) {
				done(null, io);
				return;
			}

			// Create a new socket
			var server = require('http').Server(app.callback())
			io = require('socket.io')(server);

			app.server = server;

			done(null, io);
		};
	},
	getIO: function() {
		return io;
	}
};
