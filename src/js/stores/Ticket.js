import moment from 'moment';

export default function *() {

	var store = this.getState('Ticket', {
		_id: null,
		name: '',
		email: '',
		phone: '',
		organization: '',
		skills: {
			student: false,
			hardware: false,
			software: false,
			design: false
		},
		realname: '',
		idno: '',
		birthday: null,
		owner: null,
		event: {},
		refunded: false,
		number: -1
	});

	this.on('store.Ticket.fetch', function *(id) {

		try {
			var res = yield this.request
				.get('/api/ticket/' + id)
				.query();

			var ticket = res.body;
			var birth = moment(ticket.birthday);

			store._id = ticket['_id'];
			store.name = ticket['name'];
			store.email = ticket['email'];
			store.phone = ticket['phone'];
			store.organization = ticket['organization'];
			store.skills = ticket['skills'];
			store.realname = ticket['realname'];
			store.idno = ticket['idno'];
			store.birthday = birth.format('YYYY/MM/DD');
			store.owner = ticket['owner'];
			store.event = ticket['event'];
			store.number = ticket['number'];
			store.refunded = false;

			var event = store.event;
			var m = moment(event.start);
			store.event.start = m.valueOf();
			store.event.startdate = m.format('YYYY/MM/DD');

			this.dispatch('state.Ticket');
		} catch(e) {
			console.log(e);
		}
	});

	this.on('store.Ticket.refund', function *(id, reason) {
		try {
			var res = yield this.request
				.put('/api/ticket/' + id)
				.send({
					refund: true,
					reason: reason
				});

			store.refunded = true;
			this.dispatch('state.Ticket');
		} catch(e) {
			console.log(e);
		}
	});
};
