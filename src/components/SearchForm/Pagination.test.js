import React from 'react';
import Pagination from './Pagination.jsx';
import { shallow } from 'enzyme';

const wrapper = shallow(<Pagination/>);

describe('Pagination component', () => {
  it('renders 6 page links on mount', () => {
    expect(wrapper.find('PageLink').length).toBe(6);
  });
});
