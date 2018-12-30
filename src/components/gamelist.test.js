import React from 'react'; // eslint-disable-line
import Gamelist from './Gamelist';
import { shallow } from 'enzyme';

describe('Gamelist component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Gamelist />);

		expect(component).toHaveLength(1);
	});
});
