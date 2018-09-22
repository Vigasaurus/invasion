import React from 'react'; // eslint-disable-line
import Devhelpers from './Devhelpers';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Devhelpers component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Devhelpers />);

		expect(component).toHaveLength(1);
	});
});
