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
@preAction('Events.fetchMyEvents')
@page((handle) => {
	return {
		title: handle.i18n.getMessage('my_tickets_page.title')
	};
})
class MyEventsPage extends React.Component {
	constructor(props, context) {
		super();

		this.state = {
			'scroll': 'scroll-off',
			events: context.flux.getState('Events').myEvents
		}
	}

	componentWillMount() {

		this.flux.on('state.Events', this.flux.bindListener(this.onChange));
	}

	componentDidMount() {
		$(this.refs.progress).progress();
	}

	componentWillUnmount() {
		this.flux.off('state.Events', this.onChange);
	}

	onChange = () => {
		var store = this.flux.getState('Events');

		this.setState({
			events: store.myEvents
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

		var events = [];
		for (var index in this.state.events) {
			var event = this.state.events[index];

			events.push(
				<div className='card' key={index}>
					<div className='image'>
						<img src={bannerImage} />
						{(() => {
							if (event.available)
								return;

							return (
								<div className='ui top right attached red label'>
									<i className='minus circle icon' />
									<span>尚未開放報名</span>
								</div>
							);
						})()}
					</div>
					<div className='left aligned content'>
						<div className='center aligned header'>{event.name}</div>
						<div className='ui left aligned description'>
							<div className='ui list'>
								<div className='item'>
									<i className='users icon' />
									<div className='content'>
										{event.quota}
									</div>
								</div>
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
					</div>

					<div className='extra content'>
						<div className='ui two buttons'>
							<a href={'/self/event/' + event._id} className='ui yellow button'>管理</a>
							{(() => {
								if (event.available) {
									return <a href={'/event/' + event._id} className='ui green button'>報名頁面</a>;
								} else {
									return <div className='ui green disabled button'>報名頁面</div>;
								}
							})()}
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
						<span>我發起的活動</span>
					</h1>

					<div className='ui basic segment'>
						<div className='ui centered cards'>
							{events}
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

export default MyEventsPage;
