import moment from 'moment';

export default function *() {

	var store = this.getState('EventRegistration', {
		done: false,
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
		event: null,
		number: 0
	});

	this.on('store.EventRegistration.registered', function *(ticket) {

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

		store.event = ticket['event'];
		store.number = ticket['number'];
		store.done = true;

		this.dispatch('state.EventRegistration');
	});

	this.on('store.EventRegistration.reset', function *() {
		store.done = false;

		this.dispatch('state.EventRegistration');
	});
};
