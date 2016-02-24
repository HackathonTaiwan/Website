import moment from 'moment';

export default function *() {

	this.on('action.EventRegister.create', function *(event) {

		var startdate = event.daterange[0];
		var enddate;
		if (event.daterange.length == 2) {
			enddate = event.daterange[1];
		} else {
			enddate = event.daterange[0];
		}

		try {
			var res = yield this.request
				.post('/api/events')
				.send({
					name: event.name,
					desc: event.desc,
					startdate: startdate,
					enddate: enddate,
					loc: event.loc,
					address: event.address,
					latlng: event.latlng,
					website: event.website,
					registration: event.registration,
					deadline: event.deadline,
					quota: event.quota
				});

			// Getting result
			var e = res.body.event;

			// Date type
			var m = moment(e.start);
			var dm = moment(event.deadline);

			this.dispatch('action.EventRegister.success', {
				_id: e['_id'],
				name: e['name'],
				desc: e['desc'],
				location: e['loc'],
				address: e['address'],
				start: m.valueOf(),
				startdate: m.format('YYYY/MM/DD'),
				website: e['website'],
				pos: e['geo'],
				quota: e['quota'],
				registration: e['registration'],
				deadline: dm.format('YYYY/MM/DD HH:mm'),
				registered: e['registered'],
				available: e['available']
			});

		} catch(e) {
			this.dispatch('action.EventRegister.failure', e);
		}

	});
};
