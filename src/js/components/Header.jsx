import React from 'react';
import { Link } from 'react-router';
import I18n from 'Extension/I18n.jsx';

// Decorators
import { router, flux, i18n, preAction } from 'Decorator';

// Components
import Avatar from './Avatar.jsx';

var logo = require('../../images/logo.png');

@flux
@router
class Header extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			user: this.flux.getState('User'),
			service: this.flux.getState('Service'),
			backgroundColor: 'transparent',
			transparent: false
		};
	}

	componentWillMount = () => {
		this.flux.on('state.User', this.flux.bindListener(this.onChange));
		this.flux.on('state.Service', this.flux.bindListener(this.onChange));
		this.flux.on('state.Window', this.flux.bindListener(this.onWindowUpdated));
	}

	componentWillUnmount = () => {
		this.flux.off('state.User', this.onChange);
		this.flux.off('state.Service', this.onChange);
		this.flux.off('state.Window', this.onWindowUpdated);
	}

	componentDidMount() {

		var component = $(this.refs.component);

		// Enabling dropdown menu
		component.find('.ui.dropdown').dropdown({
			on: 'hover'
		});

		// Auto transform when scrolling
		if (this.props.autoTransform) {

			// Set transparent by default
			this.state.backgroundColor = component.css('backgroundColor');
			this.state.transparent = true;
			component.css({
				backgroundColor: 'rgba(0,0,0,0)',
				boxShadow: '0 7px 7px rgba(0,0,0,0.2)'
			});
		}
	}

	onWindowUpdated = () => {

		if (!this.props.autoTransform)
			return;

		var store = this.flux.getState('Window');
		var component = $(this.refs.component);

		// Change background when scrolling
		if (this.state.transparent) {
			if (store.scrollTop > component.height()) {
				this.state.transparent = false;

				component.animate({
					backgroundColor: this.state.backgroundColor
				}, 400, 'easeOutCubic');
			}
		} else {
			if (store.scrollTop <= component.height()) {
				this.state.transparent = true;

				component.animate({
					backgroundColor: 'rgba(0,0,0,0)',
				}, 400, 'easeOutCubic');
			}
		}
	}

	onChange = () => {

		this.setState({
			user: this.flux.getState('User'),
			service: this.flux.getState('Service')
		});
	}

	render() {

		var loginState;
		if (this.state.user.logined) {
			var adminItem;
			if (this.state.user.permissions.admin) {
				if (this.state.user.permissions.admin.access) {
					adminItem = (
						<Link to='/admin' className='item'>
							<i className='spy icon'></i>
							<I18n sign='header.menu.admin_panel'>Admin Panel</I18n>
						</Link>
					);
				}
			}

			loginState = (
				<div className={'right menu'}>
					<div className='ui dropdown item'>
						<span><Avatar hash={this.state.user.avatar_hash} size={20} /> <span>{this.state.user.name}</span></span>
						<i className='dropdown icon'></i>
						<div className='menu'>
							<Link to='/settings' className='item'>
								<i className='settings icon'></i>
								<I18n sign='header.menu.settings'>Settings</I18n>
							</Link>
							{adminItem}
							<div className='ui fitted divider'></div>
							<a href='/signout' className='item'>
								<i className='sign out icon'></i>
								<I18n sign='header.menu.sign_out'>Sign Out</I18n>
							</a>
						</div>
					</div>
				</div>
			);
		} else {
			loginState = (
				<div className={'right menu sign'}>
					<Link to='/signin'>
						<div className={'item btn'}>
							<i className={'sign in icon'} />
							<I18n sign='header.menu.sign_in'>Sign In</I18n>
						</div>
					</Link>
				</div>
			);
		}

		return (
			<div ref='component' className={'ui top fixed inverted menu nav'}>
				<Link to='/' className={'item'} activeClassName=''>
					<div><img src={ logo } /></div>
				</Link>
				{loginState}
			</div>
		);
	}
};

export default Header;
