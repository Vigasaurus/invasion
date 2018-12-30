import React from 'react'; // eslint-disable-line
import Settings from './Settings';
import { shallow } from 'enzyme';

describe('Settings component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Settings />);

		expect(component).toHaveLength(1);
	});
});
