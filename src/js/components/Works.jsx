import React from 'react';
import I18n from 'Extension/I18n.jsx';

class Works extends React.Component {
	openModal = () => {
		$('.ui.modal').modal('show');
    };

	render() {
		return (
			<div className={'ui basic center aligned segment'}>
				<h2 className="section-title">
					<I18n sign='works.title'>
						HOW HACKATHON WORKS
					</I18n>
				</h2>
				<div className="ui stackable eight column grid">
					<div className="three wide column"></div>
					<div className="left aligned ten wide column">
						<p><I18n sign='works.des1'>To participate in a hackathon, we usually form small groups with friends beforehand, or assemble with newly acquainted people at the event. To make it easier for the participants to form new groups, ice-breaking games are organised for this teaming-up effort in our Core events. Nevertheless, you can always join alone.</I18n></p>
						<p><I18n sign='works.des2'>After the Hackathon starts, you would have to survive to the last moment of the event with your team mates, from brainstorming, discussions, to job division; any form of creation are welcome, either software, hardware, design or mixes of them (such as 3-D modelling); work until you finalise the prototype, prepped a presentation, and sharing with a demo on the stage. You will go through different stages of mood and pressure, and some might even change their subject of creation from this; the others would succeed in breaking their own limits, bathe in accomplishment. Luck, strength, and perserverence have all been the challenging facts for the participants, just like a miniature start-up experience.</I18n></p>
						<p><I18n sign='works.des3'>You dont have to worry about feeding yourself in this event, though. We, as to make sure everyone enjoys the whole, continuous experience of Hackathon, would get the food and drinks ready for you. Pizza night is usually available on the first evening, for all to make friends and relax, just before diving into the long night of hacking.</I18n></p>
						<p><I18n sign='works.des4'>In our Core event, we are issueing Choice Award, Technical Award, Visual Design Award, Presentation and Best Overall Performance Award, mainly to encourage a more polished result from our participants. Different professionals of the awards are invited to assess the prototypes and presentations. Aside from techniques, presentation became also a topic of award from its nature as a solid skill.</I18n></p>
						<p><I18n sign='works.des5'>Our Core event doesnt grade our participants or categorise them into different positions. It doesnt matter whether you produced a solid prototype, or awarded; as long as you enjoy the process of Hackathon, made new friends, learned to solve problems with or without friend, or did things yourself, youll understand what Hackathon really is.</I18n></p>
					</div>
				</div>
			</div>
		);
	}
};

export default Works;
