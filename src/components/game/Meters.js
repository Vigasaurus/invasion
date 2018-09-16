import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'antd';

class Meters extends React.Component {
	render() {
		const { gameInfo } = this.props;

		return (
			<section className="meters-container">
				<Progress percent={0} status="active" />
				<Progress percent={0} status="active" />
			</section>
		);
	}
}

Meters.propTypes = {
	gameInfo: PropTypes.object,
};

export default Meters;
