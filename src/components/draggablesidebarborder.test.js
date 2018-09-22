import React from 'react'; // eslint-disable-line
import DraggableSidebarBorder from './DraggableSidebarBorder';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('DraggableSidebarBorder component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<DraggableSidebarBorder />);

		expect(component).toHaveLength(1);
	});
});
