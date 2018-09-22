import React from 'react'; // eslint-disable-line
import Players from './Players';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Players component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Players />);

		expect(component).toHaveLength(1);
	});
});
