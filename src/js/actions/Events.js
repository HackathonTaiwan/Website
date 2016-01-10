import moment from 'moment';

export default function *() {

	this.on('action.Events.fetchMyEvents', function *() {

		try {
			var res = yield this.request
				.get('/api/self/events')
				.query();

			var events = [];
			var data = res.body.events;
			for (var index in data) {
				var event = data[index];

				// Date type
				var m = moment(event.start);
				var dm = moment(event.deadline);

				var expired = false;
				if (moment().diff(m, 'days') > 0)
					expired = true;

				events.push({
					_id: event['_id'],
					name: event['name'],
					desc: event['desc'],
					location: event['loc'],
					address: event['address'],
					start: m.valueOf(),
					startdate: m.format('YYYY/MM/DD'),
					registration: event['registration'],
					website: event['website'],
					expired: expired,
					pos: event['geo'],
					quota: event['quota'],
					available: event['available'],
					deadline: dm.format('YYYY/MM/DD HH:mm')
				});
			}

			this.dispatch('action.Events.receiveMyEvents', events);
		} catch(e) {
			console.log(e);
		}
	});

	this.on('store.Events.fetchAll', function *() {

		try {
			var res = yield this.request
				.get('/api/events')
				.query();

			var events = [];

			var data = res.body.events;
			for (var index in data) {
				var event = data[index];

				// Date type
				var m = moment(event.start);
				var dm = moment(event.deadline);

				var expired = false;
				if (moment().diff(m, 'days') > 0)
					expired = true;

				events.push({
					_id: event['_id'],
					name: event['name'],
					desc: event['desc'],
					location: event['loc'],
					address: event['address'],
					start: m.valueOf(),
					startdate: m.format('YYYY/MM/DD'),
					registration: event['registration'],
					website: event['website'],
					expired: expired,
					pos: event['geo'],
					quota: event['quota'],
					available: event['available'],
					deadline: dm.format('YYYY/MM/DD HH:mm'),
				});
			}

			this.dispatch('action.Events.receiveAll', events);
		} catch(e) {
			console.log(e);
		}
	});
};
