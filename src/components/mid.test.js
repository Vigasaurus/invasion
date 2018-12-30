import React from 'react'; // eslint-disable-line
import Mid from './Mid';
import { shallow } from 'enzyme';

describe('Mid component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Mid />);

		expect(component).toHaveLength(1);
	});
});
