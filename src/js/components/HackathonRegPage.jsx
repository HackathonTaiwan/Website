import React from 'react';
import I18n from 'Extension/I18n.jsx';

//import DateRangePicker from 'External/daterangepicker';
import Loader from 'Extension/Loader.jsx';

// Components
import Header from './Header.jsx';

// Decorators
import { flux, i18n } from 'Decorator';

@flux
@i18n
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

	componmentDidMount() {
		//Loader.script('daterangepicker');


//		$('input[type="daterange"]').daterangepicker();
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

	onKeyDown = () => {
	}

	register = () => {
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
								<i className='sign in icon' />
								<div className='content'>
									<I18n sign='hackathon_reg.header'>Register Your Hackathon</I18n>
									<div className='sub header'>Hey Organizer, submit your event now!</div>
								</div>
							</h1>

							<div className={'ui basic segment'}>

								<div className='ui form'>

									<div className={fieldClass}>
										<div className={'ui left icon input'}>
											<i className={'user icon'} />
											<input type='text' ref='name' name='name' placeholder={this.i18n.getMessage('hackathon_reg.name', 'Name')} autoFocus={true} />
										</div>
									</div>
									<div className={fieldClass}>
										<textarea ref='desc' name='desc' placeholder={this.i18n.getMessage('hackathon_reg', 'Description')} />
									</div>
									<div className={fieldClass}>
										<div className={'ui left icon input'}>
											<i className={'info icon'} />
											<input type='daterange' ref='startdate' name='startdate' />
										</div>
									</div>
									<div className={fieldClass}>
										<div className={'ui left icon input'}>
											<i className={'info icon'} />
											<input type='text' ref='loc_desc' name='loc_desc' placeholder={this.i18n.getMessage('hackathon_reg.location', 'Event Location')} />
										</div>
									</div>
									<div className={fieldClass}>
										<div className={'ui left icon input'}>
											<i className={'info icon'} />
											<input type='text' ref='address' name='address' placeholder={this.i18n.getMessage('hackathon_reg.address', 'Event Address')} />
										</div>
									</div>
									<div className={fieldClass}>
										<div className={'ui left icon input'}>
											<i className={'info icon'} />
											<input type='text' ref='registration' name='registration' placeholder={this.i18n.getMessage('hackathon_reg.registration', 'Registration Page')} />
										</div>
									</div>
									<div className={fieldClass}>
										<div className={'ui left icon input'}>
											<i className={'info icon'} />
											<input type='text' ref='website' name='website' placeholder={this.i18n.getMessage('hackathon_reg.website', 'Website')} />
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
