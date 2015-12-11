import React from 'react';
import ReactDOM from 'react-dom';

// Components
import I18n from 'Extension/I18n.jsx';
import { Link } from 'react-router';

// Decorators
import { flux, page, i18n, loader, preAction } from 'Decorator';

@flux
@i18n
class EventRegistrationDone extends React.Component {

	render() {

		var event = this.flux.getState('Event');
		var ticket = this.flux.getState('EventRegistration');

		return (
			<div className='ui center aligned padded raised segment'>
				<h1 className='ui green inverted icon header'>
					<i className='check icon' />
					<div className='content'>
					報名成功！
					</div>
				</h1>

				<div className='ui center aligned basic segment'>
					<div className='ui grey statistic'>
						<div className='value'>{ticket.number}</div>
						<div className='label'>報名序號</div>
					</div>

					<h2>{event.name}</h2>
				</div>

				<div className='ui left aligned padded basic segment'>
					<div className='ui success message'>
						<div className='header'>這是你已經成功報名的活動詳細資訊！請務必準時到場！</div>
					</div>

					<div className='ui large list'>
						<div className='item'>
							<i className='calendar icon' />
							<div className='content'>
								活動時間：
								{event.startdate}
							</div>
						</div>

						<div className='item'>
							<i className='marker icon' />
							<div className='content'>
								<div className='header'>
									活動地點：
									{event.location}
								</div>
								<div className='description'>
									活動地址：
									{event.address}
								</div>
							</div>
						</div>
						<div className='item'>
							<i className='world icon' />
							<div className='content'>
								官方網站：
								<a href={event.website}>{event.website}</a>
							</div>
						</div>
					</div>
				</div>

				<a href={'/event/' + this.props.eventId}>
					<div className='ui green button'>回到活動頁面</div>
				</a>
			</div>
		);
	}
}

export default EventRegistrationDone;
