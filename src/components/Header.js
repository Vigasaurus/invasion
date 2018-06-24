import React from 'react';
import { Modal, Layout, Button } from 'antd';

export class Header extends React.Component {
	state = {
		signupModalVisible: false,
	};

	handleSignupClick = () => {
		this.setState({
			signupModalVisible: true,
		});
	};

	render() {
		const { Header } = Layout;

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
					visible={this.state.signupModalVisible}
					onOk={() => {
						console.log('ok');
					}}
					onCancel={() => {
						this.setState({ signupModalVisible: false });
						console.log('cancel');
					}}
				>
					<p>Username</p>
				</Modal>
			</Header>
		);
	}
}

Header.propTypes = {};

export default Header;
