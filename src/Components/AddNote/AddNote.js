import React, { useState, useContext } from 'react';
import NotefulContext from '../../NotefulContext';
import styles from './AddNote.module.scss';
import ValidationError from '../ValidationError/ValidationError';
import axios from 'axios';

function AddNoteF() {
  const { folders, serverUrl } = useContext(NotefulContext);
  const [noteName, setNoteName] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [folderId, setFolderId] = useState('');
  const [folderValue, setFolderValue] = useState(false);
  const [contentValue, setContentValue] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function updateNoteContent(note) {
    setNoteContent(note);
    setContentValue(true);
    !note.length && contentValue(false);
  }

  function updateFolderId(id) {
    console.log(id);
    setFolderId(parseInt(id));
    setFolderValue(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const note = {
      note_name: noteName,
      content: noteContent,
      folder_id: folderId,
    };
    const url = `${serverUrl}/api/notes`;
    try {
      const response = axios.post(url, note);
      const result = response.data;
      console.log(result);
      window.location.href = `/folder/${folderId}`;
    } catch (error) {
      setErrorMsg(error);
    }
  }

  function validateFolderEntry(e) {
    console.log(noteName, contentValue, folderValue);
    !noteName || !contentValue || !folderValue
      ? setErrorMsg('all fields are required')
      : handleSubmit(e);
  }

  return (
    <div className={styles.viewport}>
      <h2>Add Note:</h2>
      <div className={styles.addNoteForm}>
        <label className={styles.input} htmlFor='noteName'>
          <h4>Name:</h4>
        </label>
        <input
          type='text'
          name='noteName'
          placeholder='Name...'
          onChange={(e) => setNoteName(e.target.value)}
        />
        <label htmlFor='select-folder'>
          <h4>Select folder:</h4>
        </label>
        <select
          name='select-folder'
          // id={styles.selectFolder}
          onChange={(e) => updateFolderId(e.target.value)}
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
          id={styles.textarea}
          name='noteContent'
          placeholder='Content...'
          onChange={(e) => updateNoteContent(e.target.value)}
        />
        {errorMsg && <ValidationError message={errorMsg} />}
        <button className={styles.addButton} onClick={(e) => validateFolderEntry(e)}>
          <h5>Add</h5>
        </button>
      </div>
    </div>
  );
}

export default AddNoteF;
