import React from 'react';

// Decorators
import { router, flux, i18n, preAction } from 'Decorator';

@router
@flux
@i18n
@preAction((handle) => {
	handle.doAction('Event.fetch', handle.props.eventId);
})
class StateCheckbox extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			event: context.flux.getState('Event'),
			checking: false
		};
	}

	componentWillMount() {
		this.flux.on('state.Event', this.flux.bindListener(this.onChange));
	}

	componentDidMount() {
		var self = this;

		// Built-in registration
		$(this.refs.checkbox).checkbox({
			onChecked: function() {
				self.setState({
					checking: true
				});

				self.flux.dispatch('action.Event.setAvailable', self.props.eventId, true);
			},
			onUnchecked: function() {
				self.setState({
					checking: true 
				});

				self.flux.dispatch('action.Event.setAvailable', self.props.eventId, false);
			}
		});
	}

	componentWillUnmount() {
		this.flux.off('state.Event', this.onChange);
	}

	onChange = () => {
		var event = this.flux.getState('Event');

		this.setState({
			event: event,
			checking: false
		});
	}

	render() {
		return (
			<div className={'ui secondary' + (this.state.event.available ? 'green' : 'grey') +  ' clearing segment'}>

				<div className={'ui ' + (this.state.checking ? 'active' : '') + ' dimmer'}>
					<div className='ui loader'></div>
				</div>

				<div ref='checkbox' className='ui toggle checkbox'>
					<input type='checkbox' defaultChecked={this.state.event.available} />
					<label>開放報名</label>
				</div>
			</div>
		);
	}
}

export default StateCheckbox;
