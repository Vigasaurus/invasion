import React from 'react'; // eslint-disable-line
import Map from './map';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

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
