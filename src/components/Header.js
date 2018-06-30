import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal, Layout } from 'antd';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

export class Header extends React.Component {
	state = {
		signupModalVisible: false,
		isCollapsed: false,
	};

	handleSignupClick = () => {
		this.setState({
			signupModalVisible: true,
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

	renderSignupModal() {
		const { signupUsernameValue, signupPassword1Value, signupPassword2Value } = this.state;
		const handleFormSubmit = () => {};

		return (
			<Modal
				title="Sign up"
				footer={null}
				visible={this.state.signupModalVisible}
				onCancel={() => {
					this.setState({ signupModalVisible: false });
				}}
			>
				<Form onSubmit={handleFormSubmit} className="">
					<Input prefix={<Icon type="user" />} value={signupUsernameValue} placeholder="Username" />
					<Input prefix={<Icon type="lock" />} value={signupPassword1Value} placeholder="Password" />
					<Input prefix={<Icon type="lock" />} value={signupPassword2Value} placeholder="Repeat password" />
				</Form>
			</Modal>
		);
	}

	render() {
		const { Header } = Layout;
		const FormItem = Form.Item;

		return this.state.isCollapsed ? (
			<div className="header-border collapsed" onDoubleClick={this.handleBorderDoubleClick}>
				<Icon type="down" />
			</div>
		) : (
			<Header className="app-header">
				<Button.Group>
					<Button type="primary">Sign in</Button>
					<Button type="primary" onClick={this.handleSignupClick}>
						Sign up
					</Button>
				</Button.Group>
				{this.renderSignupModal()}

				<div className="header-border" onDoubleClick={this.handleBorderDoubleClick} />
			</Header>
		);
	}
}

Header.propTypes = {
	cookies: PropTypes.instanceOf(Cookies),
};

export default withCookies(Header);
