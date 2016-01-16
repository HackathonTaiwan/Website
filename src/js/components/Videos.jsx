import React from 'react';
import I18n from 'Extension/I18n.jsx';

class Modal extends React.Component {
	render() {
		return (
			<div id="youtube" className="ui modal">
				<i className="close icon"></i>
				<div className="ui embed" data-source="youtube" data-id="pKpYgspXQAA">
					<iframe id="player" width="100%" height="100%" src="" frameborder="0" allowfullscreen></iframe>
				</div>
			</div>
		)
	}
};

class Videos extends React.Component {
	openModal = () => {
		$('.ui.modal').modal({
	        onHide: function(){
	            console.log('hidden');
	            $('#player').attr('src', '');
	        },
	        onShow: function(){
	            console.log('shown');
	            $('#player').attr('src', 'http://www.youtube.com/embed/pKpYgspXQAA');
	        }
	    }).modal('show');
    };

	render() {
		return (
			<div className={'ui basic center aligned segment'}>
				<h2><i className="material-icons">live_tv</i> <span className="text" onClick={ this.openModal }><I18n sign='video.title'>Watch the Video</I18n></span></h2>
				<Modal />
			</div>
		);
	};
};

export default Videos;
