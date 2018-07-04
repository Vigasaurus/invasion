import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export class Gamelist extends React.Component {
	// render() {
	// 	return (
	// 		<section className="gamelist-container">
	// 			{this.props.userInfo.username && (
	// 				<Link to="/game/creategame">
	// 					<Button type="primary" size="large" className="creategame-button" disabled={!this.props.userInfo.username}>
	// 						Create a new game
	// 					</Button>
	// 				</Link>
	// 			)}
	// 		</section>
	// 	);
	// }

	render() {
		const click = () => {
			this.props.socket.emit('createGame', {});
		};

		return (
			<section className="gamelist-container">
				<Button type="primary" size="large" className="creategame-button" onClick={click}>
					Create a new game
				</Button>
			</section>
		);
	}
}

Gamelist.defaultProps = {
	userInfo: {},
};

Gamelist.propTypes = {
	userInfo: PropTypes.object,
};

export default Gamelist;
