import React from 'react';
import Fluky from 'fluky';
import I18n from 'Extension/I18n.jsx';

var designer = require('../../images/skill-design.png');
var hardWare = require('../../images/skill-hard-ware.png');
var softWare = require('../../images/skill-soft-ware.png');
var student = require('../../images/skill-student.png');

class Videos extends React.Component {
	openModal = () => {
		$('.ui.modal').modal('show');
    }

	render() {
		var stackedStyle = {
			color: 'black'
		};
		return (
			<div className="ui stackable four column grid">
				<div className="column soft-ware">
					<img className="ui fluid rounded image skill center-block" src={ softWare } />
				</div>
				<div className="column hard-ware">
					<img className="ui fluid rounded image skill center-block" src={ hardWare } />
				</div>
				<div className="column designer">
					<img className="ui fluid rounded image skill center-block" src={ designer } />
				</div>
				<div className="column student">
					<img className="ui fluid rounded image skill center-block" src={ student } />
				</div>
			</div>
		);
	}
};

export default Videos;
