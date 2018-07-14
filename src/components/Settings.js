import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Switch, Icon } from 'antd';
import { Link } from 'react-router-dom';

const Settings = ({ userInfo, socket }) => {
	const handleSettingToggle = (type, event) => {
		socket.emit('updateUserSettings', {
			type,
			value: event,
		});
	};

	return (
		<section className="settings-container">
			<Link to="/game" className="settings-close-button">
				<Icon type="close" />
			</Link>
			<h1>Settings for {userInfo.username}</h1>
			<Row>
				<Col span={6} className="centered-item">
					<p>Enable Timestamps</p>
					<Switch
						checked={userInfo.timestampsEnabled}
						onChange={e => {
							handleSettingToggle('timestampsEnabled', e);
						}}
					/>
				</Col>
				<Col span={6} className="centered-item">
					<p>Disable help popups</p>
					<Switch
						checked={userInfo.helpDisabled}
						onChange={e => {
							handleSettingToggle('helpDisabled', e);
						}}
					/>
				</Col>
			</Row>
		</section>
	);
};

Settings.propTypes = {
	userInfo: PropTypes.object,
	socket: PropTypes.object,
};

export default Settings;
