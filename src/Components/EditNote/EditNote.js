import React, { useState } from 'react';
import { useNoteful } from '../../NotefulContext';
import styles from '../AddNote/AddNote.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

function EditNote() {
  const {
    folders,
    notes,
    serverUrl,
    restartTimer,
    setToastMessage,
  } = useNoteful();
  const [noteName, setNoteName] = useState();
  const [folderId, setFolderId] = useState();
  const [content, setContent] = useState();

  let noteId = parseInt(window.location.href.split('/edit-note/')[1]);
  let foundNote = notes.find((item) => item.id === noteId);
  let note_name;
  let note_content;
  if (foundNote) {
    note_name = foundNote.note_name;
    note_content = foundNote.content;
  }

  async function sendPatch(e) {
    e.preventDefault();
    const url = `${serverUrl}/api/notes/${noteId}`;
    const newNote = {
      content,
      note_name: noteName,
      folder_id: folderId,
    };
    try {
      const response = await axios.patch(url, newNote);
      const result = response.data;
      restartTimer();
      setToastMessage(`Edited note called '${noteName}'`);
      return result;
      // window.location.href = `/folder/${folderId}`;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.viewport}>
      <h2>Edit Note:</h2>
      <div className={styles.addNoteForm}>
        <label className={styles.input} htmlFor='noteName'>
          <h4>Name:</h4>
        </label>
        <input
          type='text'
          name='noteName'
          placeholder={note_name}
          onChange={(e) => setNoteName(e.target.value)}
        />
        <label htmlFor='select-folder'>
          <h4>Select folder:</h4>
        </label>
        <select
          name='select-folder'
          id='select-folder'
          onChange={(e) => setFolderId(e.target.value)}
        >
          <option value='--Select folder--'>--Select folder--</option>
          {folders.map((item) => {
            return (
              <option id={item.id} key={item.id} value={item.id}>
                {item.folder_name}
              </option>
            );
          })}
        </select>
        <label className={styles.input} htmlFor='noteContent'>
          <h4>Content:</h4>
        </label>
        <textarea
          type='textarea'
          id='textarea'
          name='noteContent'
          placeholder={note_content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Link to={`/note?id=${noteId}`}>
          <button className={styles.addButton} onClick={(e) => sendPatch(e)}>
            <h5>Submit</h5>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EditNote;
