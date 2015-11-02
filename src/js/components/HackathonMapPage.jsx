import React from 'react';
import ReactDOM from 'react-dom';
import I18n from 'Extension/I18n.jsx';

// Components
import Header from './Header.jsx';
import HackathonMap from './HackathonMap.jsx';

// Decorators
import { flux } from 'Decorator';

@flux
class HackathonMapPage extends React.Component {

	constructor(props, context) {
		super();

		var win = context.flux.getState('Window');
		this.state = {
			winWidth: win.width,
			winHeight: win.height,
			offsetHeight: 0
		};
	}

	componentWillMount() {
		this.flux.on('state.Window', this.flux.bindListener(this.updateDimensions));
	}

	componentDidMount() {
		var $header = $(ReactDOM.findDOMNode(this.refs.header));
		this.state.offsetHeight = $header.height();
	}

	componentWillUnmount() {
		this.flux.off('state.Window', this.updateDimensions);
	}

	updateDimensions = () => {
		var win = this.flux.getState('Window');

		this.setState({
			winWidth: win.width,
			winHeight: win.height
		});
	}

	render() {
		var style = {
			position: 'relative',
			top: this.state.offsetHeight + 'px'
		};
		return (
			<div className='main-page'>
				<Header ref='header' />
				<div style={style}>
					<HackathonMap height={this.state.winHeight - this.state.offsetHeight} />
				</div>
			</div>
		);
	}
}

export default HackathonMapPage;
