import React from 'react'; // eslint-disable-line
import Game from './Game';
import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Game component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Game />);

		expect(component).toHaveLength(1);
	});
});
