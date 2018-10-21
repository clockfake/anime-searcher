import React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import HeaderSearch from './HeaderSearch.jsx';
import axios from 'axios';
import { shallow, mount } from 'enzyme';

describe('HeaderSearch component', () => {

  it('gets data from API on input change', async () => {
    const comp = await shallow(<HeaderSearch history={{listen: () => null}}/>);
    comp.find('input').simulate('change',{target: {value: 'Book'}});
    await comp.update();
    await expect(comp.state('inputValue')).toBe('Book');
  });
});
