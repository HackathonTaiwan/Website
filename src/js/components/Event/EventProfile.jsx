import React from 'react';
import I18n from 'Extension/I18n.jsx';

// Decorators
import { router, flux, i18n, preAction } from 'Decorator';

@flux
@i18n
@preAction((handle) => {
	handle.doAction('Event.fetch', handle.props.eventId);
})
//@preAction('User.syncProfile')
class UserProfile extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			event: context.flux.getState('Event')
		};
	}

	componentWillMount() {
		this.flux.on('state.Event', this.flux.bindListener(this.onChange));
	}

	componentDidMount() {
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

	render() {

		return (
			<div className='ui padded basic segment'>
				<div className='ui form'>
					<h1 className='ui header'>
						<div className='content'>
							{this.state.event.name}
						</div>
					</h1>

					<div className='ui hidden divider'></div>

					<div className='ui segments'>
						<div className='ui secondary segment'>
							<h5 className='ui header'>
								<I18n sign='event_profile.quota'>Quota</I18n>
							</h5>
						</div>

						<div className='ui segment'>
							<div className='ui field'>
								{this.state.event.quota} 人（已報名：{this.state.event.registered} 人）
							</div>
							<div className='ui bottom attached green small progress' data-value={this.state.event.registered} data-total={this.state.event.quota}>
								<div className='bar'>
								</div>
							</div>
						</div>
					</div>

					<div className='ui segments'>
						<div className='ui secondary segment'>
							<h5 className='ui header'>
								<I18n sign='event_profile.location'>Location</I18n>
							</h5>
						</div>

						<div className='ui segment'>
							<div className='ui field'>
								<div className='ui label'>Location name</div>
								{this.state.event.location}
							</div>
							<div className='ui field'>
								<div className='ui label'>Address</div>
								{this.state.event.address}
							</div>
						</div>
					</div>

					<div className='ui segments'>
						<div className='ui secondary segment'>
							<h5 className='ui header'>
								<I18n sign='event_profile.desc'>Description</I18n>
							</h5>
						</div>

						<div className='ui segment'>
							{this.state.event.desc}
						</div>
					</div>

				</div>
			</div>
		);
	}
}

export default UserProfile;
