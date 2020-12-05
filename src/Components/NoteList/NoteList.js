import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './NoteList.module.scss';
import NotefulContext from '../../NotefulContext';
import axios from 'axios';
import moment from 'moment';

function NoteList() {
  const { serverUrl, selectedFolder, notes } = useContext(NotefulContext);
  const newNotesList = notes.filter((i) => i.folder_id === selectedFolder);

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
    <div className={styles.notebox}>
      <h2>Notes ✏️</h2>
      {newNotesList.map((note, id) => {
        const time = Math.floor(Date.parse(note.date_created) / 1000);
        var dateString = moment.unix(time).format('LLL');
        return (
          <div className={styles.newnotebox} key={id}>
            <Link to={`/note?id=${note.id}`}>
              <h2 className={styles.noteTitle}>{note.note_name}</h2>
              <div className={styles.noteDetails}>
                <p>{dateString}</p>
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
      })}
      <div className={styles.addButton}>
        <Link to={'/add-note'} name='linkToAddNote'>
          <h5>Add note</h5>
        </Link>
      </div>
    </div>
  );
}

export default NoteList;
