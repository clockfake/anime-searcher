import React from 'react';
import Header from './Header.jsx';
import { shallow } from 'enzyme';

const wrapper = shallow(<Header />);

describe('Header component', () => {
  it('renders header logo', () => {
    expect(wrapper.find('.header').length).toBeGreaterThan(0);
  });
  it('renders HeaderSearch elemenet', () => {
    expect(wrapper.find('HeaderSearch').length).toBeGreaterThan(0);
  })
});
