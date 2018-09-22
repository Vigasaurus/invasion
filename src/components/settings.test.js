import React from 'react'; // eslint-disable-line
import Settings from './Settings';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Settings component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Settings />);

		expect(component).toHaveLength(1);
	});
});
