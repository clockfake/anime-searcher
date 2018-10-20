import React from 'react';

const NotesList = () => {
  const notesArr = JSON.parse(localStorage.getItem('userNotes'));
  if (!notesArr) return <div>No notes yet. Try to add some notes for anime you watched.</div>
  return (
    <div>
      {notesArr.sort((a,b) => a.date > b.date ? -1 : 1).map(note => (
        <div className="row" key={note.id}>
          <div className="col-sm-2">
            <img width="110" height="156"  src={note.image} alt={note.title}/>
          </div>
          <p className="col-md-4">{note.title}</p>
          <p className="col-md-2">{`Rate: ${note.rate}/10`}</p>
          <p className="col-md-4">{note.text}</p>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
