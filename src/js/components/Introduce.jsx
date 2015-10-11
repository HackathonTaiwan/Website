import React from 'react';
import Fluky from 'fluky';
import I18n from 'Extension/I18n.jsx';

class Introduce extends React.Component {
	openModal = () => {
		$('.ui.modal').modal('show');
    }

	render() {
		var stackedStyle = {
			color: 'black'
		};
		return (
			<div className={'ui basic center aligned segment'}>
				<h2 className="section-title">
					<I18n sign='introduce.title'>
						HACKATHON IS AN ACTIVITY OF CREATION
					</I18n>
				</h2>
				<div className="ui stackable three column grid">
					<div className="three wide column"></div>
					<div className="ten wide column">
						<p><I18n sign='introduce.description'>Hackathon is a newly created noun, a fusion of two words: hack and marathon. It has been a repulsive joke in the software industry, to describe an activity in which programmers or engineers create a new prototype, or code to solve a specific problem, marathon style. Since the past few years, however, the actual content of hackathons hasnt exclusively been software development, but also in the fields of design and hardware, with active participation of Maker communities. People gather together to solve various problems in life, with sharing in mind.</I18n></p>
					</div>
				</div>
				<div className="ui stackable three column grid">
					<div className="four wide column"></div>
					<div className="eight wide column">
						<div className="ui tall stacked segment" style={ stackedStyle }>
							<h3><I18n sign='introduce.short'>To put it simply, hackathon is:</I18n></h3>
							<p><I18n sign='introduce.keepgoing'>"An act of continuous technology creation and innovation"</I18n></p>
						</div>
						<i className="material-icons">keyboard_arrow_down</i>
					</div>
				</div>
			</div>
		);
	}
};

export default Introduce;
