import React from 'react';
import Categories, { CategoryRow } from './Categories.jsx';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import axios from 'axios';

axios.get = jest.fn().mockImplementation(() => ({
  status: 200,
  data: Array.from({length: 60}, (i, index) => ({ id: index}))
}));

describe('Categories component', () => {
  it('makes API call on mount', () => {
    sinon.spy(Categories.prototype, 'componentDidMount');
    const wrapper = shallow(<Categories/>);
    expect(Categories.prototype.componentDidMount.callCount).toBe(1);
  });

  it('renders 2 category rows', () => {
    const wrapper = shallow(<Categories/>);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('CategoryRow').length).toBe(2);
    });
  });
});
