import React from 'react'; // eslint-disable-line
import Header from './Header';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Header component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Header />);

		expect(component).toHaveLength(1);
	});
});
