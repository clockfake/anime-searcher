import React from 'react';
import Header from './Header.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });
const wrapper = shallow(<Header />);

describe('Header component', () => {
  it('renders header logo', () => {
    expect(wrapper.find('.header').length).toBe(1);
  });

});
