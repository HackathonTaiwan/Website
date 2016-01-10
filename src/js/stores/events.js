export default function *() {

	var store = this.getState('Events', {
		events: [],
		myEvents: []
	});

	this.on('store.Events.receiveMyEvents', function(events) {
		store.myEvents = events;

		this.dispatch('state.Events');
	});
};
