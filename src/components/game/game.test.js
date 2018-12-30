import React from 'react'; // eslint-disable-line
import Game from './Game';
import { shallow } from 'enzyme';

describe('Game component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Game />);

		expect(component).toHaveLength(1);
	});
});
