import React from 'react'; // eslint-disable-line
import Main from './Main.container';
import { Main as MainComponent } from './Main';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Enzyme.configure({ adapter: new Adapter() });

describe('Main container', () => {
	it('should initialize correctly', () => {
		const component = shallow(<Main />);

		expect(component).toHaveLength(1);
	});
});

describe('Main component', () => {
	it('should initialize correctly', () => {
		const component = shallow(<MainComponent />);

		expect(component).toHaveLength(1);
	});
});
