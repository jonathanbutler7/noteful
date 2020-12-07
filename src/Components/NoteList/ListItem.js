import React from 'react';
import styles from './NoteList.module.scss';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useNoteful } from '../../NotefulContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function ListItem({ note, id }) {
  const {
    serverUrl,
    restartTimer,
    setToastMessage,
    selectedFolder,
  } = useNoteful();
  const time = Math.floor(Date.parse(note.date_created) / 1000);
  const dateString = moment.unix(time).format('LLL');
  const history = useHistory();
  const folderFromPath = history.location.pathname.split('/folder/')[1];
  const folder = selectedFolder === null ? folderFromPath : selectedFolder;

  async function deleteFromApi(id, noteName) {
    const url = `${serverUrl}/api/notes/${id}`;
    try {
      const response = await axios.delete(url);
      const result = response.data;
      restartTimer(`/folder/${folder}`);
      setToastMessage(`Deleted note, '${noteName}'`);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.newnotebox} key={id}>
      <Link to={`/note?id=${note.id}`}>
        <h2 className={styles.noteTitle}>{note.note_name}</h2>
        <div className={styles.noteDetails}>
          <p>
            <strong>Created: </strong>
            {dateString}
          </p>
          <button
            id={styles.folderDelete}
            onClick={() => deleteFromApi(note.id, note.note_name)}
          >
            <h5>Delete</h5>
          </button>
        </div>
      </Link>
    </div>
  );
}

export default ListItem;
