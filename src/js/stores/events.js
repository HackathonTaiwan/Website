export default function *() {

	var store = this.getState('Events', {
		events: []
	});

	this.on('store.Events.fetchAll', function() {

		try {
			var res = yield this.request
				.get('/api/events')
				.query();

			// Update store
			store.events = [];

			var data = res.body.events;
			for (var index in data) {
				var event = data[index];

				var m = moment(event.start);

				var expired = false;
				if (moment().diff(m, 'days') > 0)
					expired = true;

				store.events.push({
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
					pos: event['geo']
				});
			}

			this.dispatch('state.Events');
		} catch(e) {
			console.log(e);
		}
	});
};
