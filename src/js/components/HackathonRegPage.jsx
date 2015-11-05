import React from 'react';

import 'External/datepicker';

import I18n from 'Extension/I18n.jsx';
import Loader from 'Extension/Loader.jsx';

// Components
import Header from './Header.jsx';

// Decorators
import { flux, i18n, loader } from 'Decorator';

@flux
@i18n
@loader
class HackathonRegPage extends React.Component {

	constructor(props, context) {
		super();

		var win = context.flux.getState('Window');
		this.state = {
			winWidth: win.width,
			winHeight: win.height
		};
	}

	componentWillMount() {
		this.flux.on('store.Window', this.flux.bindListener(this.updateDimensions));
	}

	componentDidMount() {
		new Kalendae.Input(this.refs.startdate, {
			months: 2,
			mode: 'range',
			selected: [ window.moment(), window.moment().add(1, 'days') ]
		});
	}

	componentWillUnmount() {
		this.flux.off('store.Window', this.updateDimensions);
	}

	updateDimensions = () => {
		var win = this.flux.getState('Window');
		this.setState({
			winWidth: win.width,
			winHeight: win.height
		});
	}

	register = () => {
		var name = this.refs.name.value;
		var desc = this.refs.desc.value;
		var startdate = this.refs.desc.value;
		var loc = this.refs.location.value;
		var address = this.refs.address.value;
		var registration = this.refs.registration.value;
		var website = this.refs.website.value;

		this.flux.dispatch('action.HackathonMap.register', {
			name: name,
			desc: desc,
			startdate: startdate,
			loc: loc,
			address: address,
			registration: registration,
			website: website
		});
	}

	render() {
		var fieldClass = 'field';
		return (
			<div className='main-page'>
				<Header />
				<div className={'ui basic center aligned padded segment'}>
					<div className='ui hidden divider'></div>
					<div className='ui hidden divider'></div>

					<div className='ui two column centered stackable grid'>
						<div className='column'>
							<h1 className='ui header'>
								<i className='send icon' />
								<div className='content'>
									<I18n sign='hackathon_reg.header'>Register Your Hackathon</I18n>
									<div className='sub header'>Hey Organizer, submit your event now!</div>
								</div>
							</h1>

							<div className={'ui segment'}>

								<div className='ui form'>

									<div className='ui red ribbon label'><I18n sign='hackathon_reg.name'>Hackathon Name or Topic</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'idea icon'} />
											<input type='text' ref='name' name='name' placeholder='Hackathon Taiwan 100th' autoFocus={true} />
										</div>
									</div>

									<div className='ui pink ribbon label'><I18n sign='hackathon_reg.description'>Description</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<textarea ref='desc' name='desc' placeholder={this.i18n.getMessage('hackathon_reg.desc_sample', 'The best hackathon we ever seen before in Taiwan')} />
									</div>

									<div className='ui blue ribbon label'>Date of Event</div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'calendar icon'} />
											<input type='daterange' ref='startdate' name='startdate' />
										</div>
									</div>

									<div className='ui teal ribbon label'><I18n sign='hackathon_reg.location'>Describe the Event Location</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'marker icon'} />
											<input type='text' ref='location' name='location' placeholder={this.i18n.getMessage('hackathon_reg.location_sample', 'Taiwan Land Development Building (nearby MRT Yuanshan)')} />
										</div>
									</div>

									<div className='ui teal ribbon label'><I18n sign='hackathon_reg.address'>Event Address</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'paw icon'} />
											<input type='text' ref='address' name='address' placeholder={this.i18n.getMessage('hackathon_reg.address_sample', 'No. 232, Sec. 3, Chengde Rd., Datong Dist., Taipei City, Taiwan')} />
										</div>
									</div>

									<div className='ui yellow ribbon label'><I18n sign='hackathon_reg.registration'>Registration Page</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'flag icon'} />
											<input type='text' ref='registration' name='registration' placeholder='https://hackathon.tw/registration' />
										</div>
									</div>

									<div className='ui olive ribbon label'><I18n sign='hackathon_reg.website'>Official Website</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'external square icon'} />
											<input type='text' ref='website' name='website' placeholder='http://hackathon.tw/' />
										</div>
									</div>
									<div className='field'>
										<button className='ui teal button' onClick={this.register}><I18n sign='hackathon_reg.submit_button'>Register</I18n></button>
									</div>
								</div>
							</div>

						</div>

					</div>

				</div>
			</div>
		);
	}
}

export default HackathonRegPage;
