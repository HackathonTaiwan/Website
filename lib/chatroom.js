var cookie = require('cookie');

var users = {};
var rooms = {};

var Chatroom = module.exports = {
	init: function(io) {

		return function(done) {

			io.set('authorization', function(data, accept) {
				if (data.headers.cookie && data.headers.cookie.indexOf('koa:sess') > -1) {
					data.cookie = cookie.parse(data.headers.cookie)['koa:sess'];
					data.session = JSON.parse(new Buffer(data.cookie, 'base64'));
				} else {
					return accept('No cookie transmitted.', false);
				}

				accept(null, true);
			});

			io.on('connection', function(socket) {
				var session = socket.request.session.passport;

				// User who is connected
				var user = {
					id: session.user.id,
					socket: socket,
					name: session.user.name,
					avatar_hash: session.user.avatar_hash,
					rooms: {}
				};

				users[socket.id] = user;

				// Disconnected
				socket.on('disconnect', function() {
					Chatroom.unsubscribeAll(user);

					// Remove user
					delete users[user.id];
				});

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

							// Initializing room and join
							Chatroom.subscribe(id, user);
							socket.join(id);
						});
						return;
					}

					// Initializing room and join
					Chatroom.subscribe(roomIds, user);
					socket.join(roomIds);
				});

				socket.on('unsubscribe', function(roomId) {
					socket.leave(roomId);
					Chatroom.unsubscribe(roomId, user);
				});
			});

			done();
		};
	},
	getRoom: function(id) {
		if (rooms.hasOwnProperty(id))
			return rooms[id];

		// Create a new one if it doesn't exist
		var room = {
			id: id,
			name: 'Unnamed',
			users: {}
		};

		rooms[id] = room;

		return room;
	},
	subscribe: function(roomId, user) {
		user.rooms[roomId] = Chatroom.getRoom(roomId);
		rooms[roomId].users[user.id] = user;
	},
	unsubscribe: function(roomId, user) {
		delete user.rooms[roomId];
		delete rooms[roomId].users[user.id];
	},
	unsubscribeAll: function(user) {
		for (var id in user.rooms) {
			Chatroom.unsubscribe(id, user);
		}
	}
};
