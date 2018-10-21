import React from 'react';
import Modal from './Modal.jsx';
import { shallow } from 'enzyme';
import axios from 'axios';

describe('Modal component', () => {
  it('renders iframe if its type is video', () => {
    const wrapper = shallow(<Modal type="video" videoId="NraaWUZxWZw" toggleModal={jest.fn()} />);
    expect(wrapper.find('iframe').length).toBe(1);
  });

  const mockFn = jest.fn();
  const wrapper = shallow(
    <Modal
      type="note"
      videoId="NraaWUZxWZw"
      toggleModal={jest.fn()}
      saveNote={mockFn}
    />);
  it('renders form if its type is note', () => {
    expect(wrapper.find('form').length).toBe(1);
  });
  it('calls parent function on submit', async () => {
    console.log(wrapper.find('button').length);
    wrapper.find('button').simulate('click');
    await wrapper.update();
    await expect(mockFn.mock.calls.length).toBe(1);
  });
});
