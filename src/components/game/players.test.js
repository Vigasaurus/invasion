import React from 'react'; // eslint-disable-line
import Players from './Players';
import { shallow } from 'enzyme';

describe('Players component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Players />);

		expect(component).toHaveLength(1);
	});
});
