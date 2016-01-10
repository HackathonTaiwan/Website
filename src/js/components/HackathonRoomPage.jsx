import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import I18n from 'Extension/I18n.jsx';

// Components
import Header from './Header.jsx';
import Avatar from './Avatar.jsx';

// Decorators
import { flux, i18n, page, loader, preAction } from 'Decorator';

class Room extends React.Component {

	constructor() {
		super();

		this.state = {
			toEnd: true,
			inputHeight: 0
		};
	}

	componentDidUpdate() {
		var $inputPanel = $(ReactDOM.findDOMNode(this.refs.input_panel));

		// Scroll to end automatically
		if (this.state.toEnd) {
			var $msgBox = $(this.refs.message_box);
			$msgBox.scrollTop($msgBox[0].scrollHeight);
		}

		if (this.state.inputHeight == $inputPanel.height())
			return;

		this.setState({
			inputHeight: $inputPanel.height()
		});
	}

	sizeChange = () =>  {
		var $inputPanel = $(ReactDOM.findDOMNode(this.refs.input_panel));

		this.setState({
			inputHeight: $inputPanel.height()
		});
	}

	render() {

		// Loading all messages in this room
		var messages = [];
		this.props.room.messages.forEach(function(msg, index) {
			var lines = msg.content.split('\n');

			var content = [];
			lines.forEach(function(line, index) {
				content.push(
					<div key={index}>{line}</div>
				);
			});

			messages.push(
				<div className='item' key={index}>
					<div className='ui mini image'>
						<Avatar hash={msg.avatar_hash} size={24} />
					</div>
					<div className='content'>
						<div className='ui right floated tiny basic label'>{window.moment(msg.ts).format('HH:mm')}</div>
						<div className='header'>{msg.name}</div>
						<div className='description'>{content}</div>
					</div>
				</div>
			);
/*
			messages.push(
				<div className='ui icon message' key={index}>
					<i className='top aligned user icon' />
					<div className='content'>
						<div className='header'>{msg.name}</div>
						<div>{content}</div>
					</div>
				</div>
			);
*/
		});

		var style = this.props.style || {};
		var containerStyle = {
			position: 'relative',
			height: style.height || undefined
		};
		var msgBoxStyle = {
			position: 'relative',
			overflow: 'auto',
			height: style.height - this.state.inputHeight,
			margin: 0
		};
		var spaceStyle = {
			minHeight: style.height - this.state.inputHeight,
			width: '100%'
		};
		var inputPanelStyle = {
			margin: 0
		};

		return (
			<div ref='component' style={this.props.style}>
				<div style={containerStyle}>

					<div ref='message_box' style={msgBoxStyle}>
						<div style={spaceStyle}>
						</div>
						<div className='ui basic segment'>
							<div className='ui items'>
							{messages}
							</div>
						</div>
					</div>
					<InputPanel
						ref='input_panel'
						room={this.props.room}
						onResize={this.sizeChange.bind(this)}
						style={inputPanelStyle} />
				</div>
			</div>
		);
	}
}

@i18n
@flux
class InputPanel extends React.Component {
	constructor() {
		super();

		this.state = {
			rows: 1,
			enterToSend: true,
			height: 0
		};
	}

	componentDidMount() {

		$(this.refs.enterToSend).checkbox({
			onChecked: function() {
				this.setState({
					enterToSend: true
				});
			}.bind(this),
			onUnchecked: function() {
				this.setState({
					enterToSend: false
				});
			}.bind(this)
		});

		this.setState({
			height: $(this.refs.component).height()
		});

		this.sizeChange();
	}

	componentDidUpdate() {
		var height = $(this.refs.component).height();

		if (this.state.height == height)
			return;

		this.setState({
			height: height
		});

		this.sizeChange();
	}

	onKeyDown = (event) => {

		// Key code for enter
		if (event.keyCode === 13) {

			if (this.state.enterToSend && !event.shiftKey) {
				
				event.preventDefault();

				this.send();
			}
		}
	}

	handleChange = () => {
		var rows = this.refs.input.value.split('\n').length;

		this.setState({
			rows: rows > 10 ? 10 : rows
		});
	}

	send = () => {

		if (!this.refs.input.value)
			return;

		var user = this.flux.getState('User');

		this.flux.dispatch('action.Room.sendMessage', {
			from: user.id,
			avatar_hash: user.avatar_hash,
			name: user.name,
			to: this.props.room.id,
			content: this.refs.input.value,
			ts: Date.now()
		});

		this.refs.input.value = '';
		this.handleChange();
	}	

	sizeChange = () => {
		if (this.props.onResize)
			this.props.onResize();
	}

	render() {

		var textareaStyle = {
			resize: 'none'
		};
			//<div className={'ui bottom fixed menu nav grid'}>

			//<div ref='component' style={this.props.style} className={'ui menu nav grid'}>
		return (
			<div ref='component' style={this.props.style} className={'ui menu nav grid'}>
				<div className='row'>
					<div className='ui form sixteen wide column'>
						<div className='field'>
							<textarea
								ref='input'
								rows={this.state.rows}
								style={textareaStyle}
								placeholder={this.i18n.getMessage('hackathon_room_page.input_placeholder', 'Say something...')}
								onKeyDown={this.onKeyDown}
								onChange={this.handleChange} />
						</div>
						<div className='inline two fields'>
							<div className='field'>
								<div className='ui checkbox' ref='enterToSend'>
									<input type='checkbox' defaultChecked={this.state.enterToSend} />
									<label><I18n sign='hackathon_room_page.press_enter_to_send'>Press enter to send</I18n></label>
								</div>
							</div>
							<div className='field'>
								<div className='ui right floated tiny animated fade teal button' onClick={this.send}>
									<div className='visible content'>
										<i className='send icon' />
									</div>
									<div className='hidden content'>
										<I18n sign='hackathon_room_page.send_button'>Send</I18n>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

@preAction('HackathonMap.fetch')
class HackathonLobby extends React.Component {

	constructor(props, context) {
		super();

		var store = context.flux.getState('HackathonMap');

		this.state = {
			events: store.hackathons,
			sorted: store.hackathons.slice(0).sort(function(a, b) {
				return b.start - a.start;
			})
		};
	}

	componentWillMount() {
		this.flux.on('state.HackathonMap', this.flux.bindListener(this.onChange));
	}

	componentWillUnmount() {
		this.flux.off('state.HackathonMap', this.onChange);
	}

	onChange = () => {
		var store = this.flux.getState('HackathonMap');

		this.setState({
			events: store.hackathons,
			sorted: store.hackathons.slice(0).sort(function(a, b) {
				return b.start - a.start;
			})
		});
	}
	render() {
		var style = {
			background: 'rgba(0,0,0,0.8)',
			boxShadow: '0 0 3px rgba(255,255,255,0.8)',
			minWidth: '350px'
		};

		var listviewStyle = {
			height: this.props.height,
			overflowX: 'hidden'
		};

		var list = [];
		this.state.sorted.map(function(e, index) {

			if (!e.available)
				return;

			list.push(
				<a href={'/hackathon/room/hackthon_' + e._id} className='item' key={index}>
					<div className='left floated content'>
						<div className={'ui ' + (e.expired ? 'grey' : 'green') + ' tiny label'}>
							{e.startdate}
						</div>
					</div>
					<div className='left floated content'>
						{e.name}
					</div>
				</a>
			);
		}.bind(this));

		return (
			<div className='ui padded basic segment'>
				<div className='ui center aligned grid'>
					<div className='ui center aligned compact basic segment'>
						<div className='ui icon header'>
							<i className='comments outline icon' />
							<div className='content'>
								<I18n sign='hackathon_lobby.header'>Chat Channels</I18n>
								<div className='sub header'>
									<I18n sign='hackathon_lobby.subheader'>Choice a hackathon what you want</I18n>
								</div>
							</div>
						</div>
						<div style={listviewStyle} className='ui divided selection list'>
							{list}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

@flux
@i18n
@loader
class HackathonRoomPage extends React.Component {

	constructor(props, context) {
		super();

		var win = context.flux.getState('Window');
		var Room = context.flux.getState('Room');

		this.state = {
			winWidth: win.width,
			winHeight: win.height,
			offsetHeight: 0,
			rooms: Room.rooms
		};
	}

	componentWillMount() {
		this.flux.on('state.Window', this.flux.bindListener(this.updateDimensions));
		this.flux.on('state.Room', this.flux.bindListener(this.updateRoom));
	}

	componentDidMount() {
		var $header = $(ReactDOM.findDOMNode(this.refs.header));

		// Loading socket.io library
		this.loader.script('/assets/socket.io.js', function() {

			// Initializing
			this.flux.dispatch('action.Room.init', this.props.params.id);
		}.bind(this));

		this.setState({
			offsetHeight: $header.height()
		});
	}

	componentWillUnmount() {
		this.flux.off('state.Window', this.updateDimensions);
		this.flux.off('state.Room', this.updateRoom);
	}

	updateDimensions = () => {
		var win = this.flux.getState('Window');

		this.setState({
			winWidth: win.width,
			winHeight: win.height
		});
	}

	updateRoom = () => {
		var store = this.flux.getState('Room');

		this.setState({
			rooms: store.rooms
		});
	}

	render() {
		var style = {
			position: 'relative',
			top: this.state.offsetHeight + 'px',
			height: this.state.winHeight - this.state.offsetHeight,
			overflow: 'hidden'
		};

		return (
			<div className='main-page'>
				<Header ref='header' title={this.i18n.getFmtMessage('hackathon_room_page.title', '%s | Chat Channel', this.flux.getState('Service').name)} />
				<div style={style}>
					{(() => {
						if (this.props.params.id && this.state.rooms.hasOwnProperty(this.props.params.id)) {
							return <Room style={{ height: this.state.winHeight - this.state.offsetHeight }} room={this.state.rooms[this.props.params.id]} />;
						}

						if (!this.props.params.id) {
							return <HackathonLobby />
						}
					})()}
				</div>
			</div>
		);
	}
}

export default HackathonRoomPage;
