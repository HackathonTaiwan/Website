import React from 'react';
import I18n from 'Extension/I18n.jsx';
import Loader from 'Extension/Loader.jsx';

var defaultImg = require('../../images/events/default.jpg');
var event1 = require('../../images/events/1st.jpg');
var event2 = require('../../images/events/2nd.jpg');
var event3 = require('../../images/events/3rd.jpg');
var event4 = require('../../images/events/4th.jpg');
var event5 = require('../../images/events/5th.jpg');
var event6 = require('../../images/events/6th.jpg');
var event7 = require('../../images/events/7th.jpg');
var event8 = require('../../images/events/8th.jpg');
var event9 = require('../../images/events/9th.jpg');
var event10 = require('../../images/events/10th.jpg');
var event11 = require('../../images/events/11th.jpg');

var designer = require('../../images/skill-design.png');
var hardWare = require('../../images/skill-hard-ware.png');
var softWare = require('../../images/skill-soft-ware.png');
var student = require('../../images/skill-student.png');

class Photos extends React.Component {
	render() {
		return (
			<div>
				<div className={'ui basic center aligned segment'}>
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

						<div className="column remove-padding">
							<img className="ui fluid image" src={ event1 } />
						</div>
						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_1</i><br />2014. 9/20 - 9/21</h1>
						</div>
						<div className="column remove-padding">
							<img className="ui fluid image" src={ event2 } />
						</div>
						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_2</i><br />2014. 11/8 - 11/9</h1>
						</div>

						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_3</i><br />2014. 12/20 - 12/21</h1>
						</div>
						<div className="column remove-padding">
							<img className="ui fluid image" src={ event3 } />
						</div>
						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_4</i><br />2015. 1/31 - 2/1</h1>
						</div>
						<div className="column remove-padding">
							<img className="ui fluid image" src={ event4 } />
						</div>

						<div className="column remove-padding">
							<img className="ui fluid image" src={ event5 } />
						</div>
						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_5</i><br />2015. 3/7 - 3/8</h1>
						</div>
						<div className="column remove-padding">
							<img className="ui fluid image" src={ event6 } />
						</div>
						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_6</i><br />2015. 4/11 - 4/12</h1>
						</div>

						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_7</i><br />2015. 5/12 - 5/13</h1>
						</div>
						<div className="column remove-padding">
							<img className="ui fluid image" src={ event7 } />
						</div>
						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_8</i><br />2015. 6/13 - 6/14</h1>
						</div>
						<div className="column remove-padding">
							<img className="ui fluid image" src={ event8 } />
						</div>

						<div className="column remove-padding">
							<img className="ui fluid image" src={ event9 } />
						</div>
						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_9</i><br />2015. 7/11 - 7/12</h1>
						</div>
						<div className="column remove-padding">
							<img className="ui fluid image" src={ event10 } />
						</div>
						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_9_plus</i><br />2015. 8/15 - 8/16</h1>
						</div>

						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_1</i> <i className="material-icons">filter_1</i><br />2015. 9/12 - 9/13</h1>
						</div>
						<div className="column remove-padding">
							<img className="ui fluid image" src={ event11 } />
						</div>
						<div className="column">
							<h1 className="text-height"><i className="material-icons">filter_1</i> <i className="material-icons">filter_2</i><br />2015. 10 ...</h1>
						</div>
						<div className="column remove-padding">
							<img className="ui fluid image" src={ defaultImg } />
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Photos;
