import React from 'react';
import ReactDOM from 'react-dom';

// Decorators
import { flux, loader, preAction } from 'Decorator';

@flux
@preAction('HackathonMap.fetch')
@loader
class HackathonMap extends React.Component {
	static propTypes: {
		height: React.propTypes.number
	}

	constructor(props, context) {
		super();

		this.state = {
			events: context.flux.getState('HackathonMap').hackathons,
			markers: {},
			map: null
		};
	}

	componentWillMount() {
		this.flux.on('state.HackathonMap', this.flux.bindListener(this.onChange));
	}

	componentDidMount() {
		var component = this.refs.component;

		// CSS
		this.loader.css('https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.css');
		this.loader.css('https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-minimap/v1.0.0/Control.MiniMap.css');
		this.loader.script([
			'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.js',
			'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-minimap/v1.0.0/Control.MiniMap.js'
		], function() {
			var listUrl = 'https://spreadsheets.google.com/feeds/list/1wt8JVUmTEmwBPRqPI_ZjMxjjNNDNpcLUGwxhCXzJlHY/otnjarj/public/values?alt=json';
			var tileUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg';

			// Initialzing map
			var zoomControl = L.control.zoom({ position: 'topright' });
			var map = L.map(component, { zoomControl: false }).setView([23.5, 121.518508], 8).addControl(zoomControl);
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

			var bounds = [];
			for (var index in this.state.events) {
				var event = this.state.events[index];

				var desc = event['desc'].replace(/\n/g, '<br />');
				var registration = '<a href="' + event['registration'] + '" target="_blank">立即報名</a>';
				var website = '<a href="' + event['website'] + '" target="_blank">更多活動資訊</a>';

				var $content = $('<div>');


				var $name = $('<h3>');
				
				if (event.expired) {
					bounds.splice(0, 0, event.pos);
					$name.addClass('ui big grey ribbon label');
				} else {
					bounds.push(event.pos);
					$name.addClass('ui big teal ribbon label');
				}
				
				$name.append(event.name).appendTo($content);

				var $info = $('<div>').addClass('ui relaxed list').appendTo($content);

				// Event date
				var $eventdate = $('<div>').addClass('item').appendTo($info);
				$('<i>').addClass('calendar icon').appendTo($eventdate);
				$('<div>').addClass('content').append(event.startdate).appendTo($eventdate);

				// Location
				var $eventloc = $('<div>').addClass('item').appendTo($info);
				$('<i>').addClass('marker icon').appendTo($eventloc);

				// Address information
				var $loc = $('<div>').addClass('content').appendTo($eventloc);
				$('<div>').addClass('header').append(event.location).appendTo($loc);
				$('<div>').addClass('description').append(event.address).appendTo($loc);

				// Links
				var $links = $('<div>').addClass('two ui buttons');

				if (event.expired) {
					$('<div>').addClass('ui grey basic segment').append(desc).appendTo($content);
					$('<button>').addClass('ui red disabled button').append('<i class="check icon"></i>活動已經結束').appendTo($links);
					$('<button>').addClass('ui disabled button').append('<i class="info icon"></i>更多活動資訊').appendTo($links);
				} else {
					$('<div>').addClass('ui green basic segment').append(desc).appendTo($content);
					$('<button>').addClass('ui green button').append('<i class="check icon"></i>立即線上報名').appendTo($links);
					$('<button>').addClass('ui blue button').append('<i class="info icon"></i>更多活動資訊').appendTo($links);
				}
				$links.appendTo($content);

				var marker = L.marker(event.pos, { icon: event.expired ? pastIcon : icon });
				marker.addTo(map)
					.bindPopup($content.html(), {
						minWidth: 100,
						maxWidth: 400,
						offset: [ -5, -15 ],
						className: 'map-event-popup'
					});

				this.state.markers[event.id] = marker;
			}
			map.fitBounds(bounds, { padding: [ 100, 100 ] });

			// add an OpenStreetMap tile layer
			L.tileLayer(tileUrl, {
				subdomains: '1234',
				attribution: '<a href="https://hackathon.tw/">黑客松台灣 Hackathon Taiwan</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);

			this.setState({
				map: map
			});
		}.bind(this));
	}

	componentWillUnmount() {
		this.flux.off('state.HackathonMap', this.onChange);
	}

	onChange = () => {
		var store = this.flux.getState('HackathonMap');
		var component = ReactDOM.findDOMNode(this.refs.component);

		// Change focus
		if (store.focused) {
			this.state.map.closePopup();

			this.state.map.setView([
				store.focused.pos[0],
				store.focused.pos[1] - 0.02
			], 13, {
				animate: true
			});

			this.state.markers[store.focused.id].openPopup();
		}
	}

	render() {
		var scrollStyle = this.props.scrollStyle;

		return (
			<div ref='component' className={ scrollStyle } style={{ width: '100%', height: this.props.height ? this.props.height + 'px' : '600px', overflow: 'hidden' }}></div>
		);
	}
}

export default HackathonMap;
