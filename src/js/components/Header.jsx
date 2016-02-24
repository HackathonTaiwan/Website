import React from 'react';
import { Link } from 'react-router';
import I18n from 'Extension/I18n.jsx';

// Decorators
import { router, flux, i18n, preAction } from 'Decorator';

// Components
import LoginState from './LoginState.jsx';

import logo from '../../images/logo.png';

@flux
@router
class Header extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			backgroundColor: 'transparent',
			transparent: false,
			user: context.flux.getState('User'),
			service: context.flux.getState('Service')
		};
	}

	componentWillMount = () => {
		this.flux.on('state.User', this.flux.bindListener(this.onChange));
		this.flux.on('state.Service', this.flux.bindListener(this.onChange));
		this.flux.on('state.Window', this.flux.bindListener(this.onWindowUpdated));
	};

	componentWillUnmount = () => {
		this.flux.off('state.User', this.onChange);
		this.flux.off('state.Service', this.onChange);
		this.flux.off('state.Window', this.onWindowUpdated);
	};

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
				backgroundColor: 'rgba(0,0,0,0)'
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

				component.css({
					backgroundColor: 'rgba(0,0,0,0)',
					boxShadow: '0 7px 7px rgba(0,0,0,0.2)'
				});

				component.animate({
					backgroundColor: this.state.backgroundColor
				}, 400, 'easeOutCubic');
			}
		} else {
			if (store.scrollTop <= component.height()) {
				this.state.transparent = true;

				component.css({
					backgroundColor: 'rgba(0,0,0,0)',
					boxShadow: ''
				});

				component.animate({
					backgroundColor: 'rgba(0,0,0,0)',
				}, 400, 'easeOutCubic');
			}
		}
	};

	onChange = () => {

		this.setState({
			user: this.flux.getState('User'),
			service: this.flux.getState('Service')
		});
	};

	render() {

		return (
			<div ref='component' className={'ui top fixed inverted menu nav'}>
				<Link to='/' className={'item'} activeClassName=''>
					<img src={ logo } />
					<span>{this.props.title}</span>
				</Link>

				<div className={'right menu'}>
					<LoginState user={this.state.user} />
				</div>
			</div>
		);
	}
};

export default Header;
