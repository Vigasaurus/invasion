import React from 'react'; // eslint-disable-line
import Gamechat from './Gamechat';
import { shallow } from 'enzyme';

describe('Gamechat component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Gamechat />);

		expect(component).toHaveLength(1);
	});
});
