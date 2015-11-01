import React from 'react';
import I18n from 'Extension/I18n.jsx';

// Decorators
import { flux } from 'Decorator';

class Profile extends React.Component {
    componentDidMount() {
		$('.show-prpfile').popup();
  	}

	render() {
		var speak = this.props;
		
		return (
			<div className="column show-prpfile" data-content={ speak.introduce }>
				<img className="ui medium circular image" src={ speak.img } />
				<h3>{ speak.nameCn }<br />{ speak.nameEn }</h3>
			</div>
		);
	};
};

@flux
class Speakers extends React.Component {
	constructor(props, context) {
		super();

		var speakerStore = context.flux.getState('Speakers');

		this.state = speakerStore;
	}

	render() {
		var { speakers } = this.state;

		return (
			<div className={'ui basic center aligned segment'}>
				<h2 className="section-title">
					<I18n sign='speakers.title'>
						Keynote speakers, judges and mentors
					</I18n>
				</h2>
				<div className="ui stackable four column grid">
					<div className="two wide column"></div>
					<div className="twelve wide column">
						<div className="ui stackable five column grid">
							{speakers.map(({ nameCn, nameEn, introduce, img }, index) =>
							<Profile nameCn={nameCn}
								nameEn={nameEn}
								introduce={introduce}
								img={img} />
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Speakers;
