import React from 'react';
import styles from './NoteList.module.scss';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useNoteful } from '../../NotefulContext';
import axios from 'axios';

function Note({ note, id }) {
  const { serverUrl } = useNoteful();
  const time = Math.floor(Date.parse(note.date_created) / 1000);
  var dateString = moment.unix(time).format('LLL');

  async function deleteFromApi(id) {
    const url = `${serverUrl}/api/notes/${id}`;
    try {
      const response = await axios.delete(url);
      const result = response.data;
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.newnotebox} key={id}>
      <Link to={`/note?id=${note.id}`}>
        <h2 className={styles.noteTitle}>{note.note_name}</h2>
        <div className={styles.noteDetails}>
          <p><strong>Last modified: </strong>{dateString}</p>
          <button
            id={styles.folderDelete}
            onClick={() => deleteFromApi(note.id)}
          >
            <h5>Delete</h5>
          </button>
        </div>
      </Link>
    </div>
  );
}

export default Note;
