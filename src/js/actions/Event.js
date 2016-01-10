export default function *() {

	this.on('action.Event.setAvailable', function *(id, available) {

		try {
			var res = yield this.request
				.put('/api/event/' + id)
				.send({
					available: available
				});

			// Getting result
			var e = res.body;

			this.dispatch('action.Event.update', {
				available: e['available']
			});

		} catch(e) {
			this.dispatch('action.Event.failure', e);
		}

	});
};
