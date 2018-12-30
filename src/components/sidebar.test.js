import React from 'react'; // eslint-disable-line
import Sidebar from './Sidebar';
import { shallow } from 'enzyme';

describe('Sidebar component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Sidebar />);

		expect(component).toHaveLength(1);
	});
});
