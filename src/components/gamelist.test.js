import React from 'react'; // eslint-disable-line
import Gamelist from './Gamelist';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Gamelist component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Gamelist />);

		expect(component).toHaveLength(1);
	});
});
