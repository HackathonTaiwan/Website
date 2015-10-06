import React from 'react';
import Fluky from 'fluky';
import I18n from 'Extension/I18n.jsx';

// Components
import Header from './Header.jsx';
import HackathonMap from './HackathonMap.jsx';

class HackathonMapPage extends React.Component {

	constructor() {
		super();

		var win = Fluky.getState('Window');
		this.state = {
			winWidth: win.width,
			winHeight: win.height
		};
	}

	componentWillMount() {
		Fluky.on('store.Window', Fluky.bindListener(this.updateDimensions));
	}

	componentWillUnmount() {
		Fluky.off('store.Window', this.updateDimensions);
	}

	updateDimensions = () => {
		var win = Fluky.getState('Window');
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
