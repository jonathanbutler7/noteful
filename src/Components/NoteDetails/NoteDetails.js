import React from 'react';
import { Link } from 'react-router-dom';
import { useNoteful } from '../../NotefulContext';
import FolderSelect from '../FolderList/FolderList';
import NoteList from '../NoteList/NoteList';
import styles from './NoteDetails.module.scss';
import moment from 'moment';

function NoteDetailsF(props) {
  const { notes } = useNoteful();
  const params = props.location.search;
  let noteId = parseInt(params.split('=')[1]);
  let foundNote = notes.find((item) => item.id === noteId);
  let readableDate = '';
  let folderId = '';
  if (foundNote) {
    folderId = foundNote.folderId;
    const time = Math.floor(Date.parse(foundNote.date_created) / 1000);
    readableDate = moment.unix(time).format('LLL');
  }

  return (
    <div className={styles.fullDisplay}>
      <FolderSelect />
      <NoteList folderId={folderId} />
      {foundNote && (
        <div className={styles.note__box}>
          <h2>{foundNote.note_name}</h2>
          <p><strong>Content:</strong> {foundNote.content}</p>
          <p><strong>Created:</strong> {readableDate}</p>
          <Link to={`edit-note/${foundNote.id}`}>
            <button id={styles.folderDelete}>
              <h5>Edit</h5>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NoteDetailsF;
