import React, { useState, useContext } from 'react';
import NotefulContext from '../../NotefulContext';
import './AddFolder.css';
import ValidationError from '../ValidationError/ValidationError';
import axios from 'axios';

function AddFolderF() {
  const { serverUrl } = useContext(NotefulContext);
  const [folderName, setFolderName] = useState('');
  const [value, setValue] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function updateFolder(folder) {
    setFolderName(folder);
    setValue(true);
    !folder.length && setValue(false);
  }

  function validateFolderEntry(e) {
    const textPresent = value;
    !textPresent ? setErrorMsg('please enter some text') : handleSubmit(e);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const folder_name = folderName;
    const body = { folder_name };
    const url = `${serverUrl}/api/folders`;
    try {
      const response = axios.post(url, body);
      const result = response.data;
      console.log(result);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      setErrorMsg('Failed to add folder to server.');
      setValue(false);
    }
  }

  return (
    <div className='viewport'>
      <h2>Add Folder:</h2>
      <div className='addFolderForm'>
        <label className='input' htmlFor='folderName'>
          <h4>Folder name:</h4>
        </label>

        <input
          type='text'
          placeholder='Folder name...'
          id='folderNameEntry'
          name='folderName'
          onChange={(e) => updateFolder(e.target.value)}
        />
        {!value && errorMsg && <ValidationError message={errorMsg} />}
        <button
          className='addFolderButton'
          onClick={(e) => validateFolderEntry(e)}
        >
          <h5>Add</h5>
        </button>
      </div>
    </div>
  );
}

export default AddFolderF;
