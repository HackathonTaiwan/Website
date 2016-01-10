import React from 'react';
import ReactDOM from 'react-dom';

// Decorators
import { flux, loader, i18n, preAction } from 'Decorator';

@flux
@preAction('HackathonMap.fetch')
@loader
@i18n
class HackathonMap extends React.Component {
	static propTypes: {
		height: React.propTypes.number
	}

	constructor(props, context) {
		super();

		this.state = {
			events: context.flux.getState('HackathonMap').hackathons,
			markers: {},
			focused: null,
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
			var tileUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg';

			// Initialzing map
			var zoomControl = L.control.zoom({ position: 'topright' });
			var map = L.map(component, { zoomControl: false })
				.setView([ 23.5, 121.518508 ], 8)
				.addControl(zoomControl);
			var osm2 = new L.TileLayer(tileUrl, { subdomains: '1234', minZoom: 5, detectRetina: true });
			var miniMap = new L.Control.MiniMap(osm2).addTo(map);

			this.state.map = map;

			// Rendering all markers
			var bounds = [];
			for (var index in this.state.events) {
				var event = this.state.events[index];

				if (!event.available)
					continue;

				bounds.push(event.pos);

				this.addMarker(event);
			}

			if (bounds.length > 1)
				map.fitBounds(bounds, { padding: [ 100, 100 ], maxZoom: 8 });

			// add an OpenStreetMap tile layer
			L.tileLayer(tileUrl, {
				subdomains: '1234',
				attribution: '<a href="https://hackathon.tw/">黑客松台灣 Hackathon Taiwan</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);
		}.bind(this));
	}

	componentWillUnmount() {
		this.flux.off('state.HackathonMap', this.onChange);
	}

	addMarker = (event) => {

		if (!this.state.map)
			return;

		var pastIcon = L.divIcon({
			iconSize: [ 60, 60 ],
			iconAnchor: [ 30, 60 ],
			className: 'pin-icon',
			html: '<div class="past-pin"></div><div class="past-pulse"></div>'
		});

		var icon = L.divIcon({
			iconSize: [ 60, 60 ],
			iconAnchor: [ 30, 60 ],
			className: 'pin-icon',
			html: '<div class="pin"></div><div class="pulse"></div>'
		});

		var $container = $('<div>');
		var $content = $('<div>').addClass('ui basic segment').appendTo($container);

		// Event name
		var $name = $('<h3>')
			.addClass('ui big ' + (event.expired ? 'grey' : 'teal') + ' ribbon label')
			.append(event.name)
			.appendTo($content);

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
		//var $links = $('<div>').addClass('ui two bottom attached buttons');
		var $links = $('<div>').addClass('ui two attached buttons');
		var $registration = $('<a>')
			.attr('href', event['registration'])
			.attr('target', '_blank')
			.appendTo($links);
		var $website = $('<a>')
			.attr('href', event['website'])
			.attr('target', '_blank')
			.appendTo($links);

		// Description and buttons
		var desc = event['desc'].replace(/\n/g, '<br />');
		if (event.expired) {
			$('<div>').addClass('ui grey basic segment').append(desc).appendTo($content);
			$registration
				.addClass('ui red disabled button')
				.append('<i class="checkered flag icon"></i>' + this.i18n.getMessage('hackathon_map.event_over', 'Event is Over'));
			$website
				.addClass('ui disabled button')
				.append('<i class="info icon"></i>' + this.i18n.getMessage('hackathon_map.more_info', 'More Info'));
		} else {
			$('<div>').addClass('ui teal basic segment').append(desc).appendTo($content);
			$registration
				.addClass('ui green button')
				.append('<i class="check icon"></i>' + this.i18n.getMessage('hackathon_map.register_now', 'Register'));
			$website
				.addClass('ui blue button')
				.append('<i class="info icon"></i>' + this.i18n.getMessage('hackathon_map.more_info', 'More Info'));
		}
		$links.appendTo($container);

		// Chatroom
//		var $chatroom = $('<div>').addClass('ui bottom attached buttons');
		var $chatroom_link = $('<a>')
			.attr('href', '/hackathon/room/hackthon_' + event._id)
			.attr('target', '_blank')
			.css({
				marginLeft: -1,
				marginRight: -1
			})
			.appendTo($container);
			$chatroom_link
				.addClass('ui orange bottom attached button')
				.append('<i class="comments outline icon"></i>' + this.i18n.getMessage('hackathon_map.chatroom_button', 'Enter to Chatroom'));

//		$chatroom.appendTo($container);


		// Create a new marker
		var marker = L.marker(event.pos, {
			icon: event.expired ? pastIcon : icon,
			zIndexOffset: event.expired ? 0 : 100
		});

		// Add to map
		marker.addTo(this.state.map)
			.bindPopup($container.html(), {
				minWidth: 300,
				maxWidth: 400,
				offset: [ -5, -15 ],
				className: 'map-event-popup'
			});

		this.state.markers[event._id] = marker;
	}

	onChange = () => {
		var store = this.flux.getState('HackathonMap');
		var component = ReactDOM.findDOMNode(this.refs.component);

		// Change focus
		if (store.focused) {
			this.state.map.closePopup();

			// Move view to specific position
			this.state.map.setView([
				store.focused.pos[0],
				store.focused.pos[1] - 0.025
			], 13, {
				animate: false
			});

			this.state.map.setView([
				store.focused.pos[0],
				store.focused.pos[1] - 0.025
			], 13, {
				animate: true
			});

			this.state.markers[store.focused._id].openPopup();
		}

		// Update markers
		for (var index in store.hackathons) {
			var event = store.hackathons[index];

			if (!this.state.markers[event._id]) {
				this.addMarker(event);
			}
		}

		this.setState({
			focused: store.focused,
			events: store.hackathons
		});
	}

	render() {
		var scrollStyle = this.props.scrollStyle;

		return (
			<div ref='component' className={ scrollStyle } style={{ width: '100%', height: this.props.height ? this.props.height + 'px' : '600px', overflow: 'hidden' }}></div>
		);
	}
}

export default HackathonMap;
