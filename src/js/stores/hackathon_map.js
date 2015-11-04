export default function *() {

	var store = this.getState('HackathonMap', {
		hackathons: [],
		focused: null
	});

	this.on('store.HackathonMap.fetch', function *() {
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
};
