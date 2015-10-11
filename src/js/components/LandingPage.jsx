import React from 'react';
import Fluky from 'fluky';
import I18n from 'Extension/I18n.jsx';

// Components
import Header from './Header.jsx';
import Videos from './Videos.jsx';
import Introduce from './Introduce.jsx';
import HackathonMap from './HackathonMap.jsx';
import Photos from './Photos.jsx';
import Works from './Works.jsx';
import Sponsors from './Sponsors.jsx';
import Speakers from './Speakers.jsx';

// Section image
import appIcon from 'Source/images/app-icon.png';
import techIcon from 'Source/images/tech-icon.png';

// Avatar
import avatar1 from 'Source/images/avatar-1.png';
import avatar2 from 'Source/images/avatar-2.png';
import avatar3 from 'Source/images/avatar-3.png';

var descStyle = {
	fontSize: '1.5em'
};

var sectionStyle = {
};

class LandingPage extends React.Component {
	constructor() {
		super();

		this.state = {
			'scroll': 'scroll-off'
		}
	}

	makeScroll = () => {
		this.setState({
			'scroll': null
		});
	}

	removeScroll = () => {
		this.setState({
			'scroll': 'scroll-off'
		});
	}

	about = () => {
		var $node = $(this.refs.app_section.getDOMNode());
		var $header = $(React.findDOMNode(this.refs.header));

		$('html, body').stop().animate({
			scrollTop: $node.offset().top - $header.height()
		}, 400);
	}

	render() {
		var scrollStyle = this.state.scroll;

		return (
			<div className='main-page'>
				<Header ref='header' />

				<div className={'ui basic center aligned segment landing-page-header'}>
					<h2 className={'ui inverted header'}>
						<span>{Fluky.getState('Service').name}</span>
					</h2>
					<h1 className={'ui inverted header'}>
						<I18n sign='landing_page.subtitle'>Creativity is Bottomless</I18n>
					</h1>
					<div className="ui stackable three column grid">
						<div className="column"></div>
						<div className="column">
							<p>
								<I18n sign='landing_page.slogn'>Where you can easily and beautifully share what you build, and how you make.</I18n>
							</p>
						</div>
					</div>
					<br />
					<button className={'big ui inverted button'} onClick={this.about}>
						<I18n sign='landing_page.entry_button'>What is this</I18n>
					</button>
				</div>

				<section className="videos" style={ sectionStyle }>
					<Videos />
				</section>

				<section className="introduce section-green" style={ sectionStyle }>
					<Introduce />
				</section>

				<section className="map" style={ sectionStyle } onClick={ this.makeScroll } onMouseLeave={ this.removeScroll }>
					<HackathonMap scrollStyle={ scrollStyle } />
				</section>

				<section className="works section-white" style={ sectionStyle } ref='app_section'>
					<Works />
				</section>

				<section className="photos section-white" style={ sectionStyle }>
					<Photos />
				</section>

				<section className="introduce section-green" style={ sectionStyle }>
					<Sponsors />
				</section>

				<section className="sponsors section-white" style={ sectionStyle }>
					<Speakers />
				</section>

				<div className={'ui basic inverted center aligned segment'}>
					<p>contact@hackathon.tw</p>
					<p>© Hackathon Taiwan. All rights reserved.</p>
				</div>
			</div>
		);
	}
}

export default LandingPage;
