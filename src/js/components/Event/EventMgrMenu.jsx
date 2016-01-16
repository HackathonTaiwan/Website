import React from 'react';
import { Link } from 'react-router';

// Components
import I18n from 'Extension/I18n.jsx';
import EventProfile from './EventProfile.jsx';

// Decorators
import { router, flux, i18n } from 'Decorator';

@router
@flux
@i18n
class EventMgrMenu extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			error: false
		};
	}

	componentWillMount() {
		this.flux.on('state.User', this.flux.bindListener(this.onChange));
	}

	componentWillUnmount() {
		this.flux.off('state.User', this.onChange);
	}

	componentDidUpdate() {
//		$(this.refs.sidebar.getDOMNode()).sidebar();
	}

	onChange = () => {
	};

	render() {

		return (
			<div className='ui right floated teal secondary vertical pointing menu'>
				<Link to={'/self/event/' + this.props.eventId + '/profile'} activeClassName='active' className='item'>
					<I18n sign='event_profile.header'>Profile</I18n>
				</Link>
			</div>
		);
	}
}

export default EventMgrMenu;
