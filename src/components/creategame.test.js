import React from 'react'; // eslint-disable-line
import Creategame from './Creategame';
import { shallow } from 'enzyme';

describe('Creategame component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Creategame />);

		expect(component).toHaveLength(1);
	});
});
