import React from 'react';
import Categories from './Categories.jsx';
import { configure, shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
configure({ adapter: new Adapter() });

axios.get = jest.fn().mockImplementationOnce(() => ({
  status: 200,
  data: [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]
}))
  .mockImplementationOnce(() => ({
    status: 500
  }));

describe('Categories component', () => {
  it('makes API call on mount', () => {
    sinon.spy(Categories.prototype, 'componentDidMount');
    const wrapper = shallow(<Categories/>);
    expect(Categories.prototype.componentDidMount.callCount).toBe(1);
  });
});
