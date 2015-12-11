
export default function *() {

	this.on('action.EventRegistration.signUp', function *(id, params) {

		params.eventId = id;

		try {
			var res = yield this.request
				.post('/api/tickets')
				.send(params);

/*
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

			this.dispatch('state.Event');
*/
			this.dispatch('action.EventRegistration.registered', res.body);
		} catch(e) {
			console.log(e);
		}
	});
};
