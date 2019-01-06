// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Notes.css';
import { fetchNotes, deleteNote } from '../constants';
import type { Note } from '../constants';

type Props = {};
type State = {
  notesArr: ?Array<Note>
}

export default class NotesList extends Component<Props, State> {
  constructor() {
    super();
    let notesArr = fetchNotes();
    this.state = {
      notesArr,
    };
  }

  handleDelete = (id: string) => {
    deleteNote(id);
    if (this.state.notesArr && this.state.notesArr.length) {
      this.setState(({ notesArr }) => ({ notesArr: notesArr.filter(note => note.id !== id) }));
    }
  }

  render() {
    const { notesArr } = this.state;
    if (!notesArr || !notesArr.length) return <div>No notes yet. Try to add some notes for anime you watched.</div>
    return (
      <div className="card__container">
        {notesArr.sort((a,b) => a.date > b.date ? -1 : 1).map(note => (
          <div className="card m-2" key={note.id}>
            <div className="card__heading">
              <img className="card__img"  src={note.image} alt={note.title}/>
              <div className="card__titles pt-4">
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-subtitle  text-muted  mb-2">{`Rate: ${note.rate}/10`}</h6>
              </div>
            </div>
            <p className="card-body m-0 p-3">{note.text}</p>
            <div className="card-footer">
              <Link className="card-link btn btn-link" to={`/title/${note.id}`}>Title link</Link>
              <button className="card-link btn btn-link" onClick={() => this.handleDelete(note.id)}>Delete note</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
