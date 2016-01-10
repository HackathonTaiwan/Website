export default function *() {

	var store = this.getState('EventRegister', {
		success: false,
		error: null,
		data: {}
	});

	this.on('action.EventRegister.success', function(e) {
		store.success = true;
		store.error = null;
		store.data = e;

		this.dispatch('state.EventRegister');
	});

	this.on('action.EventRegister.failure', function(err) {
		store.success = false;
		store.error = err;
		store.data = {};

		this.dispatch('state.EventRegister');
	});
};
