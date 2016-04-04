import React from 'react';
import ReactDOM from 'react-dom';
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
import { flux, page } from 'Decorator';

// Section image
import appIcon from 'Source/images/app-icon.png';
import techIcon from 'Source/images/tech-icon.png';

// Avatar
import avatar1 from 'Source/images/avatar-1.png';
import avatar2 from 'Source/images/avatar-2.png';
import avatar3 from 'Source/images/avatar-3.png';

// Images
import speaker from 'Source/images/speaker.png';
import event from 'Source/images/event.png';
import jobs from 'Source/images/jobs.png';
import compones from 'Source/images/compones.png';
import hackathonTaiwan from 'Source/images/hackathonTaiwan.png';

var descStyle = {
	fontSize: '1.5em'
};

var sectionStyle = {
};

@page((handle) => {
	return {
		ogMeta: {
			'og:title': handle.i18n.getFmtMessage('landing_page.title', '%s', 'Hackathon Taiwan'),
			'og:image': handle.flux.getState('Service').externalUrl + hackathonTaiwan
		}
	};
})
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
	};

	removeScroll = () => {
		this.setState({
			'scroll': 'scroll-off'
		});
	};

	about = () => {
		var $node = $(this.refs.app_section);
		var $header = $(ReactDOM.findDOMNode(this.refs.header));

		$('html, body').stop().animate({
			scrollTop: $node.offset().top - $header.height() + 1
		}, 400);
	};

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
					
					<Link to='/HackathonMap'>
						<button className={'big ui inverted button'}>
							<I18n sign='landing_page.map_button'>Hackathon Map</I18n>
						</button>
					</Link>
					<a href='/hackathon/reg'>
						<button className={'big ui inverted button'}>
							<I18n sign='landing_page.reg_event_button'>Register Your Event</I18n>
						</button>
					</a>
					<Link to='/hackathon/room'>
						<button className={'big ui inverted button'}>
							<I18n sign='landing_page.join_room_button'>Join Chat Channel</I18n>
						</button>
					</Link>
					<br />
					<button className={'big ui inverted button'} onClick={this.about}>
						<I18n sign='landing_page.entry_button'>What is this</I18n>
					</button>
				</div>
				
				<section style={ sectionStyle }>
					<div className='ui basic segment'>
						<div className='ui centered cards'>

							<div className='card remove-border'>
								<div className='image'>
									<img src={speaker} />
								</div>
								<div className='content'>
									<div className='header'>公開你的作品吧</div>
									<div className='meta'>創新發表亮相</div>
									<div className='description'>最棒的新創作品都在此發表或報導，無論是活動上創作還是日常作品，都可以在此找到！更重要的是，可以與廣大的社群朋友及真正的業界專家相互交流。</div>
								</div>
							</div>

							<div className='card remove-border'>
								<div className='image'>
									<img src={compones} />
								</div>
								<div className='content'>
									<div className='header'>手把手教到你會</div>
									<div className='meta'>實務教育訓練與工作坊課程</div>
									<div className='description'>我們擁有嚴選的業界講師，無論初學班還是進階班，皆採用明確有主題的工作坊教學方式，一步步的帶你真正動手由淺入深，循序漸進學習最新的議題和熱門技術。</div>
								</div>
							</div>

							<div className='card remove-border'>
								<div className='image'>
									<img src={event} />
								</div>
								<div className='content'>
									<div className='header'>幫你辦活動</div>
									<div className='meta'>活動承辦、設計執行、網路解決方案</div>
									<div className='description'>我們擁有國內外數十場大大小小的活動籌辦及執行經驗，處理過數百人高負載的無線網路需求，如果貴單位有任何委外辦理黑客松或任何與科技相關的活動，歡迎與我們洽詢。</div>
								</div>
							</div>

							<div className='card remove-border'>
								<div className='image'>
									<img src={jobs} />
								</div>
								<div className='content'>
									<div className='header'>人才、工作幫你找</div>
									<div className='meta'>尋找你要的人才或熱血工作</div>
									<div className='description'>黑客松台灣擁有一群熱愛技術並不斷追求卓越的技術人才，只要提供你的人才需求，我們能為您快速篩選並傳遞徵才訊息。如有需要，我們也能替您做前期面談篩選，以節省您的時間。</div>
								</div>
							</div>
						</div>
					</div>
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
