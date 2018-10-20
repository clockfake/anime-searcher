import React from 'react';
import NotesList from './NotesList.jsx';
import { shallow } from 'enzyme';

const wrapper = shallow(<NotesList />);
wrapper.update();
describe('Notes list component', () => {
  const userNotes = localStorage.getItem('userNotes') && JSON.parse(localStorage.getItem('userNotes'));
  it('renders user notes', () => {
    expect(wrapper.find('.user-note').length).toBe(userNotes.length);
  })
});
