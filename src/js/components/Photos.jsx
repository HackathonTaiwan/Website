import React from 'react';
import Fluky from 'fluky';
import I18n from 'Extension/I18n.jsx';

require('!file?name=photostack.css!../../css/photostack.css');
require('!file?name=photostack-component.css!../../css/photostack-component.css');
require('!file?name=classie.js!../photostack/classie.js');
require('!file?name=photostack.js!../photostack/photostack.js');

var event1 = require('../../images/events/1st.jpg');
var event2 = require('../../images/events/2nd.jpg');
var event3 = require('../../images/events/3rd.jpg');
var event4 = require('../../images/events/4th.jpg');
var event5 = require('../../images/events/5th.jpg');
var event6 = require('../../images/events/6th.jpg');
var event7 = require('../../images/events/7th.jpg');
var event8 = require('../../images/events/8th.jpg');

var designer = require('../../images/skill-design.png');
var hardWare = require('../../images/skill-hard-ware.png');
var softWare = require('../../images/skill-soft-ware.png');
var student = require('../../images/skill-student.png');

class Photostack extends React.Component {
	render() {
		return (
			<section id="photostack" className="photostack">
				<div>
					<figure>
						<a href="#" className="photostack-img"><img src={ event1 } alt="1st"/></a>
						<figcaption>
							<h2 className="photostack-title">HACKATHON TAIWAN 1ST</h2>
							<div className="photostack-back">
								<p>From the HanGee Smartphone Project, we came to understand that to make the goal come true, we should not endeavour alone. We, however, also found that most of the people dont join community events, or let alone create things with computer technologies. From this, the Hackathon Taiwan project was born, to attract more people to learn and create together, and to cultivate this DIY-themed community.</p>
							</div>
						</figcaption>
					</figure>
					
					<figure data-dummy>
						<a href="#" className="photostack-img"><img src={ event1 } alt="1st"/></a>
						<figcaption>
							<h2 className="photostack-title">Lovely Green</h2>
						</figcaption>
					</figure>
				</div>
			</section>
		);
	}
};

class Photos extends React.Component {
	render() {
		return (
			<div>
				<div className={'ui basic center aligned segment'}>
					<h2 className="section-title">we are</h2>
					<div className="ui stackable three column grid">
						<div className="two wide column"></div>
						<div className="twelve wide column">
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
						</div>
					</div>
				</div>

				<div className={'ui basic center aligned segment'}>
					<Photostack />
				</div>
			</div>
		);
	}
};

export default Photos;
