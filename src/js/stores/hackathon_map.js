import moment from 'moment';

export default function *() {

	var store = this.getState('HackathonMap', {
		hackathons: [],
		focused: null,
		registered: {}
	});

	this.on('store.HackathonMap.fetch', function *() {

		try {
			var res = yield this.request
				.get('/api/events')
//				.get('/api/map/hackathons')
				.query();

			// Update store
			store.hackathons = [];

			var data = res.body.event;
			for (var index in data) {
				var event = data[index];

				var m = moment(event.start);

				var expired = false;
				if (moment().diff(m, 'days') > 0)
					expired = true;

				store.hackathons.push({
					_id: event['_id'],
					name: event['name'],
					desc: event['desc'],
					location: event['loc'],
					address: event['address'],
					start: m.valueOf(),
					startdate: m.format('YYYY/MM/DD'),
					registration: event['registration'] || null,
					website: event['website'],
					expired: expired,
					available: event.available,
					pos: event['geo'] || [ -1, -1 ]
				});
			}

			this.dispatch('state.HackathonMap');
		} catch(e) {
			console.log(e);
		}
/*
		if (this.isBrowser) {
			return;
		}

		var listUrl = 'https://spreadsheets.google.com/feeds/list/1wt8JVUmTEmwBPRqPI_ZjMxjjNNDNpcLUGwxhCXzJlHY/otnjarj/public/values?alt=json&orderby=column:startdate&reverse=true';

		try {
			var res = yield this.request
				.get(listUrl)
				.query();

			if (res.status != 200) {
				return;
			}

			var data = res.body;
			
			for (var index in data.feed.entry) {
				var event = data.feed.entry[index];
				var pos = event['gsx$latlng'].$t.split(',');
				pos[0] = parseFloat(pos[0]);
				pos[1] = parseFloat(pos[1]);

				var dateRange = [];
				dateRange.push(moment(event['gsx$startdate'].$t.split(' ')[0]).valueOf());

				if (event['gsx$enddate'].$t)
					dateRange.push(moment(event['gsx$enddate'].$t.split(' ')[0]).valueOf());

				console.log({
					name: event['gsx$name'].$t,
					desc: event['gsx$desc'].$t,
					daterange: dateRange,
					loc: event['gsx$location'].$t,
					address: event['gsx$address'].$t,
					registration: event['gsx$registration'].$t,
					website: event['gsx$website'].$t,
					latlng: pos
				});

				this.dispatch('action.HackathonMap.register', {
					name: event['gsx$name'].$t,
					desc: event['gsx$desc'].$t,
					daterange: dateRange,
					loc: event['gsx$location'].$t,
					address: event['gsx$address'].$t,
					registration: event['gsx$registration'].$t,
					website: event['gsx$website'].$t,
					latlng: pos
				});

			}

		} catch(e) {
			console.log(e);
		}
		*/
	});

	this.on('store.HackathonMap.takeFocus', function *(id) {
		for (var index in store.hackathons) {
			var hackathon = store.hackathons[index];

			if (hackathon._id != id)
				continue;

			store.focused = hackathon;

			this.dispatch('state.HackathonMap');
		}
	});

	this.on('store.HackathonMap.register', function *(event) {

		var startdate = event.daterange[0];
		var enddate;
		if (event.daterange.length == 2) {
			enddate = event.daterange[1];
		} else {
			enddate = event.daterange[0];
		}

		try {
			var res = yield this.request
				.post('/api/map/hackathon')
				.send({
					name: event.name,
					desc: event.desc,
					startdate: startdate,
					enddate: enddate,
					loc: event.loc,
					address: event.address,
					latlng: event.latlng,
					registration: event.registration,
					website: event.website
				});

			// Getting result
			var e = res.body.hackathon;
			var m = moment(e.start);

			var expired = false;
			if (moment().diff(m, 'days') > 0)
				expired = true;

			store.registered = {
				_id: e['_id'],
				name: e['name'],
				desc: e['desc'],
				location: e['loc'],
				address: e['address'],
				start: m.valueOf(),
				startdate: m.format('YYYY/MM/DD'),
				registration: e['registration'],
				website: e['website'],
				expired: expired,
				pos: e['geo']
			};

			// Add to list
			store.hackathons.push(store.registered);

			this.dispatch('state.HackathonMap');
		} catch(e) {
			console.log(e);
		}
//		alert(JSON.stringify(event));
	});
};
