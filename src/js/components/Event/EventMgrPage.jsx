import React from 'react';

// Decorators
import { router, flux, i18n } from 'Decorator';

import Header from '../Header.jsx';
import EventMgrMenu from './EventMgrMenu.jsx';
import EventProfile from './EventProfile.jsx';
import StateCheckbox from './StateCheckbox.jsx';

class EventMgrRouter extends React.Component {

	render() {
		if (this.props.category == 'profile')
			return <EventProfile eventId={this.props.eventId}  />

		return <div />;
	}
}

@router
@flux
@i18n
class EventMgrPage extends React.Component {

	render() {
		return (
			<div className='main-page'>
				<Header />
				<div className={'ui basic segment'}>
					<div className='ui hidden divider'></div>
					<div className='ui hidden divider'></div>
					<div className='ui stackable grid'>
						<div className='computer only four wide column'>

							<StateCheckbox eventId={this.props.params.id} />

							<EventMgrMenu eventId={this.props.params.id} category={this.props.params.category} />
						</div>

						<div className='twelve wide computer sixteen wide tablet column'>
							<EventMgrRouter eventId={this.props.params.id} category={this.props.params.category} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EventMgrPage;
