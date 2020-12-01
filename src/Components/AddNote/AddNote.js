import React, { useState, useContext } from 'react';
import NotefulContext from '../../NotefulContext';
import styles from './AddNote.module.scss';
import ValidationError from '../ValidationError/ValidationError';
import axios from 'axios';

function AddNote() {
  const { folders, serverUrl } = useContext(NotefulContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [note, setNote] = useState({
    name: '',
    content: '',
    folderId: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, content, folderId } = note;
    const newNote = {
      note_name: name,
      content: content,
      folder_id: parseInt(folderId),
    };

    const url = `${serverUrl}/api/notes`;
    try {
      const response = axios.post(url, newNote);
      const result = response.data;
      console.log(result);
      window.location.href = `/folder/${folderId}`;
    } catch (error) {
      setErrorMsg(error);
    }
  }

  function validateFolderEntry(e) {
    const { name, content, folderId } = note;
    !name || !content || !folderId
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
          name='name'
          placeholder='Name...'
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor='select-folder'>
          <h4>Select folder:</h4>
        </label>
        <select name='folderId' onChange={(e) => handleChange(e)}>
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
          name='content'
          placeholder='Content...'
          onChange={(e) => handleChange(e)}
        />
        {errorMsg && <ValidationError message={errorMsg} />}
        <button
          className={styles.addButton}
          onClick={(e) => validateFolderEntry(e)}
        >
          <h5>Add</h5>
        </button>
      </div>
    </div>
  );
}

export default AddNote;
