import React from 'react';
import Fluky from 'fluky';
import Loader from 'Extension/Loader.jsx';

class HackathonMap extends React.Component {

	componentDidMount() {
		var component = this.refs.component.getDOMNode();

		$(component).height($(window).height() * 0.8);

		//CSS
		Loader.css('https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.css');
		Loader.css('https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-minimap/v1.0.0/Control.MiniMap.css');
		Loader.script([
			'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.js',
			'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-minimap/v1.0.0/Control.MiniMap.js'
		], function() {
			var listUrl = 'https://spreadsheets.google.com/feeds/list/1wt8JVUmTEmwBPRqPI_ZjMxjjNNDNpcLUGwxhCXzJlHY/otnjarj/public/values?alt=json';
			var tileUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg';

			var map = L.map(component).setView([23.5, 121.518508], 8);
			var osm2 = new L.TileLayer(tileUrl, { subdomains: '1234', minZoom: 5, detectRetina: true });
			var miniMap = new L.Control.MiniMap(osm2).addTo(map);

			var pastIcon = L.divIcon({
				iconSize: [ 60, 60 ],
				iconAnchor: [ 30, 60 ],
				className: 'pin-icon',
				html: '<div class="past-pin"></div><div class="pulse"></div>'
			});

			var icon = L.divIcon({
				iconSize: [ 60, 60 ],
				iconAnchor: [ 30, 60 ],
				className: 'pin-icon',
				html: '<div class="pin"></div><div class="pulse"></div>'
			});

			$.getJSON(listUrl, function(data) {
				console.log(data);

				var bounds = [];

				for (var index in data.feed.entry) {
					var event = data.feed.entry[index];
					var pos = event['gsx$latlng'].$t.split(',');
					pos[0] = parseFloat(pos[0]);
					pos[1] = parseFloat(pos[1]);

					(function() {
						// Add a marker
						var title = '<h3>' + event['gsx$name'].$t + '</h3>';
						var desc = event['gsx$desc'].$t.replace(/\n/g, '<br />');
						var startdate = '- 活動時間：' + event['gsx$startdate'].$t;
						var loc = '- 活動地點：' + event['gsx$location'].$t + '';
						var addr = '- 完整地址：' + event['gsx$address'].$t + '';
						var registration = '<a href="' + event['gsx$registration'].$t + '">立即線上報名</a>';
						var website = '<a href="' + event['gsx$website'].$t + '">更多活動資訊</a>';

						if (Date.now() - 86400000 > Date.parse(event['gsx$startdate'].$t.split(' ')[0])) {
							bounds.splice(0, 0, pos);
							L.marker(pos, { icon: pastIcon }).addTo(map)
								.bindPopup(title + '<br />' + startdate + '<br />' + loc + '<br />' + addr + '<br /><br />' + desc + '<br /><br />' + registration + ' | ' + website, { offset: [ -5, -15 ] });
						} else {
							bounds.push(pos);
							L.marker(pos, { icon: icon }).addTo(map)
								.bindPopup(title + '<br />' + startdate + '<br />' + loc + '<br />' + addr + '<br /><br />' + desc + '<br /><br />' + registration + ' | ' + website, { offset: [ -5, -15 ] });
						}
					})();
				}

				map.fitBounds(bounds, { padding: [ 100, 100 ] });
			})


			// add an OpenStreetMap tile layer
			L.tileLayer(tileUrl, {
				subdomains: '1234',
	//				L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
				attribution: '<a href="https://hackathon.tw/">黑客松台灣 Hackathon Taiwan</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);
		});
	}

	render() {
		return (
			<div ref='component' style={{ width: '100%', height: '600px' }}></div>
		);
	}
}

export default HackathonMap;
