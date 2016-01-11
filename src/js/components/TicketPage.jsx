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

class RefundConfirm extends React.Component {

	componentDidMount() {

		$(this.refs.component).modal({
			closable: false,
			blurring: true,
			onApprove: function() {
				this.props.onApprove(this.refs.reason.value);
				return false;
			}.bind(this)
		});
	}

	componentWillUnmount() {
		$(this.refs.component).modal('hide');
	}

	open = () => {
		$(this.refs.component).modal('show');
	}

	render() {
		return (
			<div ref='component' className='ui small basic modal'>
				<div className='ui icon header'>
					<i className='minus square icon' />
					您想取消報名嗎？
				</div>
				<div className='content'>
					<div className='description'>
						<div className='ui inverted form'>
							<div className='field'>
								<label>請務必讓我們知道取消報名的原因：</label>
								<textarea ref='reason'></textarea>
							</div>
						</div>
					</div>
				</div>
				<div className='actions'>
					<div className='ui green cancel inverted button'>
						<i className='check circle icon' />
						仍然要參加
					</div>
					<div className='ui red basic ok inverted button'>
						<i className='remove circle icon' />
						立即取消報名
					</div>
				</div>
			</div>
		);
	}
}

@router
@flux
@preAction((handle) => {
	handle.doAction('Ticket.fetch', handle.props.params.id);
})
@page((handle) => {
	return {
		title: handle.i18n.getFmtMessage('ticket_page.title', '%s', handle.flux.getState('Ticket').event.name)
	};
})
class TicketPage extends React.Component {
	constructor(props, context) {
		super();

		this.state = {
			'scroll': 'scroll-off',
			ticket: context.flux.getState('Ticket')
		}
	}

	componentWillMount() {

		this.flux.on('state.Ticket', this.flux.bindListener(this.onChange));
	}

	componentDidMount() {
		$(this.refs.progress).progress();
	}

	componentWillUnmount() {
		this.flux.off('state.Ticket', this.onChange);
	}

	onChange = () => {
		var ticket = this.flux.getState('Ticket');

		// Redirect to event page
		if (ticket.refunded) {
			this.history.pushState(null, '/event/' + ticket.event._id);
			return;
		}

		this.setState({
			ticket: ticket
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

	refund = () => {
		this.refs.refundConfirm.open();
	}

	handleRefund = (reason) => {
		this.flux.dispatch('action.Ticket.refund', this.state.ticket._id, reason);
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

		var ticket = this.flux.getState('Ticket');

		return (
			<div className='main-page'>
				<Header ref='header' autoTransform={true} />

				<RefundConfirm ref='refundConfirm' onApprove={this.handleRefund} />

				<div className={'ui basic center aligned segment landing-page-header'} style={bannerStyle}>
					<div className='ui basic segment' style={{ position: 'absolute', bottom: 0, width: '96%' }}>
						<a href={'/event/' + ticket.event._id}>
							<button className={'big ui inverted animated fade button'}>
								<div className='visible content'>
									<I18n sign='event.register_button1'>查看更多活動資訊</I18n>
								</div>
								<div className='hidden content'>
									<I18n sign='event.register_button2'>關於本活動</I18n>
								</div>
							</button>
						</a>

						<button className={'big ui red inverted animated fade button'} onClick={this.refund}>
							<div className='visible content'>
								<i className='remove circle icon' />
								<I18n sign='event.register_button1'>取消報名</I18n>
							</div>
							<div className='hidden content'>
								<I18n sign='event.register_button2'>決定不參加</I18n>
							</div>
						</button>
					</div>
				</div>

				<div className={'ui hidden divider'} />

				<div className={'ui basic center aligned padded segment'}>
					<h1 className={'ui header'} style={{ fontSize: '40px' }}>
						<span>您已經報名了此活動</span>
					</h1>
					<h1 className={'ui inverted header'}>
						<span>{ticket.event.name}</span>
					</h1>
					<div className='ui centered stackable grid'>
						<div className='twelve wide column' style={style}>
							<div className='ui orange segment'>
								<div className='ui list'>
									<div className='item'>
										<i className='bookmark icon' />
										<div className='content'>
											{ticket.event.name}
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

							<div className='ui olive segment'>
								<div className='ui dividing header'>您的報名基本資料</div>

								<div className='ui list'>
									<div className='item'>
										<i className='user icon' />
										<div className='content'>
											{ticket.name}
										</div>
									</div>
									<div className='item'>
										<i className='mail icon' />
										<div className='content'>
											{ticket.email}
										</div>
									</div>
									<div className='item'>
										<i className='phone icon' />
										<div className='content'>
											{ticket.phone}
										</div>
									</div>
									<div className='item'>
										<i className='suitcase icon' />
										<div className='content'>
											{ticket.organization}
										</div>
									</div>
								</div>
							</div>

							<div className='ui red segment'>
								<div className='ui dividing header'>活動保險資料</div>

								<div className='ui list'>
									<div className='item'>
										<div className='ui teal big label'>真實姓名</div>
										{ticket.realname}
									</div>
									<div className='item'>
										<div className='ui teal big label'>身分證字號</div>
										{ticket.idno}
									</div>
									<div className='item'>
										<div className='ui teal big label'>出生日期</div>
										{ticket.birthday}
									</div>
								</div>

							</div>
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

export default TicketPage;
