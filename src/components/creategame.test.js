import React from 'react'; // eslint-disable-line
import Creategame from './Creategame';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Creategame component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Creategame />);

		expect(component).toHaveLength(1);
	});
});
