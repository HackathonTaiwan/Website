import React from 'react';
import Fluky from 'fluky';
import I18n from 'Extension/I18n.jsx';

class Videos extends React.Component {
	openModal = () => {
		$('.ui.modal').modal('show');
    }

	render() {
		var stackedStyle = {
			color: 'black'
		};
		return (
			<div className={'ui basic center aligned segment'}>
				<h2 className="section-title">HACKATHON IS AN ACTIVITY OF CREATION</h2>
				<div className="ui stackable three column grid">
					<div className="three wide column"></div>
					<div className="ten wide column">
						<p>Hackathon is a newly created noun, a fusion of two words: hack and marathon. It has been a repulsive joke in the software industry, to describe an activity in which programmers or engineers create a new prototype, or code to solve a specific problem, marathon style. Since the past few years, however, the actual content of hackathons hasnt exclusively been software development, but also in the fields of design and hardware, with active participation of Maker communities. People gather together to solve various problems in life, with sharing in mind.</p>
					</div>
				</div>
				<div className="ui stackable three column grid">
					<div className="four wide column"></div>
					<div className="eight wide column">
						<div className="ui tall stacked segment" style={ stackedStyle }>
							<h3>To put it simply, hackathon is:</h3>
							<p>"An act of continuous technology creation and innovation"</p>
						</div>
						<i className="material-icons">keyboard_arrow_down</i>
					</div>
				</div>
			</div>
		);
	}
};

export default Videos;
