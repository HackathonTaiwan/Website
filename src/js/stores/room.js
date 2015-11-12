export default function *() {

	var store = this.getState('Room', {
		rooms: {},
		socket: null,
		connected: false,
		connecting: false
	});

	this.on('store.Room.init', function *(rooms) {

		// Connect to server
		var socket = store.socket = io.connect();

		socket.on('connect', function() {
			store.connected = true;

			socket.emit('subscribe', rooms);

			var _rooms;
			if (rooms instanceof Array) {
				_rooms = rooms;
			} else {
				_rooms = [ rooms ];
			}

			// Initializing in store
			_rooms.forEach(function(room) {

				// Not to reset content in room
				if (store.rooms.hasOwnProperty(room))
					return;

				store.rooms[room] = {
					id: room,
					messages: []
				};
			});

			this.dispatch('state.Room');
		}.bind(this));

		socket.on('disconnect', function() {
			store.connected = false;

			this.dispatch('state.Room');
		}.bind(this));

		socket.on('message', function(data) {
			var room;

			// Room doesn't exist
			if (!store.rooms.hasOwnProperty(data.to)) {
				room = store.rooms[data.to] = {
					id: data.to,
					messages: []
				};
			} else {
				room = store.rooms[data.to];
			}

			this.dispatch('action.Room.addMessage', data);
		}.bind(this));

		this.dispatch('state.Room');
	});

	this.on('store.Room.addMessage', function *(data) {

		var messages = store.rooms[data.to].messages;

		// Getting last message
		if (messages.length) {
			var msg = messages[messages.length - 1];

			if (msg.from == data.from) {
				// Append to last message
				msg.content += '\n' + data.content;

				this.dispatch('state.Room');
				return;
			}
		}


		store.rooms[data.to].messages.push(data);

		this.dispatch('state.Room');
	});

	this.on('store.Room.sendMessage', function *(data) {

		store.socket.emit('message', data);

		this.dispatch('action.Room.addMessage', data);
	});
};
