import moment from 'moment';

export default function *() {

	var store = this.getState('Event', {
		_id: '',
		name: '',
		desc: '',
		address: '',
		start: 0,
		startdate: '',
		website: '',
		available: false,
		registered: 0,
		quota: 0,
		deadline: '',
		available: false,
		pos: [],
		hasTicket: false
	});

	this.on('store.Event.fetch', function *(id) {

		try {
			var res = yield this.request
				.get('/api/event/' + id)
				.query();

			var event = res.body;
			var m = moment(event.start);

			store._id = event['_id'];
			store.name = event['name'];
			store.desc = event['desc'];
			store.location = event['loc'];
			store.address = event['address'];
			store.start = m.valueOf();
			store.startdate = m.format('YYYY/MM/DD');
			store.website = event['website'];
			store.pos = event['geo'];
			store.quota = event['quota'];
			store.registered = event['registered'];
			store.hasTicket = event['hasTicket'];
			store.available = event['available'];

			this.dispatch('state.Event');
		} catch(e) {
			console.log(e);
		}
	});

	this.on('store.Event.update', function *(updates) {
		for (var key in updates) {
			store[key] = updates[key];
		}

		this.dispatch('state.Event');
	});

	this.on('action.Event.failure', function(err) {
		this.dispatch('state.EventRegister');
	});
};
