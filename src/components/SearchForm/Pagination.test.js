import React from 'react';
import Pagination, { PageLink } from './Pagination.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });
const wrapper = shallow(<Pagination displayMode='top-popular' count={10000} offset={0} filterText={null}/>);

describe('Pagination component', () => {
  it('renders 6 page links on mount', () => {
    expect(wrapper.find(PageLink).length).toBe(6);
  });
  // it('renders HeaderSearch elemenet', () => {
  //   expect(wrapper.find(HeaderSearch).length).toBeGreaterThan(0);
  // })
});
