var moment = require('moment');

export default function *() {

	var store = this.getState('HackathonMap', {
		hackathons: [],
		focused: null,
		registered: {}
	});

	this.on('store.HackathonMap.fetch', function *() {

		try {
			var res = yield this.request
				.get('/api/map/hackathons')
				.query();

			// Update store
			store.hackathons = [];

			var data = res.body.hackathons;
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
					startdate: m.format('YYYY/MM/DD'),
					registration: event['registration'],
					website: event['website'],
					expired: expired,
					pos: event['geo']
				});
			}

			this.dispatch('state.HackathonMap');
		} catch(e) {
			console.log(e);
		}

		return;
		var listUrl = 'https://spreadsheets.google.com/feeds/list/1wt8JVUmTEmwBPRqPI_ZjMxjjNNDNpcLUGwxhCXzJlHY/otnjarj/public/values?alt=json&orderby=column:startdate&reverse=true';

		try {
			var res = yield this.request
				.get(listUrl)
				.query();

			if (res.status != 200) {
				return;
			}

			var data = res.body;
			store.hackathons = [];
			store.focused = null;
			
			for (var index in data.feed.entry) {
				var event = data.feed.entry[index];
				var pos = event['gsx$latlng'].$t.split(',');
				pos[0] = parseFloat(pos[0]);
				pos[1] = parseFloat(pos[1]);

				var expired = false;
				if (Date.now() - 86400000 > Date.parse(event['gsx$startdate'].$t.split(' ')[0]))
					expired = true;

				store.hackathons.push({
					id: event['id'].$t,
					name: event['gsx$name'].$t,
					desc: event['gsx$desc'].$t,
					location: event['gsx$location'].$t,
					address: event['gsx$address'].$t,
					startdate: event['gsx$startdate'].$t.split(' ')[0],
					registration: event['gsx$registration'].$t,
					website: event['gsx$website'].$t,
					expired: expired,
					pos: pos
				});
			}

			this.dispatch('state.HackathonMap');
		} catch(e) {
			console.log(e);
		}
	});

	this.on('store.HackathonMap.takeFocus', function *(id) {
		for (var index in store.hackathons) {
			var hackathon = store.hackathons[index];

			if (hackathon.id != id)
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
/*
			store.registered = {
					name: event.name,
					desc: event.desc,
					startdate: startdate,
					enddate: enddate,
					loc: event.loc,
					address: event.address,
					latlng: event.latlng,
					registration: event.registration,
					website: event.website
			};

			this.dispatch('state.HackathonMap');
			return;
*/

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


			store.registered = {
					name: event.name,
					desc: event.desc,
					startdate: startdate,
					enddate: enddate,
					loc: event.loc,
					address: event.address,
					latlng: event.latlng,
					registration: event.registration,
					website: event.website
			};

			this.dispatch('state.HackathonMap');
		} catch(e) {
			console.log(e);
		}
		alert(JSON.stringify(event));
	});
};
