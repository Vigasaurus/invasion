import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Switch, Icon } from 'antd';
import { Link } from 'react-router-dom';

const Settings = ({ userInfo, socket }) => {
	const handleTimestampToggle = e => {
		socket.emit('updateUserSettings', {
			type: 'timestampsEnabled',
			value: e,
		});
	};

	console.log(userInfo, 'ui');

	return (
		<section className="settings-container">
			<Link to="/game" className="settings-close-button">
				<Icon type="close" />
			</Link>
			<h1>Settings for {userInfo.username}</h1>
			<Row>
				<Col span={6} className="centered-item">
					<p>Enable Timestamps</p>
					<Switch checked={userInfo.timestampsEnabled} onChange={handleTimestampToggle} />
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
