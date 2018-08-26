import React from 'react';
import SearchForm from './SearchForm.jsx';
import { shallow } from 'enzyme';
import axios from 'axios';

axios.get = jest.fn().mockImplementation(() => ({
  status: 200,
  data: {data: Array.from({length: 16}, (i, index) => ({id: index}))}
}));

const wrapper = shallow(<SearchForm location={{search: '?displayMode=top-rated&offset=0'}}/>);
wrapper.update();
describe('Search form component', () => {
  it('renders wrapper div on mount', () => {
    setTimeout(() => expect(wrapper.find('.main__list').length).toBe(1));
  });

  it('renders Pagination component', () => {
    setTimeout(() => expect(wrapper.find('Pagination').length).toBe(1));
  });

  it('renders 16 titles', () => {
    setTimeout(() => expect(wrapper.find('.main__item').length).toBe(16));
  });
});
