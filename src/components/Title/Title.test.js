import React from 'react';
import Title from './Title.jsx';
import { shallow } from 'enzyme';
import axios from 'axios';

axios.get = jest.fn().mockImplementation(() => ({
  status: 200,
  data: {data: {id: 439, attributes: {youtubeVideoId: 'NraaWUZxWZw'}}}
}));

const wrapper = shallow(<Title match={{params:{id: 439}}}/>);
wrapper.update();
describe('Title form component', () => {
  it('renders title render child component', () => {
    setTimeout(() => expect(wrapper.find('TitleRender').length).toBe(1));
  });

  it('renders title reviews component', () => {
    setTimeout(() => expect(wrapper.find('TitleReviews').length).toBe(1));
  });

  it('renders video modal on condition', () => {
    wrapper.setState({shouldShowModal: true});
    setTimeout(() => {
      expect(wrapper.find('VideoModal').length).toBe(1);
    });
  });
});
