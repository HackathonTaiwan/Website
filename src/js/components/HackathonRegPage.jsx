import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import 'External/datepicker';

import I18n from 'Extension/I18n.jsx';
import Loader from 'Extension/Loader.jsx';

// Components
import Header from './Header.jsx';
import EventRegistrationSettings from './EventRegistrationSettings.jsx';

// Decorators
import { flux, page, i18n, loader } from 'Decorator';

class RegisteredPage extends React.Component {

	render() {
		return (
			<div className='main-page'>
				<Header />
				<div className={'ui basic center aligned padded segment register'}>
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

							<div className='ui segment shadow'>

								{(() => {
									if (this.props.enabledReg) {
										return (
											<div className='ui yellow icon message'>
												<i className='warning sign icon' />
												<div className='content'>
													<div className='header'>注意！此活動還不會被顯示在黑客松地圖上！</div>
													<p>您的活動雖然已經登記成功，但因為「尚未對外開放報名」，所以還不會顯示在黑客松地圖上。若想要對外開放報名，可以進入活動管理頁面進行開放報名。</p>
													<a href={'/self/event/' + this.props.data._id} className='ui green button'><i className='options icon' />管理我的活動</a>
												</div>
											</div>
										);
									}
								})()}

								<div className='ui teal big ribbon label'>
									<div className='content'>{this.props.data.name}</div>
								</div>
								<div className='ui large relaxed list'>
									<div className='item'>
										<i className='calendar icon' />
										<div className='content'>{window.moment(this.props.data.startdate).format('YYYY/MM/DD')}</div>
									</div>
									<div className='item'>
										<i className='marker icon' />
										<div className='content'>
											<div className='header'>{this.props.data.location}</div>
											<div className='description'>{this.props.data.address}</div>
										</div>
									</div>
									<div className='item'>
										<i className='world icon' />
										<div className='content'>{this.props.data.website}</div>
									</div>
									{(() => {
										if (this.props.enabledReg) {
											return (
												<div className='item'>
													<i className='anchor icon' />
													<div className='content'>
														<div>報名上限人數：{this.props.data.quota}</div>
														<div>報名截止時間：{window.moment(this.props.data.deadline).format('YYYY/MM/DD HH:mm')}</div>
													</div>
												</div>
											)
										} else {
											return (
												<div className='item'>
													<i className='anchor icon' />
													<div className='content'>{this.props.data.registration}</div>
												</div>
											);
										}
									})()}
								</div>

								<div className='ui green basic segment' dangerouslySetInnerHTML={{ __html: this.props.data.desc.replace(/\n/g,'<br />')}}>
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

class ConfirmPage extends React.Component {

	render() {
		return (
			<div className='main-page'>
				<Header />
				<div className={'ui basic center aligned padded segment register'}>
					<div className='ui hidden divider'></div>
					<div className='ui hidden divider'></div>

					<div className='ui two column centered stackable grid'>
						<div className='column'>
							<h1 className='ui center aligned icon header'>
								<i className='warning circle icon' />
								<div className='content'>
									<I18n sign='hackathon_reg_page.confirm_header'>Confirm Your Event Details</I18n>
								</div>
							</h1>

							<div className='ui segment shadow'>
								<div className='ui teal big ribbon label'>
									<div className='content'>{this.props.data.name}</div>
								</div>
								<div className='ui large relaxed list'>
									<div className='item'>
										<i className='calendar icon' />
										<div className='content'>{window.moment(this.props.data.startdate).format('YYYY/MM/DD')}</div>
									</div>
									<div className='item'>
										<i className='marker icon' />
										<div className='content'>
											<div className='header'>{this.props.data.loc}</div>
											<div className='description'>{this.props.data.address}</div>
										</div>
									</div>
									<div className='item'>
										<i className='world icon' />
										<div className='content'>{this.props.data.website}</div>
									</div>
									{(() => {
										if (this.props.enabledReg) {
											return (
												<div className='item'>
													<i className='anchor icon' />
													<div className='content'>
														<div>報名上限人數：{this.props.data.quota}</div>
														<div>報名截止時間：{window.moment(this.props.data.deadline).format('YYYY/MM/DD HH:mm')}</div>
													</div>
												</div>
											)
										} else {
											return (
												<div className='item'>
													<i className='anchor icon' />
													<div className='content'>{this.props.data.registration}</div>
												</div>
											);
										}
									})()}
								</div>

								<div className='ui green basic segment' dangerouslySetInnerHTML={{ __html: this.props.data.desc.replace(/\n/g,'<br />')}}>
								</div>

								<div className='ui clearing basic segment'>
									<div className='ui red left floated left labeled icon button' onClick={this.props.edit}>
										<i className='edit icon' />
										<I18n sign='hackathon_reg_page.edit_button'>Edit</I18n>
									</div>

									<div className='ui green right floated right labeled icon button' onClick={this.props.register}>
										<i className='check icon' />
										<I18n sign='hackathon_reg_page.confirm_button'>Confirm</I18n>
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
			user: context.flux.getState('User'),
			winWidth: win.width,
			winHeight: win.height,
			geocoder: null,
			daterange: null,
			registered: {},
			fields: {
				name: '',
				desc: '',
				daterange: '',
				loc: '',
				address: '',
				registration: '',
				website: '',
				latlng: [],
				quota: 100,
				deadline: ''
			},
			enabledReg: false,
			confirm: false
		};
	}

	componentWillMount() {
		this.flux.on('state.User', this.flux.bindListener(this.onChange));
		this.flux.on('state.Window', this.flux.bindListener(this.updateDimensions));
		this.flux.on('state.HackathonMap', this.flux.bindListener(this.onHackathonMapChanged));
		this.flux.on('state.EventRegister', this.flux.bindListener(this.onEventRegisterChanged));
	}

	componentDidMount() {
		var self = this;

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

		this.state.fields.daterange = this.state.daterange.getSelected();

		// Built-in registration
		$(this.refs.builtin_registration).checkbox({
			onChecked: function() {
				self.setState({
					enabledReg: true
				});
			},
			onUnchecked: function() {
				self.setState({
					enabledReg: false
				});
			}
		});

		// Built-in registration
		$(this.refs.msg_builtin_registration).checkbox({
			onChecked: function() {
				self.setState({
					enabledReg: true
				});
			},
			onUnchecked: function() {
				self.setState({
					enabledReg: false
				});
			}
		});
	}

	componentWillUnmount() {
		this.flux.off('state.User', this.onChange);
		this.flux.off('state.Window', this.updateDimensions);
		this.flux.off('state.HackathonMap', this.onHackathonMapChanged);
		this.flux.off('state.EventRegister', this.onEventRegisterChanged);
	}

	initializeForm = () => {

		var fields = {
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
		};

		if (this.state.enabledReg) {

			this.state.fields.quota = this.refs.registration.quota;
			this.state.fields.deadline = this.refs.registration.deadline;

			// Using built-in registration
			fields['quota'] = {
				identifier: 'quota',
				rules: [
					{
						type: 'minCount[1]',
						prompt: 'You have to set a valid number'
					}
				]
			};

			fields['deadline'] = {
				identifier: 'deadline',
				rules: [
					{
						type: 'empty',
						prompt: 'Please pick valid date'
					}
				]
			};
		} else {
			fields['registration'] = {
				identifier: 'registration',
				rules: [
					{
						type: 'url',
						prompt: 'Please enter valid registration URL'
					}
				]
			};
		}

		// Initializing form verification
		$(this.refs.form).form({
			keyboardShortcuts: false,
			inline: true,
			onSuccess: function() {
				this.confirm();
			}.bind(this),
			fields: fields
		});
	};

	onChange = () => {

		this.setState({
			user: this.flux.getState('User')
		});
	};

	updateDimensions = () => {
		var win = this.flux.getState('Window');
		this.setState({
			winWidth: win.width,
			winHeight: win.height
		});
	};

	onHackathonMapChanged = () => {
		var store = this.flux.getState('HackathonMap');

		this.setState({
			registered: store.registered
		});
	};

	onEventRegisterChanged = () => {

		var eventRegister = this.flux.getState('EventRegister');

		if (eventRegister.success) {
			this.setState({
				registered: eventRegister.data
			});
		}
	};

	verify = () => {

		this.initializeForm();

		$(this.refs.form).form('validate form');
	};

	register = () => {

		var $button = $(this.refs.submit_button);
		if ($button.hasClass('disabled'))
			return;

		$button.addClass('loading disabled');

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
			this.state.geocoder.geocode({ address: this.state.fields.address }, function (results, status) {
				if (status != google.maps.GeocoderStatus.OK) {
					return;
				}

				this.flux.dispatch('action.EventRegister.create', {
					name: this.state.fields.name,
					desc: this.state.fields.desc,
					daterange: dateRange,
					loc: this.state.fields.loc,
					address: this.state.fields.address,
					quota: this.state.fields.quota,
					deadline: this.state.fields.deadline,
					website: this.state.fields.website,
					registration: !this.state.enabledReg ? this.state.fields.registration : '',
					latlng: [
						results[0].geometry.location.lat(),
						results[0].geometry.location.lng()
					]
				});
/*
				if (this.state.enabledReg) {
				} else {
					this.flux.dispatch('action.HackathonMap.register', {
						name: this.state.fields.name,
						desc: this.state.fields.desc,
						daterange: dateRange,
						loc: this.state.fields.loc,
						address: this.state.fields.address,
						registration: this.state.fields.registration,
						website: this.state.fields.website,
						latlng: [
							results[0].geometry.location.lat(),
							results[0].geometry.location.lng()
						]
					});
				}
*/
			}.bind(this));
		}
	};

	confirm = () => {
		$('html, body').scrollTop(0);

		this.setState({
			confirm: true
		});
	};

	edit = () => {
		this.setState({
			confirm: false
		});
	};

	handleChange = () => {
		var name = this.refs.name.value;
		var desc = this.refs.desc.value;
		var loc = this.refs.location.value;
		var address = this.refs.address.value;
		var website = this.refs.website.value;
		var daterange = this.refs.daterange.value;

		var fields = {
			name: name,
			desc: desc,
			daterange: daterange,
			loc: loc,
			address: address,
			website: website,
			quota: this.state.fields.quota,
			deadline: this.state.fields.deadline,
			registration: this.state.fields.registration
		};

		// Using built-in registration
		if (this.state.enabledReg) {
			fields['quota'] = this.refs.registration.quota;
			fields['deadline'] = this.refs.registration.deadline;
		} else {
			fields['registration'] = this.refs.registration.value;
		}

		this.setState({
			fields: fields
		});
	};

	render() {
		var fieldClass = 'field';

		if (Object.keys(this.state.registered).length) {
			return <RegisteredPage data={this.state.registered} enabledReg={this.state.enabledReg} />;
		}

		if (this.state.confirm) {
			return <ConfirmPage data={this.state.fields} enabledReg={this.state.enabledReg} edit={this.edit} register={this.register} />;
		}

		return (
			<div className='main-page'>
				<Header />
				<div className={'ui basic center aligned padded segment register'}>
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

							<div ref='form' className={'ui form segment shadow'}>

									{(() => {
										if (!this.state.user.permissions.admin.access)
											return;

										return (
											<div className='ui olive icon message'>
												<i className='star icon' />
												<div className='content'>
													<div className='header'>新功能上線！</div>
													<p>你現在可以開始使用黑客松台灣提供的「報名系統」，為您的活動開放報名。</p>
													<div className='ui toggle checkbox' ref='msg_builtin_registration'>
														<input type='checkbox' checked={this.state.enabledReg} />
														<label>
															<span>關閉/啟用</span>
														</label>
													</div>
												</div>
											</div>
										);
									})()}

									<div className='ui red ribbon label'><I18n sign='hackathon_reg.name'>Hackathon Name or Topic</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui input'}>
											<input
												type='text'
												ref='name'
												name='name'
												placeholder={this.i18n.getMessage('hackathon_reg.name_sample', 'Hackathon Taiwan 100th')}
												value={this.state.fields.name}
												onChange={this.handleChange}
												onBlur={this.handleChange}
												autoFocus={true} />
										</div>
									</div>

									<div className='ui orange ribbon label'><I18n sign='hackathon_reg.description'>Description</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<textarea
											ref='desc'
											name='desc'
											value={this.state.fields.desc}
											onChange={this.handleChange}
											onBlur={this.handleChange}
											placeholder={this.i18n.getMessage('hackathon_reg.description_sample', 'The best hackathon we ever seen before in Taiwan')} />
									</div>

									<div className='ui green ribbon label'><I18n sign='hackathon_reg.dateofevent'>Date of Event</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'calendar icon'} />
											<input
												type='daterange'
												ref='daterange'
												value={this.state.fields.daterange}
												onChange={this.handleChange}
												onBlur={this.handleChange}
												name='daterange' />
										</div>
									</div>

									<div className='ui blue ribbon label'><I18n sign='hackathon_reg.location'>Describe the Event Location</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'marker icon'} />
											<input
												type='text'
												ref='location'
												name='location'
												value={this.state.fields.loc}
												onChange={this.handleChange}
												onBlur={this.handleChange}
												placeholder={this.i18n.getMessage('hackathon_reg.location_sample', 'Taiwan Land Development Building (nearby MRT Yuanshan)')} />
										</div>
									</div>

									<div className='ui blue ribbon label'><I18n sign='hackathon_reg.address'>Event Address</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'road icon'} />
											<input
												type='text'
												ref='address'
												name='address'
												value={this.state.fields.address}
												onChange={this.handleChange}
												onBlur={this.handleChange}
												placeholder={this.i18n.getMessage('hackathon_reg.address_sample', 'No. 232, Sec. 3, Chengde Rd., Datong Dist., Taipei City, Taiwan')} />
										</div>
									</div>

									<div className='ui yellow ribbon label'><I18n sign='hackathon_reg.registration'>Registration Page</I18n></div>

									{(() => {
										if (!this.state.user.permissions.admin.access)
											return;

										return (
											<div className='ui checkbox' ref='builtin_registration'>
												<input type='checkbox' checked={this.state.enabledReg} />
												<label>
													<span>使用內建的活動報名機制</span>
													<div className='ui left pointing red mini basic label'>新功能！</div>
												</label>
											</div>
										);
									})()}

									{(() => {

										if (this.state.enabledReg) {
											var dates = this.state.daterange.getSelectedRaw();
											return <EventRegistrationSettings ref='registration' defaultDeadline={dates[0].subtract({ days: 1 })} onChange={this.handleChange} />;
										} else {
											return (
												<div className={fieldClass}>
													<label></label>
													<div className={'ui left icon input'}>
														<i className={'flag icon'} />
														<input
															type='text'
															ref='registration'
															name='registration'
															value={this.state.fields.registration}
															onChange={this.handleChange}
															onBlur={this.handleChange}
															placeholder='https://hackathon.tw/registration' />
													</div>
												</div>
											);
										}
									})()}

									<div className='ui brown ribbon label'><I18n sign='hackathon_reg.website'>Official Website</I18n></div>
									<div className={fieldClass}>
										<label></label>
										<div className={'ui left icon input'}>
											<i className={'external desktop icon'} />
											<input
												type='text'
												ref='website'
												value={this.state.fields.website}
												onChange={this.handleChange}
												onBlur={this.handleChange}
												placeholder='http://hackathon.tw/' />
										</div>
									</div>

									<div className='ui teal button' ref='submit_button' onClick={this.verify}><I18n sign='hackathon_reg.submit_button'>Register</I18n></div>

							</div>

						</div>

					</div>

				</div>
			</div>
		);
	}
}

export default HackathonRegPage;
