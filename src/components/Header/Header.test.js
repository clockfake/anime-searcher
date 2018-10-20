import React from 'react';
import Header from './Header.jsx';
import { shallow } from 'enzyme';

const wrapper = shallow(<Header />);

describe('Header component', () => {
  it('renders header logo', () => {
    expect(wrapper.find('.navbar-brand').length).toBe(1);
  });
  it('renders HeaderSearch elemenet', () => {
    expect(wrapper.find('HeaderSearch').length).toBe(1);
  })
});
