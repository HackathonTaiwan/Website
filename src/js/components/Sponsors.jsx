import React from 'react';
import I18n from 'Extension/I18n.jsx';

var tss = require('../../images/logos/tss.png');
var averger = require('../../images/logos/averger.png');
var taiwanLand = require('../../images/logos/taiwan-land.png');
var custard = require('../../images/logos/custard.png');
var accupass = require('../../images/logos/accupass.png');
var buyic = require('../../images/logos/buyic.png');
var doit = require('../../images/logos/doit.png');
var ibmLogo = require('../../images/logos/ibmLogo.png');
var imeiZHLogo = require('../../images/logos/imeiZHLogo.png');
var jsgirl = require('../../images/logos/jsgirl.png');
var netgear = require('../../images/logos/netgear.png');
var NTUT = require('../../images/logos/NTUT.png');
var Qt = require('../../images/logos/Qt-logo-medium.png');
var sivann = require('../../images/logos/sivann.png');
var symbio = require('../../images/logos/symbio.png');
var vivotek = require('../../images/logos/vivotek.png');
var letschool = require('../../images/logos/letschool.png');
var ucrobotics = require('../../images/logos/ucrobotics.png');
var makerbot = require('../../images/logos/makerbot.png');
var taichungComputer = require('../../images/logos/taichungComputer.png');
var wda = require('../../images/logos/1wda.png');
var systex = require('../../images/logos/systex.png');
var honix = require('../../images/logos/honix.png');
var kodorobot = require('../../images/logos/kodorobot.png');
var arklab = require('../../images/logos/arklab.png');
var siwahochi = require('../../images/logos/siwahochi.png');
var cmoreCloud = require('../../images/logos/cmoreCloud.png');
var taichungUniversity = require('../../images/logos/taichungUniversity.png');
var tsa = require('../../images/logos/tsa.png');

class Sponsors extends React.Component {
	openModal = () => {
		$('.ui.modal').modal('show');
    };

	render() {

		return (
			<div className={'ui basic center aligned segment'}>
				<h2 className="section-title">
					<I18n sign='sponsors.title'>
						HACKATHON IS AN ACTIVITY OF CREATION
					</I18n>
				</h2>
				<div className="ui stackable ten column grid">
					<div className="three wide column"></div>
					<div className="ten wide column">
						<div className="ui doubling six column grid">
							<div className="column">
								<a href="http://www.custardcream.org/" target="_blank"><img className="ui fluid rounded image" src={ custard } /></a>
							</div>
							<div className="column">
								<a href="http://www.tldc.com.tw/main/" target="_blank"><img className="ui fluid rounded image" src={ taiwanLand } /></a>
							</div>
							<div className="column">
								<a href="http://letschool.com" target="_blank"><img className="ui fluid rounded image" src={ letschool } /></a>
							</div>
							<div className="column">
								<a href="#" target="_blank"><img className="ui fluid rounded image" src={ averger } /></a>
							</div>
							<div className="column">
								<a href="//www.taiwanskills.org" target="_blank"><img className="ui fluid rounded image" src={ tsa } /></a>
							</div>
							<div className="column">
								<a href="http://www.startupstadium.tw/" target="_blank"><img className="ui fluid rounded image" src={ tss } /></a>
							</div>
							<div className="column">
								<a href="http://www.accupass.com/" target="_blank"><img className="ui fluid rounded image" src={ accupass } /></a>
							</div>
							<div className="column">
								<a href="http://www.buyic.com.tw/" target="_blank"><img className="ui fluid rounded image" src={ buyic } /></a>
							</div>
							<div className="column">
								<a href="https://taiwan-doit.com/" target="_blank"><img className="ui fluid rounded image" src={ doit } /></a>
							</div>
							<div className="column">
								<a href="http://www.ibm.com/tw/zh/" target="_blank"><img className="ui fluid rounded image" src={ ibmLogo } /></a>
							</div>
							<div className="column">
								<a href="http://www.imeifoods.com.tw/" target="_blank"><img className="ui fluid rounded image" src={ imeiZHLogo } /></a>
							</div>
							<div className="column">
								<a href="https://www.facebook.com/jsgirlstw" target="_blank"><img className="ui fluid rounded image" src={ jsgirl } /></a>
							</div>
							<div className="column">
								<a href="#" target="_blank"><img className="ui fluid rounded image" src={ netgear } /></a>
							</div>
							<div className="column">
								<a href="http://www.criep.ntut.edu.tw/bin/home.php" target="_blank"><img className="ui fluid rounded image" src={ NTUT } /></a>
							</div>
							<div className="column">
								<a href="http://qt-project.org/" target="_blank"><img className="ui fluid rounded image" src={ Qt } /></a>
							</div>
							<div className="column">
								<a href="http://www.sivann.com.tw/" target="_blank"><img className="ui fluid rounded image" src={ sivann } /></a>
							</div>
							<div className="column">
								<a href="http://symbio.com/" target="_blank"><img className="ui fluid rounded image" src={ symbio } /></a>
							</div>
							<div className="column">
								<a href="http://vvtk-digest.blogspot.tw/" target="_blank"><img className="ui fluid rounded image" src={ vivotek } /></a>
							</div>
							<div className="column">
								<a href="http://www.ucrobotics.com.cn" target="_blank"><img className="ui fluid rounded image" src={ ucrobotics } /></a>
							</div>
							<div className="column">
								<a href="http://makerbot3d.asia" target="_blank"><img className="ui fluid rounded image" src={ makerbot } /></a>
							</div>
							<div className="column">
								<a href="http://www.tcca.org.tw" target="_blank"><img className="ui fluid rounded image" src={ taichungComputer } /></a>
							</div>
							<div className="column">
								<a href="http://59.120.134.70/CareerGuide/index.aspx" target="_blank"><img className="ui fluid rounded image" src={ wda } /></a>
							</div>
							<div className="column">
								<a href="http://www.systex.com" target="_blank"><img className="ui fluid rounded image" src={ systex } /></a>
							</div>
							<div className="column">
								<a href="http://www.honixtech.com/" target="_blank"><img className="ui fluid rounded image" src={ honix } /></a>
							</div>
							<div className="column">
								<a href="https://www.facebook.com/kodorobot" target="_blank"><img className="ui fluid rounded image" src={ kodorobot } /></a>
							</div>
							<div className="column">
								<a href="https://www.facebook.com/ArkLab.OpenSkyler/timeline?ref=page_internal" target="_blank"><img className="ui fluid rounded image" src={ arklab } /></a>
							</div>
							<div className="column">
								<a href="http://www.yo-mi.com/" target="_blank"><img className="ui fluid rounded image" src={ siwahochi } /></a>
							</div>
							<div className="column">
								<a href="http://www.emt.com.tw/webPage/" target="_blank"><img className="ui fluid rounded image" src={ cmoreCloud } /></a>
							</div>
							<div className="column">
								<a href="http://www.nutc.edu.tw/bin/home.php" target="_blank"><img className="ui fluid rounded image" src={ taichungUniversity } /></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Sponsors;
