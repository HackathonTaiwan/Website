import moment from 'moment';

export default function *() {

	var store = this.getState('Tickets', {
		tickets: []
	});

	this.on('store.Tickets.fetch', function *() {

		try {
			var res = yield this.request
				.get('/api/self/tickets')
				.query();

			var data = res.body;

			store.tickets = data.tickets;

			for (var index in store.tickets) {
				var ticket = store.tickets[index];

				var event = ticket.event;
				var m = moment(event.start);
				ticket.event.start = m.valueOf();
				ticket.event.startdate = m.format('YYYY/MM/DD');
			}

			this.dispatch('state.Tickets');
		} catch(e) {
			console.log(e);
		}
	});
};
