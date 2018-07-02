import React from 'react';
import { Form, Icon, Input, Button, Modal, Layout } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';

export class Header extends React.Component {
	state = {
		signupModalVisible: false,
		signinModalVisible: false,
		isCollapsed: false,
		signupUsernameValue: '',
		signupPassword1Value: '',
		signupPassword2Value: '',
		signupSubmitInProgress: false,
		signupResponseErrorMessage: '',
		signinUsernameValue: '',
		signinPasswordValue: '',
		signinResponseErrorMessage: '',
		signinSubmitInProgress: false,
		settingsIconIsHovering: false,
	};

	updateState = (stateName, value) => {
		this.setState({ [stateName]: value });
	};

	handleSignupClick = () => {
		this.setState({
			signupModalVisible: true,
		});
	};

	handleSigninClick = () => {
		this.setState({
			signinModalVisible: true,
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
	};

	handleBorderDoubleClick = () => {
		const { isCollapsed } = this.state;

		this.setState({ isCollapsed: !isCollapsed }, () => {
			this.props.cookies.set('headerIsCollapsed', !isCollapsed);
		});
	};

	handleLogoutClick = () => {
		window.location.pathname = '/observe/';
	};

	handleSettingIconHover = () => {
		console.log('Hello, World!');
	};

	renderSigninModal() {
		const { signinUsernameValue, signinPasswordValue, signinSubmitInProgress, signinResponseErrorMessage } = this.state;
		const handleFormSubmit = e => {
			e.preventDefault();

			this.updateState('signinSubmitInProgress', true);
			axios
				.post('/account/signin', {
					username: signinUsernameValue,
					password: signinPasswordValue,
				})
				.then(res => {
					if (window.location.pathname === '/observe/') {
						window.location.pathname = '/game/';
					} else {
						window.location.reload();
					}
				})
				.catch(res => {
					this.setState({
						signinResponseErrorMessage:
							res.response.status === 401 ? 'That is the wrong password for that account.' : 'Something went wrong.',
						signinSubmitInProgress: false,
					});
				});
		};
		const validateSubmit = () =>
			!(signinUsernameValue.length > 2 && signinUsernameValue.length < 13 && signinPasswordValue.length > 5);

		return (
			<Modal
				className="signin-modal"
				title="Sign in"
				footer={null}
				visible={this.state.signinModalVisible}
				onCancel={() => {
					this.updateState('signinModalVisible', false);
				}}
			>
				<Form onSubmit={handleFormSubmit}>
					<Input
						autoFocus
						prefix={<Icon type="user" />}
						value={signinUsernameValue}
						placeholder="Username"
						onChange={e => {
							this.updateState('signinUsernameValue', e.target.value);
						}}
						className="signin-username"
					/>
					<Input
						type="password"
						prefix={<Icon type="lock" />}
						value={signinPasswordValue}
						placeholder="Password"
						onChange={e => {
							this.updateState('signinPasswordValue', e.target.value);
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
	}

	renderSignupModal() {
		const {
			signupUsernameValue,
			signupPassword1Value,
			signupPassword2Value,
			signupSubmitInProgress,
			signupResponseErrorMessage,
		} = this.state;
		const handleFormSubmit = e => {
			e.preventDefault();

			this.updateState('signupSubmitInProgress', true);
			axios
				.post('/account/signup', {
					username: signupUsernameValue,
					password: signupPassword1Value,
					password2: signupPassword2Value,
				})
				.then(res => {
					if (window.location.pathname === '/observe/') {
						window.location.pathname = '/game/';
					} else {
						window.location.reload();
					}
				})
				.catch(res => {
					this.setState({
						signupResponseErrorMessage: res.response.data.message,
						signupSubmitInProgress: false,
					});
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
				visible={this.state.signupModalVisible}
				onCancel={() => {
					this.updateState('signupModalVisible', false);
				}}
			>
				<Form onSubmit={handleFormSubmit}>
					<Input
						autoFocus
						prefix={<Icon type="user" />}
						value={signupUsernameValue}
						placeholder="Username - 3-12 alphanumeric characters"
						onChange={e => {
							this.updateState('signupUsernameValue', e.target.value);
						}}
						className="signup-username"
					/>
					<Input
						type="password"
						prefix={<Icon type="lock" />}
						value={signupPassword1Value}
						placeholder="Password - 6+ characters"
						onChange={e => {
							this.updateState('signupPassword1Value', e.target.value);
						}}
						className="signup-password1"
					/>
					<Input
						type="password"
						prefix={<Icon type="lock" />}
						value={signupPassword2Value}
						placeholder="Repeat password"
						onChange={e => {
							this.updateState('signupPassword2Value', e.target.value);
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
	}

	render() {
		const { userInfo } = this.props;
		const { Header } = Layout;

		return this.state.isCollapsed ? (
			<div className="header-border collapsed" onDoubleClick={this.handleBorderDoubleClick}>
				<Icon type="down" />
			</div>
		) : (
			<Header className="app-header">
				<div className="header-content">
					<h1>Invasion</h1>
					{userInfo.username ? (
						<div className="header-username">
							{userInfo.username}
							<Link to="/game/settings">
								<Icon
									type="setting"
									spin={this.state.settingsIconIsHovering}
									onMouseEnter={() => {
										this.updateState('settingsIconIsHovering', true);
									}}
									onMouseLeave={() => {
										this.updateState('settingsIconIsHovering', false);
									}}
								/>
							</Link>
							<Button type="primary" onClick={this.handleLogoutClick}>
								Log out
							</Button>
						</div>
					) : (
						<Button.Group>
							<Button type="primary" onClick={this.handleSigninClick}>
								Sign in
							</Button>
							<Button type="primary" onClick={this.handleSignupClick}>
								Sign up
							</Button>
						</Button.Group>
					)}
					{this.renderSigninModal()}
					{this.renderSignupModal()}
				</div>
				<div className="header-border" onDoubleClick={this.handleBorderDoubleClick} />
			</Header>
		);
	}
}

Header.propTypes = {
	cookies: PropTypes.instanceOf(Cookies),
	allCookies: PropTypes.object,
	userInfo: PropTypes.object,
};

export default withCookies(Header);
