import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import I18n from 'Extension/I18n.jsx';
import Loader from 'Extension/Loader.jsx';

// Components
import Header from './Header.jsx';

// Images
import bannerImage from 'Source/images/event_banner.jpg';

// Decorators
import { flux, page, i18n, loader, preAction, wait } from 'Decorator';

@preAction((handle) => {
	handle.doAction('Event.fetch', handle.props.params.id);
})
@wait('Event')
@page((handle) => {
	return {
		title: handle.i18n.getFmtMessage('event_page.title', '%s', handle.flux.getState('Event').name),
		ogMeta: {
			'og:title': handle.i18n.getFmtMessage('event_page.title', '%s', handle.flux.getState('Event').name),
			'og:image': handle.flux.getState('Service').externalUrl + bannerImage
		}
	};
})
@flux
class EventPage extends React.Component {
	constructor(props, context) {
		super();

		this.state = {
			'scroll': 'scroll-off',
			event: context.flux.getState('Event')
		}
	}

	componentWillMount() {
		this.flux.on('state.Event', this.flux.bindListener(this.onChange));
	}

	componentDidMount() {
		$(this.refs.progress).progress();
	}

	componentWillUnmount() {
		this.flux.off('state.Event', this.onChange);
	}

	onChange = () => {
		var event = this.flux.getState('Event');

		this.setState({
			event: event
		});
	}

	makeScroll = () => {
		this.setState({
			'scroll': null
		});
	}

	removeScroll = () => {
		this.setState({
			'scroll': 'scroll-off'
		});
	}

	about = () => {
		var $node = $(this.refs.app_section);
		var $header = $(ReactDOM.findDOMNode(this.refs.header));

		$('html, body').stop().animate({
			scrollTop: $node.offset().top - $header.height() + 1
		}, 400);
	}

	getProgressBarStyle = () => {

		var progress = this.state.event.registered / this.state.event.quota;

		if (progress < 0.8) {
			return 'ui active green tiny inverted progress';
		} else if (progress < 1) {
			return 'ui active yellow tiny inverted progress';
		}

		return 'ui active red tiny inverted progress';
	}

	render() {

		var style = {
			fontSize: '20px',
			lineHeight: '160%'
		};

		var bannerStyle = {
			background: 'rgb(21, 177, 201) url(\'' + bannerImage + '\') no-repeat center center',
			backgroundSize: 'cover'
		};

		var progressStyle = {
			boxShadow: '0 0 5px rgba(255,255,200,.9), 0 0 5px rgba(255,255,255,.9), inset 0 0 5px rgba(0,0,0,.5)'
		};

		return (
			<div className='main-page'>
				<Header ref='header' autoTransform={true} />

				<div className={'ui basic center aligned segment landing-page-header'} style={bannerStyle}>
					<div className='ui basic segment' style={{ position: 'absolute', bottom: 0, width: '96%' }}>
						{(() => {
							if (!this.state.event.registered) {
								return (
									<h1>當第一個報名者吧！</h1>
								);
							}

							if (this.state.event.registered == this.state.event.quota) {
								return (
									<div>
										<h1>{this.state.event.quota}人</h1>
										<h2>報名額滿，下次請早！</h2>
									</div>
								);
							}

							return (
								<div>
									<div className='ui inverted statistic'>
										<div className='value'>{this.state.event.registered}
											<span style={{ fontSize: '28pt', position: 'relative', top: '5px' }}>/</span>
											<span style={{ fontSize: '18pt', position: 'relative', top: '5px' }}>{this.state.event.quota}</span>
										</div>
										<div className='label'>目前報名人數</div>
									</div>
									<div className='ui centered grid'>
										<div className='four wide column'>
											<div ref='progress' style={progressStyle} className={this.getProgressBarStyle()} data-value={this.state.event.registered} data-total={this.state.event.quota}>
												<div className='bar' />
											</div>
										</div>
									</div>
								</div>
							);
						})()}
						<br />
						{(() => {
							if (this.state.event.hasTicket) {
								return (
									<a href={'/ticket/' + this.state.event.hasTicket}>
										<button className={'big ui blue animated fade button'}>
											<div className='visible content'>
												<i className='check circle icon' />
												<I18n sign='this.state.event.register_button1'>您已經報名了本活動</I18n>
											</div>
											<div className='hidden content'>
												<I18n sign='this.state.event.register_button2'>查看自己的報名資訊</I18n>
											</div>
										</button>
									</a>
								)
							} else if (this.state.event.registered < this.state.event.quota) {
								return (
									<a href={'/event/' + this.props.params.id + '/reg'}>
										<button className={'big ui inverted animated fade button'}>
											<div className='visible content'>
												<I18n sign='this.state.event.register_button1'>立即報名</I18n>
											</div>
											<div className='hidden content'>
												<I18n sign='this.state.event.register_button2'>刻不容緩</I18n>
											</div>
										</button>
									</a>
								);
							}
						})()}
					</div>
				</div>

				<div className={'ui hidden divider'} />

				<div className={'ui basic center aligned padded segment'}>
					<h1 className={'ui header'}>
						<span>{this.state.event.name}</span>
					</h1>

					<div className='ui centered stackable grid'>
						<div className='twelve wide column' style={style}>
							<div className='ui basic segment'>
								<div className='ui list'>
									<div className='item'>
										<i className='calendar icon' />
										<div className='content'>
											{this.state.event.startdate}
										</div>
									</div>
									<div className='item'>
										<i className='marker icon' />
										<div className='content'>
											<div className='header'>{this.state.event.location}</div>
											<div className='description'>{this.state.event.address}</div>
										</div>
									</div>
									<div className='item'>
										<i className='world icon' />
										<div className='content'>
											<a href={this.state.event.website}>{this.state.event.website}</a>
										</div>
									</div>
									<div className='item'>
										<i className='users icon' />
										<div className='content'>{this.state.event.quota}</div>
									</div>
								</div>
							</div>

							{this.state.event.desc}
						</div>
					</div>
				</div>

				<div className={'ui basic inverted center aligned segment'}>
					<p>contact@hackathon.tw</p>
					<p>© Hackathon Taiwan. All rights reserved.</p>
				</div>
			</div>
		);
	}
}

export default EventPage;
