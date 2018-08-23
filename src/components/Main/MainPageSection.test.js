import React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';
import MainPageSection from './MainPageSection.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { shallow, mount } from 'enzyme';
configure({ adapter: new Adapter() });

axios.get = jest.fn().mockImplementationOnce(() => ({
  status: 200,
  data: [
    {
      id: 1,
      attributes: {
        titles: {
          en: 'K-on'
        },
        posterImage: {
          tiny: ''
        }
      }
    },
    {
      id: 2,
      attributes: {
        titles: {
          en: 'K-on TV-2'
        },
        posterImage: {
          tiny: ''
        }
      }
    },
  ]
}))
  .mockImplementationOnce(() => ({
    status: 500
  }));

describe('HeaderSearch component', () => {
  it('gets data from API on input change', async () => {
    const comp = await shallow(<MainPageSection mode='top-popular'/>);
    await comp.update();
    expect(comp.state('fetchedData')).toBeTruthy();
  });
  it('raises an error on 500 status fetch', async () => {
    const comp = await shallow(<MainPageSection mode='top-popular'/>);
    await comp.update();
    expect(comp.state('isError')).toBeTruthy();
  });
});
