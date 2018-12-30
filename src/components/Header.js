import React, { useState } from 'react';
import { Form, Icon, Input, Button, Modal, Layout } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';

const Header = ({ userInfo, cookies }) => {
	const [signupModalVisible, updateSignupModalVisible] = useState(false);
	const [signinModalVisible, updateSigninModalVisible] = useState(false);
	const [isCollapsed, updateIsCollapsed] = useState(false);
	const [signupUsernameValue, updateSignupUsernameValue] = useState('');
	const [signupPassword1Value, updateSignupPassword1Value] = useState('');
	const [signupPassword2Value, updateSignupPassword2Value] = useState('');
	const [signupSubmitInProgress, updateSignupSubmitInProgress] = useState(false);
	const [signupResponseErrorMessage, updateSignupResponseErrorMessage] = useState('');
	const [signinUsernameValue, updateSigninUsernameValue] = useState('');
	const [signinPasswordValue, updateSigninPasswordValue] = useState('');
	const [signinResponseErrorMessage, updateSigninResponseErrorMessage] = useState('');
	const [signinSubmitInProgress, updateSigninSubmitInProgress] = useState(false);
	const [settingsIconIsHovering, updateSettingsIconIsHovering] = useState(false);

	const handleBorderDoubleClick = () => {
		updateIsCollapsed(!isCollapsed);
		cookies.set('headerIsCollapsed', !isCollapsed);
	};

	const renderSigninModal = () => {
		const handleFormSubmit = e => {
			e.preventDefault();

			updateSigninSubmitInProgress(true);

			axios
				.post('/account/signin', {
					username: signinUsernameValue,
					password: signinPasswordValue,
				})
				.then(res => {
					window.location.pathname = '/game';
				})
				.catch(res => {
					updateSigninResponseErrorMessage(
						res.response.status === 401 ? 'That is the wrong password for that account.' : 'Something went wrong.'
					);
					updateSigninSubmitInProgress(false);
				});
		};
		const validateSubmit = () =>
			!(signinUsernameValue.length > 2 && signinUsernameValue.length < 13 && signinPasswordValue.length > 5);

		return (
			<Modal
				className="signin-modal"
				title="Sign in"
				footer={null}
				visible={signinModalVisible}
				onCancel={() => {
					updateSigninModalVisible(false);
				}}
			>
				<Form onSubmit={handleFormSubmit}>
					<Input
						autoFocus
						prefix={<Icon type="user" />}
						value={signinUsernameValue}
						placeholder="Username"
						onChange={e => {
							updateSigninUsernameValue(e.target.value);
						}}
						className="signin-username"
					/>
					<Input
						type="password"
						prefix={<Icon type="lock" />}
						value={signinPasswordValue}
						placeholder="Password"
						onChange={e => {
							updateSigninPasswordValue(e.target.value);
						}}
						className="signin-password"
					/>
					<Button type="primary" htmlType="submit" disabled={validateSubmit()} loading={signinSubmitInProgress}>
						Submit
					</Button>
					{signinResponseErrorMessage && <span className="form-error-message">{signinResponseErrorMessage}</span>}
				</Form>
			</Modal>
		);
	};

	const renderSignupModal = () => {
		const handleFormSubmit = e => {
			e.preventDefault();

			updateSignupSubmitInProgress(true);

			axios
				.post('/account/signup', {
					username: signupUsernameValue,
					password: signupPassword1Value,
					password2: signupPassword2Value,
				})
				.then(res => {
					window.location.pathname = '/game';
				})
				.catch(res => {
					updateSignupResponseErrorMessage(res.response.data.message);
					updateSignupSubmitInProgress(false);
				});
		};

		const validateSubmit = () =>
			!(
				signupUsernameValue.length > 2 &&
				signupUsernameValue.length < 13 &&
				signupPassword1Value.length > 5 &&
				signupPassword2Value.length > 5 &&
				signupPassword1Value === signupPassword2Value
			);

		return (
			<Modal
				className="signup-modal"
				title="Sign up"
				footer={null}
				visible={signupModalVisible}
				onCancel={() => {
					updateSignupModalVisible(false);
				}}
			>
				<Form onSubmit={handleFormSubmit}>
					<Input
						autoFocus
						prefix={<Icon type="user" />}
						value={signupUsernameValue}
						placeholder="Username - 3-12 alphanumeric characters"
						onChange={e => {
							updateSignupUsernameValue(e.target.value);
						}}
						className="signup-username"
					/>
					<Input
						type="password"
						prefix={<Icon type="lock" />}
						value={signupPassword1Value}
						placeholder="Password - 6+ characters"
						onChange={e => {
							updateSignupPassword1Value(e.target.value);
						}}
						className="signup-password1"
					/>
					<Input
						type="password"
						prefix={<Icon type="lock" />}
						value={signupPassword2Value}
						placeholder="Repeat password"
						onChange={e => {
							updateSignupPassword2Value(e.target.value);
						}}
						className="signup-password2"
					/>
					<Button type="primary" htmlType="submit" disabled={validateSubmit()} loading={signupSubmitInProgress}>
						Submit
					</Button>
					{signupResponseErrorMessage && <span className="form-error-message">{signupResponseErrorMessage}</span>}
				</Form>
			</Modal>
		);
	};

	return isCollapsed ? (
		<div className="header-border collapsed" onDoubleClick={handleBorderDoubleClick}>
			<Icon type="down" />
		</div>
	) : (
		<Layout.Header className="app-header">
			<div className="header-content">
				<a href="/" target="_blank">
					<h1>Invasion</h1>
				</a>
				{userInfo.username ? (
					<div className="header-username">
						{userInfo.username}
						<Link to="/game/settings">
							<Icon
								type="setting"
								spin={settingsIconIsHovering}
								onMouseEnter={() => {
									updateSettingsIconIsHovering(true);
								}}
								onMouseLeave={() => {
									updateSettingsIconIsHovering(false);
								}}
							/>
						</Link>
						<Button
							type="primary"
							onClick={() => {
								window.location.pathname = '/observe';
							}}
						>
							Log out
						</Button>
					</div>
				) : (
					<Button.Group>
						<Button
							type="primary"
							onClick={() => {
								updateSigninModalVisible(true);
							}}
						>
							Sign in
						</Button>
						<Button
							type="primary"
							onClick={() => {
								updateSignupModalVisible(true);
							}}
						>
							Sign up
						</Button>
					</Button.Group>
				)}
				{renderSigninModal()}
				{renderSignupModal()}
			</div>
			<div className="header-border" onDoubleClick={handleBorderDoubleClick} />
		</Layout.Header>
	);
};

Header.propTypes = {
	cookies: PropTypes.instanceOf(Cookies),
	allCookies: PropTypes.object,
	userInfo: PropTypes.object,
};

export default withCookies(Header);
