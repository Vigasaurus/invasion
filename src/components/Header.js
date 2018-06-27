import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal, Layout } from 'antd';

export class Header extends React.Component {
	state = {
		signupModalVisible: false,
	};

	handleSignupClick = () => {
		this.setState({
			signupModalVisible: true,
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		console.log('submit');
	};

	render() {
		const { Header } = Layout;
		const FormItem = Form.Item;

		return (
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
				<div className="header-border" />
			</Header>
		);
	}
}

Header.propTypes = {};

export default Header;
