import React from 'react'; // eslint-disable-line
import DraggableSidebarBorder from './DraggableSidebarBorder';
import { shallow } from 'enzyme';

describe('DraggableSidebarBorder component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<DraggableSidebarBorder />);

		expect(component).toHaveLength(1);
	});
});
