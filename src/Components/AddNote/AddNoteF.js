import React, { useState, useContext } from 'react';
import NotefulContext from '../../NotefulContext';
import './AddNote.css';
import ValidationError from '../ValidationError/ValidationError';
import axios from 'axios';

function AddNoteF() {
  const { folders, serverUrl } = useContext(NotefulContext);
//   const [note, setNote] = useState('');
  const [noteName, setNoteName] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [folderId, setFolderId] = useState('');
  const [modified, setModified] = useState('');
  const [noteValue, setNoteValue] = useState(false);
  const [folderValue, setFolderValue] = useState(false);
  const [contentValue, setContentValue] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

//   function updateNote(val) {
//     setNote(val);
//     setNoteValue(true);
//     !val.length && setNoteValue(false);
//   }

  function updateNoteContent(note) {
    setNoteContent(note);
    setContentValue(true);
    !note.length && contentValue(false);
  }

  function updateFolderId(id) {
    console.log(id);
    setFolderId(parseInt(id));
    setFolderValue(true);
    //   !folderId.length && setFolderValue(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const note = {
      note_name: noteName,
      content: noteContent,
      folder_id: folderId,
    };
    const url = `${serverUrl}/api/notes`;
    console.log(url, note);
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
    <div className='viewport'>
      <h2>Add Note:</h2>
      <div className='addNoteForm'>
        <label className='input' htmlFor='noteName'>
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
          id='select-folder'
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
        <label className='input' htmlFor='noteContent'>
          <h4>Content:</h4>
        </label>
        <textarea
          type='textarea'
          id='textarea'
          name='noteContent'
          placeholder='Content...'
          onChange={(e) => updateNoteContent(e.target.value)}
        />
        {errorMsg && <ValidationError message={errorMsg} />}
        <button className='addButton' onClick={(e) => validateFolderEntry(e)}>
          <h5>Add</h5>
        </button>
      </div>
    </div>
  );
}

export default AddNoteF;
