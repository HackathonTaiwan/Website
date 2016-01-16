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
import { flux, router, page, i18n, loader, preAction } from 'Decorator';

@router
@flux
@preAction('Tickets.fetch')
@page((handle) => {
	return {
		title: handle.i18n.getMessage('my_tickets_page.title')
	};
})
class MyTicketsPage extends React.Component {
	constructor(props, context) {
		super();

		this.state = {
			'scroll': 'scroll-off',
			tickets: context.flux.getState('Tickets').tickets
		}
	}

	componentWillMount() {

		this.flux.on('state.Tickets', this.flux.bindListener(this.onChange));
	}

	componentDidMount() {
		$(this.refs.progress).progress();
	}

	componentWillUnmount() {
		this.flux.off('state.Tickets', this.onChange);
	}

	onChange = () => {
		var store = this.flux.getState('Tickets');

		this.setState({
			tickets: store.tickets
		});
	};

	makeScroll = () => {
		this.setState({
			'scroll': null
		});
	};

	removeScroll = () => {
		this.setState({
			'scroll': 'scroll-off'
		});
	};

	render() {

		var style = {
			fontSize: '20px',
			lineHeight: '160%'
		};

		var tickets = [];
		for (var index in this.state.tickets) {
			var ticket = this.state.tickets[index];

			tickets.push(
				<div className='card' key={index}>
					<div className='image'>
						<img src={bannerImage} />
					</div>
					<div className='left aligned content'>
						<div className='ui green ribbon label'>報名序號 {ticket.number}</div>
						<div className='ui hidden divider'></div>
						<div className='center aligned header'>{ticket.event.name}</div>
						<div className='ui left aligned description'>
							<div className='ui list'>
								<div className='item'>
									<i className='users icon' />
									<div className='content'>
										{ticket.event.quota}
									</div>
								</div>
								<div className='item'>
									<i className='calendar icon' />
									<div className='content'>
										{ticket.event.startdate}
									</div>
								</div>
								<div className='item'>
									<i className='marker icon' />
									<div className='content'>
										<div className='header'>{ticket.event.location}</div>
										<div className='description'>{ticket.event.address}</div>
									</div>
								</div>
								<div className='item'>
									<i className='world icon' />
									<div className='content'>
										<a href={ticket.event.website}>{ticket.event.website}</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='extra content'>
						<div className='ui two buttons'>
							<a href={'/ticket/' + ticket._id} className='ui green button'>查看報名票卷</a>
							<a href={'/event/' + ticket.event._id} className='ui yellow button'>查看活動訊息</a>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className='main-page'>
				<Header ref='header' />

				<div className={'ui hidden divider'} />
				<div className={'ui hidden divider'} />

				<div className={'ui basic center aligned padded segment'}>
					<h1 className={'ui header'} style={{ fontSize: '40px' }}>
						<span>您最近報名的活動</span>
					</h1>

					<div className='ui basic segment'>
						<div className='ui centered cards'>
							{tickets}
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

export default MyTicketsPage;
