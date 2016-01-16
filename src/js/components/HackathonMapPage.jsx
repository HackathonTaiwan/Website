import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import I18n from 'Extension/I18n.jsx';

// Components
import Header from './Header.jsx';
import HackathonMap from './HackathonMap.jsx';

// Decorators
import { flux, i18n, page, preAction } from 'Decorator';

@flux
@i18n
@page((handle) => {
	return {
		title: handle.i18n.getFmtMessage('hackathon_map_page.title', '%s | Hackathon Map', handle.flux.getState('Service').name)
	};
})
@preAction('HackathonMap.fetch')
class EventList extends React.Component {
	constructor(props, context) {
		super();

		var store = context.flux.getState('HackathonMap');

		this.state = {
			events: store.hackathons,
			sorted: store.hackathons.slice(0).sort(function(a, b) {
				return b.start - a.start;
			})
		};
	}

	componentWillMount() {
		this.flux.on('state.HackathonMap', this.flux.bindListener(this.onChange));
	}

	componentWillUnmount() {
		this.flux.off('state.HackathonMap', this.onChange);
	}

	onChange = () => {
		var store = this.flux.getState('HackathonMap');

		this.setState({
			events: store.hackathons,
			sorted: store.hackathons.slice(0).sort(function(a, b) {
				return b.start - a.start;
			})
		});
	};

	takeFocus = (id) => {
		this.flux.dispatch('action.HackathonMap.takeFocus', id);
	};

	render() {
		var style = {
			position: 'absolute',
			left: '30px',
			top: 0,
			zIndex: 10000,
			background: 'rgba(0,0,0,0.8)',
			boxShadow: '0 0 3px rgba(255,255,255,0.8)',
			minWidth: '350px'
		};

		var listviewStyle = {
			height: this.props.height,
			overflowX: 'hidden'
		};

		var list = [];
		this.state.sorted.map(function(e, index) {

			if (!e.available)
				return;

			list.push(
				<div className='item' onMouseEnter={this.takeFocus.bind(this, e._id)} key={index}>
					<div className='left floated content'>
						<div className={'ui ' + (e.expired ? 'grey' : 'green') + ' tiny label'}>
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
										<p className="ui olive empty circular label">&nbsp;</p>
									</a>
								</div>
							);
					})()}
				</div>
			);
		}.bind(this));

		return (
			<div style={style} className='ui inverted segment'>
				<div className='ui blue ribbon label'><I18n sign='hackathon_map.upcoming'>Upcoming Hackathons</I18n></div>
				<Link to='/hackathon/reg'>
					<div className='ui large orange top right attached label'>
						<i className='add square icon' />
						<span> <I18n sign='hackathon_map.post'>Post Your Hackathon</I18n></span>
					</div>
				</Link>
				<div style={listviewStyle} className='ui inverted divided selection list'>
					{list}
				</div>
			</div>
		);
	}
}

@flux
@i18n
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
	};

	render() {
		var style = {
			position: 'relative',
			top: this.state.offsetHeight + 'px'
		};

		return (
			<div className='main-page'>
				<Header ref='header' title={this.i18n.getFmtMessage('hackathon_map_page.title', '%s | Hackathon Map', this.flux.getState('Service').name)} />
				<div style={style}>
					<HackathonMap height={this.state.winHeight - this.state.offsetHeight} />
					<EventList height={this.state.winHeight - this.state.offsetHeight - 100} />
				</div>
			</div>
		);
	}
}

export default HackathonMapPage;
