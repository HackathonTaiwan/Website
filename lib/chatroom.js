var sockets = {};

module.exports = {
	init: function(io) {

		return function(done) {

			io.on('connection', function(socket) {
				console.log('Connected');

				// Recieve message from client
				socket.on('message', function(data) {
					data.ts = Date.now();

					if (data.to) {
						socket.to(data.to).emit('message', data)
					}
				});

				socket.on('subscribe', function(roomIds) {
					console.log(roomIds);

					// It contains more than one rooms
					if (roomIds instanceof Array) {
						roomsIds.forEach(function(id) {
							socket.join(id);
						});
						return;
					}

					socket.join(roomIds);
				});

				socket.on('unsubscribe', function(roomId) {
					socket.leave(roomId);
				});
			});

			done();
		};
	}
};
