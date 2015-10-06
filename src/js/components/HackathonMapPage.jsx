import React from 'react';
import Fluky from 'fluky';
import I18n from 'Extension/I18n.jsx';

// Components
import Header from './Header.jsx';
import HackathonMap from './HackathonMap.jsx';

class HackathonMapPage extends React.Component {

	constructor() {
		super();

		this.state = {
			winWidth: 100,
			winHeight: 100
		};
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	updateDimensions = () => {
		this.setState({
			winWidth: $(window).width(),
			winHeight: $(window).height()
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
