import React from 'react';
import Main from './Main.jsx';
import MainPageSection from './MainPageSection.jsx';
import Categories from './Categories.jsx';
import { shallow } from 'enzyme';

const wrapper = shallow(<Main />);

describe('Main component', () => {
  it('renders 3 section components', () => {
    expect(wrapper.find(MainPageSection).length).toBe(3);
  });
  it('renders Categories component', () => {
    expect(wrapper.find(Categories).length).toBe(1);
  })
});
