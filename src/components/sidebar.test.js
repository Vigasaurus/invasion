import React from 'react'; // eslint-disable-line
import Sidebar from './Sidebar';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Sidebar component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Sidebar />);

		expect(component).toHaveLength(1);
	});
});
