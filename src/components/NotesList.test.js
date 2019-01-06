import React from 'react';
import NotesList from './NotesList.jsx';
import { shallow } from 'enzyme';

const notes = JSON.parse('[{"id":"6062","image":"https://media.kitsu.io/anime/poster_images/6062/tiny.jpg?1484811967","title":"Nichijou - My Ordinary Life","rate":5,"text":"TODO: watch","date":"2019-01-05T11:09:33.152Z"},{"id":"11999","image":"https://media.kitsu.io/anime/poster_images/11999/tiny.jpg?1471880680","title":"Yuri!!! On ICE","rate":5,"text":"TODO: watch","date":"2019-01-05T11:11:08.733Z"}]');
const fetchNotes = jest.fn().mockImplementation(() => notes);
const deleteNote = jest.fn();

describe('Notes list component', () => {
  const wrapper = shallow(<NotesList />);
  it('renders user notes', () => {
    setTimeout(() => {
      expect(wrapper.find('.user-note').length).toBe(2);
    });
  });

  it('handles note delete', () => {
    setTimeout(() => {
      wrapper.find('button').simulate('click');
      expect(wrapper.find('.user-note').length).toBe(1);
    })
  });
});
