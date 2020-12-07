import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NoteList.module.scss';
import { useNoteful } from '../../NotefulContext';
import Note from './Note';

function NoteList() {
  const { selectedFolder, notes } = useNoteful();
  const newNotesList = notes.filter((i) => i.folder_id === selectedFolder);

  return (
    <div className={styles.notebox}>
      <h2>
        Notes{' '}
        <span aria-label='jsx-a11y/accessible-emoji' role='img'>
          ✏️
        </span>
      </h2>
      {newNotesList.map((note, id) => (
        <Note note={note} id={id} key={id} />
      ))}
      <div className={styles.addButton}>
        <Link to={'/add-note'} name='linkToAddNote'>
          <h5>Add note</h5>
        </Link>
      </div>
    </div>
  );
}

export default NoteList;
