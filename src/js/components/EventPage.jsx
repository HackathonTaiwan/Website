import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import 'External/datepicker';

import I18n from 'Extension/I18n.jsx';
import Loader from 'Extension/Loader.jsx';

// Components
import Header from './Header.jsx';

// Decorators
import { flux, page, i18n, loader, preAction } from 'Decorator';

@flux
@preAction((handle) => {
	handle.doAction('Event.fetch', handle.props.params.id);
})
@page((handle) => {
	return {
		title: handle.i18n.getFmtMessage('hackathon_reg_page.title', '%s | Register Your Hackathon', handle.flux.getState('Event').name)
	};
})
class EventPage extends React.Component {
	constructor() {
		super();

		this.state = {
			'scroll': 'scroll-off'
		}
	}

	componentDidMount() {
		$(this.refs.progress).progress();
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

	render() {

		var style = {
			fontSize: '20px',
			lineHeight: '160%'
		};

		var event = this.flux.getState('Event');

		return (
			<div className='main-page'>
				<Header ref='header' autoTransform={true} />

				<div className={'ui basic center aligned segment landing-page-header'}>
					<div className='ui basic segment' style={{ position: 'absolute', bottom: 0, width: '96%' }}>
						<div className='ui inverted statistic'>
							<div className='value'>346/500</div>
							<div className='label'>目前報名人數</div>
						</div>
						<div className='ui centered grid'>
							<div className='four wide column'>
								<div ref='progress' className='ui active green tiny inverted progress' data-value='346' data-total='500'>
									<div className='bar' />
								</div>
							</div>
						</div>
						<br />
						<Link to='/hackathon/room'>
							<button className={'big ui inverted animated fade button'}>
								<div className='visible content'>
									<I18n sign='event.register_button1'>立即報名</I18n>
								</div>
								<div className='hidden content'>
									<I18n sign='event.register_button2'>刻不容緩</I18n>
								</div>
							</button>
						</Link>
					</div>
				</div>

				<div className={'ui hidden divider'} />

				<div className={'ui basic center aligned padded segment'}>
					<div className='ui centered stackable grid'>
						<h1 className={'ui header'} style={{ fontSize: '40px' }}>
							<span>{event.name}</span>
						</h1>
						<div className='twelve wide column' style={style}>
							<div className='ui basic segment'>
								<div className='ui list'>
									<div className='item'>
										<i className='calendar icon' />
										<div className='content'>
											{event.startdate}
										</div>
									</div>
									<div className='item'>
										<i className='marker icon' />
										<div className='content'>
											<div className='header'>{event.location}</div>
											<div className='description'>{event.address}</div>
										</div>
									</div>
									<div className='item'>
										<i className='world icon' />
										<div className='content'>
											<a href={event.website}>{event.website}</a>
										</div>
									</div>
								</div>
							</div>

							{event.desc}
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
