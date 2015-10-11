import React from 'react';
import Fluky from 'fluky';
import I18n from 'Extension/I18n.jsx';

class Modal extends React.Component {
	render() {
		// $('.ui.embed').embed();

		return (
			<div className="ui modal">
				<i className="close icon"></i>
				<div className="ui embed" data-source="youtube" data-id="pKpYgspXQAA"></div>
			</div>
		)
	}
};

class Videos extends React.Component {
	openModal = () => {
		$('.ui.modal').modal('show');
    }

	render() {
		return (
			<div className={'ui basic center aligned segment'}>
				<Modal />
				<h2><i className="material-icons">live_tv</i> <span className="text" onClick={ this.openModal }>Watch the Video</span></h2>
			</div>
		);
	};
};

export default Videos;
