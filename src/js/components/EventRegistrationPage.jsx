import React from 'react';
import ReactDOM from 'react-dom';

// Components
import I18n from 'Extension/I18n.jsx';
import Header from './Header.jsx';
import EventRegistrationForm from './EventRegistrationForm.jsx';
import EventRegistrationDone from './EventRegistrationDone.jsx';

// Decorators
import { flux, page, i18n, loader, preAction } from 'Decorator';

@flux
@preAction((handle) => {
	handle.doAction('Event.fetch', handle.props.params.id);
})
@page((handle) => {
	return {
		title: handle.i18n.getFmtMessage('hackathon_reg_page.title', '%s | Registration', handle.flux.getState('Event').name)
	};
})
@i18n
class EventRegistrationPage extends React.Component {

	constructor(props, context) {
		super();

		this.state = {
			done: context.flux.getState('EventRegistration').done
		};
	}

	componentWillMount() {
		this.flux.on('state.EventRegistration', this.flux.bindListener(this.onChange));
	}

	componentDidMount() {
		$(this.refs.steps).sticky({
			offset: 100,
			context: '#content'
		});
	}

	componentWillUnmount() {
		this.flux.dispatch('action.EventRegistration.clear');

		this.flux.off('state.EventRegistration', this.onChange);
	}

	onChange = () => {
		$('html, body').scrollTop(0);

		this.setState({
			done: this.flux.getState('EventRegistration').done
		});
	}

	render() {
		var event = this.flux.getState('Event');
		return (
			<div className='main-page'>
				<Header ref='header' title={this.i18n.getFmtMessage('event_registration_page.title', '%s | Registration', this.flux.getState('Event').name)} />
				<div className='ui hidden divider'></div>
				<div className='ui hidden divider'></div>

				<div id='content' className='ui centered grid basic segment register'>

					<div className='ten wide computer column'>
						{(() => {
							if (!this.state.done) {
								return <EventRegistrationForm eventId={this.props.params.id} />;
							} else {
								return <EventRegistrationDone eventId={this.props.params.id} />;
							}
						})()}
					</div>
				</div>
			</div>
		);
	}
}

export default EventRegistrationPage;
