import React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import HeaderSearch from './HeaderSearch.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { shallow, mount } from 'enzyme';

configure({ adapter: new Adapter() });

describe('HeaderSearch component', () => {

  // const mountWithRouter = node => mount(<Router>{node}</Router>);
  beforeEach((done) => {
       setTimeout(() => {
           done();
       }, 4500);
   });

  it('gets data from API on input change', async (done) => {
    // const res = {
    //   status: 200,
    //   data: [
    //     {
    //       id: 1,
    //       name: 'K-on',
    //     },
    //     {
    //       id: 2,
    //       name: 'K-on TV-2',
    //     }
    //   ]
    // };
    // axios.get = jest.fn().mockImplementation(res);
    const comp = await shallow(<HeaderSearch history={{listen: () => null}}/>);
    comp.find('input').simulate('change',{target: {value: 'K-on'}});
    await comp.update();
    await comp.update();
    // await done();
    console.log(comp.state());
    await expect(comp.state('fetchedData')).toBeTruthy();
  });
});
