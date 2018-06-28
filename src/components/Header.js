import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal, Layout } from 'antd';
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
				<Modal
					title="Sign up"
					footer={null}
					visible={this.state.signupModalVisible}
					onCancel={() => {
						this.setState({ signupModalVisible: false });
					}}
				>
					<Form onSubmit={this.handleFormSubmit} className="">
						<FormItem label="Username">
							<Input value={this.state.usernameValue} placeholder="Username" />
						</FormItem>
					</Form>
				</Modal>
				<div className="header-border" onDoubleClick={this.handleBorderDoubleClick} />
			</Header>
		);
	}
}

Header.propTypes = {
	cookies: PropTypes.instanceOf(Cookies),
};

export default withCookies(Header);
