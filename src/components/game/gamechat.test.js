import React from 'react'; // eslint-disable-line
import Gamechat from './Gamechat';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Gamechat component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Gamechat />);

		expect(component).toHaveLength(1);
	});
});
