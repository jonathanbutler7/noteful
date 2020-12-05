import React from 'react';
import { Link } from 'react-router-dom';
import { useNoteful } from '../../NotefulContext';
import FolderSelect from '../FolderList/FolderList';
import NoteDisplay2 from '../NoteList/NoteList';
import styles from './NoteDetails.module.scss';
import axios from 'axios';
import moment from 'moment';

function NoteDetailsF(props) {
  const { notes, serverUrl } = useNoteful();
  const params = props.location.search;

  let noteId = parseInt(params.split('=')[1]);
  let foundNote = notes.find((item) => item.id === noteId);
  // let foundNote = notes.find((item) => console.log(item.id));

  let readableDate = '';
  let folderId = '';
  if (foundNote) {
    folderId = foundNote.folderId;
    const time = Math.floor(Date.parse(foundNote.date_created) / 1000);
    readableDate = moment.unix(time).format('LLL');
  }

  async function deleteFromApi(id) {
    const url = `${serverUrl}/notes/${id}`;
    try {
      const response = await axios.delete(url);
      const result = response.data;
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.fullDisplay}>
      <FolderSelect />
      <NoteDisplay2 folderId={folderId} />
      {foundNote && (
        <div className={styles.note__box}>
          <h2>{foundNote.note_name}</h2>
          <p>Content: {foundNote.content}</p>
          <p>Last modified {readableDate}</p>
          <Link to={`edit-note/${foundNote.id}`}>
            <button
              id={styles.folderDelete}
              onClick={() => deleteFromApi(foundNote.id)}
            >
              <h5>Edit</h5>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default NoteDetailsF;
