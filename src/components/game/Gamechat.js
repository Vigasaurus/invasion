import React from 'react';
import { Switch } from 'antd';
// import PropTypes from 'prop-types';

export class Gamechat extends React.Component {
	state = {
		chatFilter: true,
		gameChatFilter: true,
	};

	handleFilterChange = type => {
		this.setState(prevState => ({
			[type]: !prevState[type],
		}));
	};

	render() {
		const { chatFilter, gameChatFilter } = this.state;

		return (
			<section className="gamechat-container">
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
			</section>
		);
	}
}

Gamechat.propTypes = {};

export default Gamechat;
