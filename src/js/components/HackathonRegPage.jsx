import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import 'External/datepicker';

import I18n from 'Extension/I18n.jsx';
import Loader from 'Extension/Loader.jsx';

// Components
import Header from './Header.jsx';

// Decorators
import { flux, page, i18n, loader } from 'Decorator';

class RegisteredPage extends React.Component {

	render() {
		return (
			<div className='main-page'>
				<Header />
				<div className={'ui basic center aligned padded segment'}>
					<div className='ui hidden divider'></div>
					<div className='ui hidden divider'></div>

					<div className='ui two column centered stackable grid'>
						<div className='column'>
							<h1 className='ui green center aligned icon header'>
								<i className='check circle icon' />
								<div className='content'>
									<I18n sign='hackathon_reg_page.success_header'>Register Successfully!</I18n>
								</div>
							</h1>

							<div className='ui segment'>
								<div className='ui teal big ribbon label'>
									<div className='content'>{this.props.data.name}</div>
								</div>
								<div className='ui big relaxed list'>
									<div className='item'>
										<i className='calendar icon' />
										<div className='content'>{this.props.data.startdate}</div>
									</div>
									<div className='item'>
										<i className='marker icon' />
										<div className='content'>
											<div className='header'>{this.props.data.loc}</div>
											<div className='description'>{this.props.data.address}</div>
										</div>
									</div>
								</div>

								<div className='ui green basic segment'>
									{this.props.data.desc}
								</div>

							</div>

							<Link to='/HackathonMap'>
								<div className='ui green right floated right labeled icon button'>
									<i className='right arrow icon' />
									<I18n sign='hackathon_reg_page.backtomap'>Back to Hackathon Map</I18n>
								</div>
							</Link>

						</div>

					</div>

				</div>
			</div>
		);
	}
}

@flux
@i18n
@page((handle) => {
	return {
		title: handle.i18n.getFmtMessage('hackathon_reg_page.title', '%s | Register Your Hackathon', handle.flux.getState('Service').name)
	};
})
@loader
class HackathonRegPage extends React.Component {

	constructor(props, context) {
		super();

		var win = context.flux.getState('Window');
		this.state = {
			winWidth: win.width,
			winHeight: win.height,
			geocoder: null,
			dategrange: null,
			registered: {}
		};
	}

	componentWillMount() {
		this.flux.on('state.Window', this.flux.bindListener(this.updateDimensions));
		this.flux.on('state.HackathonMap', this.flux.bindListener(this.onHackathonMapChanged));
	}

	componentDidMount() {

		// Initializing Geocoder API
		this.loader.script('https://maps.google.com/maps/api/js?sensor=true', function() {
			this.state.geocoder = new google.maps.Geocoder();
		}.bind(this));

		// Initializing date range input box
		this.state.daterange = new Kalendae.Input(this.refs.daterange, {
			months: 2,
			mode: 'range',
			selected: [ window.moment(), window.moment().add(1, 'days') ]
		});

		// Initializing form verification
		$(this.refs.form).form({
			keyboardShortcuts: false,
			inline: true,
			onSuccess: function() {
				this.register();
			}.bind(this),
			fields: {
				name: {
					identifier: 'name',
			        rules: [
						{
							type: 'empty',
							prompt: 'Please enter a event name'
						}
					]
				},
				desc: {
					identifier: 'desc',
			        rules: [
						{
							type: 'empty',
							prompt: 'Please describe your event'
						}
					]
				},
				daterange: {
					identifier: 'daterange',
			        rules: [
						{
							type: 'empty',
							prompt: 'Please pick valid date'
						}
					]
				},
				location: {
					identifier: 'location',
			        rules: [
						{
							type: 'empty',
							prompt: 'Please describe your event location'
						}
					]
				},
				address: {
					identifier: 'address',
			        rules: [
						{
							type: 'empty',
							prompt: 'Please enter address'
						}
					]
				},
				registration: {
					identifier: 'registration',
			        rules: [
						{
							type: 'url',
							prompt: 'Please enter valid registration URL'
						}
					]
				},
				website: {
					identifier: 'website',
					optional: true,
			        rules: [
						{
							type: 'url',
							prompt: 'Please enter valid URL'
						}
					]
				}
			}
		});
	}

	componentWillUnmount() {
		this.flux.off('state.Window', this.updateDimensions);
		this.flux.off('state.HackathonMap', this.onHackathonMapChanged);
	}

	updateDimensions = () => {
		var win = this.flux.getState('Window');
		this.setState({
			winWidth: win.width,
			winHeight: win.height
		});
	}

	onHackathonMapChanged = () => {
		var store = this.flux.getState('HackathonMap');

		this.setState({
			registered: store.registered
		});
	}

	verify = () => {
		$(this.refs.form).form('validate form');
	}

	register = () => {
		var name = this.refs.name.value;
		var desc = this.refs.desc.value;
		var loc = this.refs.location.value;
		var address = this.refs.address.value;
		var registration = this.refs.registration.value;
		var website = this.refs.website.value;

		// Getting date range
		var dateRange = [];
		var dates = this.state.daterange.getSelectedAsDates();
		if (dates.length) {
			dates.forEach(function(date, index) {
				dateRange.push(date.getTime());
			});
		}

		if (this.state.geocoder) {

			// Translate address to latlng
			this.state.geocoder.geocode({ address: address }, function (results, status) {
				if (status != google.maps.GeocoderStatus.OK) {
					return;
				}

				this.flux.dispatch('action.HackathonMap.register', {
					name: name,
					desc: desc,
					daterange: dateRange,
					loc: loc,
					address: address,
					registration: registration,
					website: website,
					latlng: [
						results[0].geometry.location.lat(),
						results[0].geometry.location.lng()
					]
				});
			}.bind(this));
		}
	}

	render() {
		var fieldClass = 'field';

		if (Object.keys(this.state.registered).length) {
			return <RegisteredPage data={this.state.registered} />;
		}

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
									<div className='sub header'><I18n sign='hackathon_reg.subheader'>Hey Organizer, submit your event now!</I18n></div>
								</div>
							</h1>

							<div ref='form' className={'ui form segment'}>

									<div className='ui red ribbon label'><I18n sign='hackathon_reg.name'>Hackathon Name or Topic</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'idea icon'} />
											<input type='text' ref='name' name='name' placeholder={this.i18n.getMessage('hackathon_reg.name_sample', 'Hackathon Taiwan 100th')} autoFocus={true} />
										</div>
									</div>

									<div className='ui pink ribbon label'><I18n sign='hackathon_reg.description'>Description</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<textarea ref='desc' name='desc' placeholder={this.i18n.getMessage('hackathon_reg.description_sample', 'The best hackathon we ever seen before in Taiwan')} />
									</div>

									<div className='ui blue ribbon label'><I18n sign='hackathon_reg.dateofevent'>Date of Event</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'calendar icon'} />
											<input type='daterange' ref='daterange' name='daterange' />
										</div>
									</div>

									<div className='ui teal ribbon label'><I18n sign='hackathon_reg.location'>Describe the Event Location</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'marker icon'} />
											<input type='text'
												ref='location'
												name='location'
												placeholder={this.i18n.getMessage('hackathon_reg.location_sample', 'Taiwan Land Development Building (nearby MRT Yuanshan)')} />
										</div>
									</div>

									<div className='ui teal ribbon label'><I18n sign='hackathon_reg.address'>Event Address</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'paw icon'} />
											<input type='text'
												ref='address'
												name='address'
												placeholder={this.i18n.getMessage('hackathon_reg.address_sample', 'No. 232, Sec. 3, Chengde Rd., Datong Dist., Taipei City, Taiwan')} />
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

									<div className='ui teal button' onClick={this.verify}><I18n sign='hackathon_reg.submit_button'>Register</I18n></div>

							</div>

						</div>

					</div>

				</div>
			</div>
		);
	}
}

export default HackathonRegPage;
