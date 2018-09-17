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

		socket.emit('newGamechat', {
			username: userInfo.username,
			uid: gameInfo.info.uid,
			chat: this.state.chatInputValue,
		});

		this.setState({
			chatInputValue: '',
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
					autoFocus
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

	renderGamechats() {
		const { gameInfo } = this.props;

		// {gameInfo.combinedChats
		return (
			<ul>
				{gameInfo.playerChats.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1)).map((chat, index) => (
					<li key={`${chat.username}${index}`}>
						{chat.username}: {chat.chat}
					</li>
				))}
			</ul>
		);
	}

	render() {
		return (
			<section className="gamechat-container">
				{/* {this.renderHeader()} */}
				<div className="chats-container">{this.renderGamechats()}</div>
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
