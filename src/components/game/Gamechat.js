import React from 'react';
import { Switch, Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

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
		const { userInfo, gameInfo, socket } = this.props;
		e.preventDefault();
		console.log(gameInfo);

		socket.emit('newGamechat', {
			username: userInfo.username,
			uid: gameInfo.info.uid,
			chat: this.state.chatInputValue,
		});
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

Gamechat.propTypes = {
	userInfo: PropTypes.object,
	gameInfo: PropTypes.object,
	socket: PropTypes.object,
};

export default Gamechat;
