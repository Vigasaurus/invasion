import React from 'react'; // eslint-disable-line
import Mid from './Mid';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Mid component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Mid />);

		expect(component).toHaveLength(1);
	});
});
