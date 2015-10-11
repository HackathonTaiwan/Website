import React from 'react';
import Fluky from 'fluky';
import I18n from 'Extension/I18n.jsx';

var hackathon = require('../../images/hackathon.jpg');

class AD extends React.Component {
	render() {
		return (
			<div className={'ui basic center aligned segment remove-padding'}>
				<img className="ui fluid image" src={ hackathon } />
			</div>
		);
	};
};

export default AD;
