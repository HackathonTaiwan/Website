import React from 'react';
import { Link } from 'react-router';

// Components
import Header from './Header.jsx';
import Videos from './Videos.jsx';
import AD from './AD.jsx';
import Introduce from './Introduce.jsx';
import HackathonMap from './HackathonMap.jsx';
import Photos from './Photos.jsx';
import Works from './Works.jsx';
import Sponsors from './Sponsors.jsx';
import Speakers from './Speakers.jsx';
import I18n from 'Extension/I18n.jsx';

// Decorators
import { flux } from 'Decorator';

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

@flux
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
		var $node = $(this.refs.app_section);
		var $header = $(this.refs.header);

		$('html, body').stop().animate({
			scrollTop: $node.offset().top - $header.height()
		}, 400);
	}

	render() {
		var scrollStyle = this.state.scroll;

		return (
			<div className='main-page'>
				<Header ref='header' autoTransform={true} />

				<div className={'ui basic center aligned segment landing-page-header'}>
					<h1 className={'ui inverted header'}>
						<span>{this.flux.getState('Service').name}</span>
					</h1>
					<h2 className={'ui inverted header'}>
						<I18n sign='landing_page.slogn'>Where you can easily and beautifully share what you build, and how you make.</I18n>
					</h2>
					<br />
					<button className={'big ui inverted button'} onClick={this.about}>
						<I18n sign='landing_page.entry_button'>What is this</I18n>
					</button>
					<Link to='/HackathonMap'>
						<button className={'big ui inverted button'}>
							<I18n sign='landing_page.map_button'>Hackathon Map</I18n>
						</button>
					</Link>
					<Link to='/hackathon/reg'>
						<button className={'big ui inverted button'}>
							<I18n sign='landing_page.reg_event_button'>Register Your Event</I18n>
						</button>
					</Link>
				</div>
				
				<section className="videos" style={ sectionStyle }>
				</section>

				<section className="introduce section-green" style={ sectionStyle }>
					<Introduce />
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
/*
				<section className="videos" style={ sectionStyle }>
					<Videos />
				</section>

				<section className="map" style={ sectionStyle } onClick={ this.makeScroll } onMouseLeave={ this.removeScroll }>
					<HackathonMap scrollStyle={ scrollStyle } />
				</section>
*/
export default LandingPage;
