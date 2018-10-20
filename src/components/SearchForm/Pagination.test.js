import React from 'react';
import Pagination from './Pagination.jsx';
import { shallow } from 'enzyme';

const wrapper = shallow(<Pagination offset={100} limit={16} offset={0} />);

describe('Pagination component', () => {
  it('renders 6 page links on mount', () => {
    expect(wrapper.find('.page-link').length).toBe(7);
  });
});
