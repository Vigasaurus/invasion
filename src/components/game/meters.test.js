import React from 'react'; // eslint-disable-line
import Meters from './Meters';
import { shallow } from 'enzyme';

describe('Meters component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Meters />);

		expect(component).toHaveLength(1);
	});
});
