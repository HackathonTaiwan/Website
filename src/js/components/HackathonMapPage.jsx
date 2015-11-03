import React from 'react';
import ReactDOM from 'react-dom';
import I18n from 'Extension/I18n.jsx';

// Components
import Header from './Header.jsx';
import HackathonMap from './HackathonMap.jsx';

// Decorators
import { flux } from 'Decorator';

class EventList extends React.Component {
	constructor() {
		super();

		this.state = {
			events: []
		};
	}

	componentDidMount() {
		var listUrl = 'https://spreadsheets.google.com/feeds/list/1wt8JVUmTEmwBPRqPI_ZjMxjjNNDNpcLUGwxhCXzJlHY/otnjarj/public/values?alt=json';
		var self = this;

		$.getJSON(listUrl, function(data) {

			for (var index in data.feed.entry) {
				var event = data.feed.entry[index];
				var pos = event['gsx$latlng'].$t.split(',');
				pos[0] = parseFloat(pos[0]);
				pos[1] = parseFloat(pos[1]);

				(function() {
					
					//var desc = event['gsx$desc'].$t.replace(/\n/g, '<br />');
					//var startdate = '- 活動時間：' + event['gsx$startdate'].$t;
					//var loc = '- 活動地點：' + event['gsx$location'].$t + '';
					//var addr = '- 完整地址：' + event['gsx$address'].$t + '';
					//var registration = '<a href="' + event['gsx$registration'].$t + '" target="_blank">立即線上報名</a>';
					//var website = '<a href="' + event['gsx$website'].$t + '" target="_blank">更多活動資訊</a>';
					var expired = false;
					if (Date.now() - 86400000 > Date.parse(event['gsx$startdate'].$t.split(' ')[0]))
						expired = true;

					self.state.events.unshift({
						name: event['gsx$name'].$t,
						startdate: event['gsx$startdate'].$t.split(' ')[0],
						registration: event['gsx$registration'].$t,
						expired: expired
					});
				})();
			}

			self.forceUpdate();
		})
	}

	render() {
		var style = {
			position: 'absolute',
			left: '30px',
			top: 0,
			zIndex: 10000
		};

		var list = [];
		this.state.events.map(function(e, index) {
			list.push(
				<div className='item' key={index}>
					<div className='left floated content'>
						<div className={'ui ' + (e.expired ? 'grey' : 'teal') + ' small label'}>
							{e.startdate}
						</div>
					</div>
					<div className='left floated content'>
						{e.name}
					</div>
					{(() => {
						if (!e.expired)
							return (
								<div className='right floated content'>
									<a href={e.registration}>
										<div className={'ui green small label'}>
											<i className='plus icon' />
											Register
										</div>
									</a>
								</div>
							);
					})()}
				</div>
			);
		});

		return (
			<div style={style} className='ui inverted segment'>
				<div className='ui blue ribbon label'>Upcoming Hackathons</div>
				<div className='ui inverted divided list'>
					{list}
				</div>
			</div>
		);
	}
}

@flux
class HackathonMapPage extends React.Component {

	constructor(props, context) {
		super();

		var win = context.flux.getState('Window');
		this.state = {
			winWidth: win.width,
			winHeight: win.height,
			offsetHeight: 0
		};
	}

	componentWillMount() {
		this.flux.on('state.Window', this.flux.bindListener(this.updateDimensions));
	}

	componentDidMount() {
		var $header = $(ReactDOM.findDOMNode(this.refs.header));
		this.setState({
			offsetHeight: $header.height()
		});
	}

	componentWillUnmount() {
		this.flux.off('state.Window', this.updateDimensions);
	}

	updateDimensions = () => {
		var win = this.flux.getState('Window');

		this.setState({
			winWidth: win.width,
			winHeight: win.height
		});
	}

	render() {
		var style = {
			position: 'relative',
			top: this.state.offsetHeight + 'px'
		};

		return (
			<div className='main-page'>
				<Header ref='header' />
				<div style={style}>
					<HackathonMap height={this.state.winHeight - this.state.offsetHeight} />
					<EventList />
				</div>
			</div>
		);
	}
}

export default HackathonMapPage;
