import React from 'react'; // eslint-disable-line
import Header from './Header';
import { shallow } from 'enzyme';

describe('Header component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Header />);

		expect(component).toHaveLength(1);
	});
});
