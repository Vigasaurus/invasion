import React from 'react'; // eslint-disable-line
import Main from './Main.container';
import { Main as MainComponent } from './Main';
import { shallow } from 'enzyme';

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
