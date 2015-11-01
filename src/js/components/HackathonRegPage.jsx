import React from 'react';
import I18n from 'Extension/I18n.jsx';

// Components
import Header from './Header.jsx';

// Decorators
import { flux } from 'Decorator';

@flux
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

					<div className='ui two column centered stackable grid'>
						<div className='column'>
							<h1 className='ui header'>
								<i className='sign in icon' />
								<div className='content'><I18n sign='sign_in.header'>Sign In</I18n></div>
							</h1>

							<div className={'ui basic segment'}>

								<div className='ui form'>

									<div className={fieldClass}>
										<div className={'ui left icon input'}>
											<i className={'user icon'} />
											<input type='text' ref='email' name='email' placeholder={I18n.getMessage('sign_in.email', 'E-mail address')} autoFocus={true} />
										</div>
									</div>
									<div className={fieldClass}>
										<div className={'ui left icon input'}>
											<i className={'lock icon'} />
											<input type='password' ref='password' name='password' placeholder={I18n.getMessage('sign_in.password', 'Password')} onKeyDown={this.onKeyDown} />
										</div>
									</div>
									<div className='field'>
										<button className='ui teal button' onClick={this.register}><I18n sign='sign_in.submit_button'>Register</I18n></button>
									</div>
								</div>
							</div>

							<div className='ui horizontal divider header'><I18n sign='sign_in.or_login_with'>Or Login With</I18n></div>

							<div className={'ui center aligned basic segment'}>
								<div className='ui buttons'>
									<a href='/auth/facebook' className='ui facebook icon button'>
										<i className='facebook icon' />
									</a>
									<a href='/auth/github' className='ui github icon button'>
										<i className='github icon' />
									</a>
									<a href='/auth/google' className='ui google plus icon button'>
										<i className='google plus icon' />
									</a>
									<a href='/auth/linkedin' className='ui linkedin icon button'>
										<i className='linkedin icon' />
									</a>
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
