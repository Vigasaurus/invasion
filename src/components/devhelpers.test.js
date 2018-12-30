import React from 'react'; // eslint-disable-line
import Devhelpers from './Devhelpers';
import { shallow } from 'enzyme';

describe('Devhelpers component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Devhelpers />);

		expect(component).toHaveLength(1);
	});
});
