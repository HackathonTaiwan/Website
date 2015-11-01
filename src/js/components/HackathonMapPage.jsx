import React from 'react';
import I18n from 'Extension/I18n.jsx';

// Components
import Header from './Header.jsx';
import HackathonMap from './HackathonMap.jsx';

// Decorators
import { flux } from 'Decorator';

@flux
class HackathonMapPage extends React.Component {

	constructor(props, context) {
		super();

		var win = context.flux.getState('Window');
		this.state = {
			winWidth: win.width,
			winHeight: win.height
		};
	}

	componentWillMount() {
		this.flux.on('state.Window', this.flux.bindListener(this.updateDimensions));
	}

	componentWillUnmount() {
		this.flux.off('state.Window', this.updateDimensions);
	}

	updateDimensions = () => {
		var win = this.flux.getState('Window');
		this.setState({
			winWidth: win.width,
			winHeight: win.height
		});
	}

	render() {
		console.log(this.state.winHeight);
		return (
			<div className='main-page'>
				<Header />
				<HackathonMap height={this.state.winHeight} />
			</div>
		);
	}
}

export default HackathonMapPage;
