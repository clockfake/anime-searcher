import React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import HeaderSearch from './HeaderSearch.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { shallow, mount } from 'enzyme';

configure({ adapter: new Adapter() });

describe('HeaderSearch component', () => {

  it('gets data from API on input change', async () => {
    const comp = await shallow(<HeaderSearch history={{listen: () => null}}/>);
    comp.find('input').simulate('change',{target: {value: 'K-on'}});
    await comp.update();
    await expect(comp.state('inputValue')).toBe('K-on');
  });
});
