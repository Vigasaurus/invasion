import React from 'react'; // eslint-disable-line
import Map from './map';
import { shallow } from 'enzyme';

describe('Map component', () => {
	it('should initialize correctly', () => {
		const component = shallow(
			<Map
				gameInfo={{
					mapState: {},
				}}
			/>
		);

		expect(component).toHaveLength(1);
	});
});
