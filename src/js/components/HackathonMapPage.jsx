import React from 'react';
import Fluky from 'fluky';
import I18n from 'Extension/I18n.jsx';

// Components
import Header from './Header.jsx';
import HackathonMap from './HackathonMap.jsx';

class HackathonMapPage extends React.Component {

	render() {
		return (
			<div className='main-page'>
				<Header />
				<HackathonMap />
			</div>
		);
	}
}

export default HackathonMapPage;
