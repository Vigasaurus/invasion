import React from 'react'; // eslint-disable-line
import Meters from './Meters';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Meters component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Meters />);

		expect(component).toHaveLength(1);
	});
});
