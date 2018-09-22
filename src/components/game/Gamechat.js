import React from 'react';
import { Tabs, Icon, Switch, Form, Input, Button, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TabPane = Tabs.TabPane;

export class Gamechat extends React.Component {
	state = {
		chatFilterVisible: false,
		chatInputValue: '',
		isChatLocked: false,
	};

	componentDidUpdate() {
		if (!this.state.isChatLocked) {
			this.scrollToBottom();
		}
	}

	scrollToBottom = () => {
		if (this.scrollList) {
			this.scrollList.scrollTop = 999999;
		}
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
		const { chatInputValue } = this.state;

		if (!chatInputValue) {
			return;
		}

		const { gameInfo, socket } = this.props;

		socket.emit('newGamechat', {
			uid: gameInfo.info.uid,
			chat: chatInputValue,
		});

		this.setState({
			chatInputValue: '',
		});
	};

	handleCloseButtonClick = e => {
		e.preventDefault();

		const { socket, gameInfo } = this.props;

		socket.emit('leaveGame', gameInfo.info.uid);
	};

	handleChatScroll = () => {
		const { isChatLocked } = this.state;
		const bottomChat = this.scrollList.firstChild;
		const bottomChatPxFromBottom =
			bottomChat.getBoundingClientRect().bottom - this.scrollList.getBoundingClientRect().bottom;

		if (isChatLocked && bottomChatPxFromBottom < 30) {
			this.setState({ isChatLocked: false });
		} else if (!isChatLocked && bottomChatPxFromBottom > 29) {
			this.setState({ isChatLocked: true });
		}
	};

	renderHeader() {
		// const { chatFilter, gameChatFilter } = this.state;

		// return (
		// 	<div className="gamechat-header">
		// 		<span>
		// 			Chat<Switch
		// 				onChange={() => {
		// 					this.handleFilterChange('chatFilter');
		// 				}}
		// 				checked={chatFilter}
		// 				size="small"
		// 			/>
		// 		</span>
		// 		<span>
		// 			Game<Switch
		// 				onChange={() => {
		// 					this.handleFilterChange('gameChatFilter');
		// 				}}
		// 				checked={gameChatFilter}
		// 				size="small"
		// 			/>
		// 		</span>
		// 	</div>
		// );
		const { userInfo, gameInfo } = this.props;
		const { chatFilterVisible } = this.state;

		const closeButton = (
			<React.Fragment>
				<Icon
					type="filter"
					className="chat-filter-icon"
					onClick={() => {
						this.updateState('chatFilterVisible', true);
					}}
				/>
				<Link to={userInfo.username ? '/game/' : '/observe'}>
					<Button onClick={this.handleCloseButtonClick} className="leave-game">
						Leave Game
					</Button>
				</Link>
			</React.Fragment>
		);

		return chatFilterVisible ? (
			<span>filter</span>
		) : (
			<Tabs tabBarExtraContent={chatFilterVisible ? null : closeButton}>
				<TabPane tab={<Icon type="message" />} key="1">
					<div className="chats-container">
						{this.renderGamechats()}
						{this.renderInputForm()}
					</div>
				</TabPane>
				{gameInfo.gameState.isStarted && (
					<TabPane tab={<Icon type="gift" />} key="2">
						<div className="inventory-container">inventory here</div>
					</TabPane>
				)}
			</Tabs>
		);
	}

	renderCloseButton() {
		const { userInfo } = this.props;

		return (
			<Link to={userInfo.username ? '/game' : '/observe'}>
				<Button onClick={this.handleCloseButtonClick} className="leave-game">
					Leave Game
				</Button>
			</Link>
		);
	}

	renderLockButton() {
		const { isChatLocked } = this.state;

		return <Icon className="chat-lock" type={isChatLocked ? 'lock' : 'unlock'} />;
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

		return (
			<ul
				onScroll={this.handleChatScroll}
				ref={el => {
					this.scrollList = el;
				}}
			>
				{gameInfo.playerChats.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1)).map((chat, index) => (
					<li key={`${chat.username}${index}`}>
						{chat.username}
						{chat.isObserver && (
							<Tooltip title="This player is/was an observer">
								<span className="observer-chat"> (Obs)</span>
							</Tooltip>
						)}: {<span className="player-chat">{chat.chat}</span>}
					</li>
				))}
			</ul>
		);
	}

	render() {
		return (
			<section className="gamechat-container">
				{this.renderHeader()}
				{/* {this.renderCloseButton()} */}
				{this.renderLockButton()}
				{/* <div className="chats-container">{this.renderGamechats()}</div> */}
				{/* {this.renderInputForm()} */}
			</section>
		);
	}
}

Gamechat.defaultProps = {
	userInfo: {},
	gameInfo: {
		playerChats: [],
		gameState: {},
	},
};

Gamechat.propTypes = {
	userInfo: PropTypes.object,
	gameInfo: PropTypes.object,
	socket: PropTypes.object,
};

export default Gamechat;
