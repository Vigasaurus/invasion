import React from 'react';
import { Switch, Form, Input, Button } from 'antd';
// import PropTypes from 'prop-types';

export class Gamechat extends React.Component {
	state = {
		chatFilter: true,
		gameChatFilter: true,
		chatInputValue: '',
	};

	updateState = (stateName, value) => {
		this.setState({ [stateName]: value });
	};

	handleFilterChange = type => {
		this.setState(prevState => ({
			[type]: !prevState[type],
		}));
	};

	handleChatFormSubmit = e => {
		e.preventDefault();

		console.log('Hello, World!');
	};

	renderHeader() {
		const { chatFilter, gameChatFilter } = this.state;

		return (
			<div className="gamechat-header">
				<span>
					Chat<Switch
						onChange={() => {
							this.handleFilterChange('chatFilter');
						}}
						checked={chatFilter}
						size="small"
					/>
				</span>
				<span>
					Game<Switch
						onChange={() => {
							this.handleFilterChange('gameChatFilter');
						}}
						checked={gameChatFilter}
						size="small"
					/>
				</span>
			</div>
		);
	}

	renderInputForm() {
		const { chatInputValue } = this.state;

		return (
			<Form onSubmit={this.handleChatFormSubmit}>
				<Input
					placeholder="Chat"
					onChange={e => {
						this.updateState('chatInputValue', e.target.value);
					}}
					value={chatInputValue}
				/>
				<Button type="primary" onClick={this.handleChatFormSubmit} disabled={!chatInputValue}>
					Chat
				</Button>
			</Form>
		);
	}

	render() {
		return (
			<section className="gamechat-container">
				{this.renderHeader()}
				{this.renderInputForm()}
			</section>
		);
	}
}

Gamechat.propTypes = {};

export default Gamechat;
