import React from 'react';
import MainPageSection from './MainPageSection.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import { shallow } from 'enzyme';
configure({ adapter: new Adapter() });

axios.get = jest.fn().mockImplementationOnce(() => ({
  status: 200,
  data: [
    {
      id: 1,
      attributes: {
        titles: {
          en: 'test'
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
          en: 'test TV-2'
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

describe('MainPage section component', () => {
  it('makes API call on mount', async () => {
    const comp = await shallow(<MainPageSection mode='top-popular'/>);
    await comp.update();
    expect(comp.state('fetchedData').length).toBe(2);
  });
  it('raises an error on 500 status fetch', async () => {
    const comp = await shallow(<MainPageSection mode='top-popular'/>);
    await comp.update();
    expect(comp.state('isError')).toBeTruthy();
  });
});
