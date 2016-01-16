import React from 'react';
import ReactDOM from 'react-dom';

// Components
import I18n from 'Extension/I18n.jsx';

// Decorators
import { flux, page, i18n, loader, preAction } from 'Decorator';

@flux
@i18n
class EventRegistrationForm extends React.Component {

	constructor() {
		super();

		this.state = {
			error: false,
			fields: {
				name: [],
				email: [],
				phone: [],
				organization: [],
				realname: [],
				idno: [],
				birthday: []
			}
		};
	}

	componentDidMount() {

		// Initializing date range input box
		var datepicker = new Kalendae.Input(this.refs.birthday);
	}

	submit = () => {
		var name = this.refs.name.value.trim();
		var email = this.refs.email.value.trim();
		var phone = this.refs.phone.value.trim();
		var organization = this.refs.organization.value.trim();
		var realname = this.refs.realname.value.trim();
		var idno = this.refs.idno.value.trim();
		var birthday = this.refs.birthday.value.trim();

		var skills = {};
		$(this.refs.skills).find('.ui.checkbox').each(function() {

			var $checkbox = $(this);
			if ($checkbox.checkbox('is checked')) {
				skills[$checkbox.find('input[type="checkbox"]').val()] = true;
			}
		});

		var errorNum = 0;
		if (name == '') {
			errorNum++;
			this.state.fields.name.push('empty');
		} else {
			this.state.fields.name = [];
		}

		if (email == '') {
			errorNum++;
			this.state.fields.email.push('empty');
		} else {
			this.state.fields.email = [];
		}

		if (phone == '') {
			errorNum++;
			this.state.fields.phone.push('empty');
		} else {
			this.state.fields.phone = [];
		}

		if (organization == '') {
			errorNum++;
			this.state.fields.organization.push('empty');
		} else {
			this.state.fields.organization = [];
		}

		if (realname == '') {
			errorNum++;
			this.state.fields.realname.push('empty');
		} else {
			this.state.fields.realname = [];
		}

		if (idno == '') {
			errorNum++;
			this.state.fields.idno.push('empty');
		} else {
			this.state.fields.idno = [];
		}

		if (birthday == '') {
			errorNum++;
			this.state.fields.birthday.push('empty');
		} else {
			this.state.fields.birthday = [];
		}

		this.state.error = errorNum ? true : false;

		if (this.state.error) {
			this.forceUpdate();
			return;
		}

		this.flux.dispatch('action.EventRegistration.signUp', this.props.eventId, {
			name: name,
			email: email,
			phone: phone,
			organization: organization,
			skills: skills,
			realname: realname,
			idno: idno,
			birthday: birthday
		});
	};

	getFieldStatus = (fieldName, prefix) => {

		if (fieldName) {
			if (this.state.fields[fieldName].length) {
				return (prefix || '') + ' error required field';
			}
		}

		return (prefix || '') + ' required field';
	};

	render() {
		return (
			<div className='ui basic segment'>
				<h1>報名{this.flux.getState('Event').name}</h1>

				{(() => {
					if (this.state.error) {
						return (
							<div className='ui negative icon message'>
								<i className={'warning sign icon'} />
								<div className='content'>
									<div className='header'>Failed to register</div>
									<p>Please fill in the registration form correctly.</p>
								</div>
							</div>
						);
					}

					return false;
				})()}
				<div className='ui form'>
					<div className='ui green raised segment'>
						<h3 className='ui dividing header'>基本資料</h3>

						<div className={this.getFieldStatus('name', 'seven wide')}>
							<label>姓名或暱稱</label>
							<div className='ui input'>
								<input type='text' ref='name' defaultValue={this.flux.getState('User').name} />
							</div>
						</div>

						<div className={this.getFieldStatus('email', 'ten wide')}>
							<label>電子郵件信箱</label>
							<input type='text' ref='email' defaultValue={this.flux.getState('User').email} />
						</div>

						<div className={this.getFieldStatus('phone', 'five wide')}>
							<label>聯絡電話</label>
							<input type='text' ref='phone' />
						</div>

						<div className={this.getFieldStatus('organization', 'seven wide')}>
							<label>就讀或工作單位</label>
							<input type='text' ref='organization' />
						</div>

						<div ref='skills' className='field'>
							<label>屬性或技能（可複選）</label>
							<div className='ui checkbox'>
								<input type='checkbox' value='student' />
								<label>學生</label>
							</div>
							<br />
							<div className='ui checkbox'>
								<input type='checkbox' value='software' />
								<label>軟體開發人員</label>
							</div>
							<br />
							<div className='ui checkbox'>
								<input type='checkbox' value='hardware' />
								<label>硬體工程師</label>
							</div>
							<br />
							<div className='ui checkbox'>
								<input type='checkbox' value='design' />
								<label>設計師</label>
							</div>
						</div>

					</div>

					<div className='ui red raised segment'>
						<h3 className='ui dividing header'>活動保險所需資訊</h3>

						<div className={this.getFieldStatus('realname', 'four wide')}>
							<label>真實姓名</label>
							<input type='text' ref='realname' />
						</div>

						<div className={this.getFieldStatus('idno', 'four wide')}>
							<label>身分證字號</label>
							<input type='text' ref='idno' />
						</div>

						<div className={this.getFieldStatus('idno', 'five wide')}>
							<label>出生年月日</label>
							<input type='text' ref='birthday' />
						</div>
					</div>

					<div className='ui right floated green labeled icon button' onClick={this.submit}>
						<i className='send icon' />
						送出報名
					</div>
				</div>
			</div>
		);
	}
}

export default EventRegistrationForm;
