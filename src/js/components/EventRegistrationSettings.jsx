import React from 'react';
import ReactDOM from 'react-dom';

// Decorators
import { flux, page, i18n, loader } from 'Decorator';

@flux
class EventRegistrationSettings extends React.Component {

	componentDidMount() {

		// Initializing date range input box
		var deadline = new Kalendae.Input(this.refs.deadline, {
			direction: 'today-future',
			selected: [ this.props.defaultDeadline ]
		});

		$(this.refs.hours).dropdown();
	}

	get deadline() {
		return this.refs.deadline.value + ' ' + this.refs.hours.value;
	}

	get quota() {
		return this.refs.quota.value;
	}

	render() {
		return (
			<div className='ui yellow segments'>
				<div className='ui inverted segment'>
					<i className='ui options icon' />
					報名設定
				</div>
				<div className='ui yellow segment'>
					<div className='ui field'>
						<div className={'ui labeled input'}>
							<div className='ui label'>報名上限人數</div>
							<input
								type='text'
								name='quota'
								ref='quota'
								defaultValue='100'
								placeholder='100'
								onChange={this.props.onChange}
								onBlur={this.props.onChange}
								/>
						</div>
					</div>

					<div className='ui field'>
						<div className={'ui action labeled input'}>
							<div className='ui label'>報名截止時間</div>
							<input
								type='text'
								name='deadline'
								ref='deadline'
								placeholder='11/15/2015'
								onChange={this.props.onChange}
								onBlur={this.props.onChange}
								/>

							<select ref='hours' className='ui compact selection dropdown' onChange={this.props.onChange}>
								{(() => {

									var hours = [];
									for (var i = 0; i < 24; i++) {
										hours.push(<option key={i}>{i}:00</option>);
									}

									return hours;
								})()}
							</select>
						</div>
					</div>
				</div>
				
			</div>
		);
	}
}

export default EventRegistrationSettings;
