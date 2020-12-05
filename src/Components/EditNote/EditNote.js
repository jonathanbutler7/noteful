import React, { useState } from 'react';
import { useNoteful } from '../../NotefulContext';
import styles from '../AddNote/AddNote.module.scss';
import { Link } from 'react-router-dom';

function EditNote() {
  const { folders, notes, serverUrl } = useNoteful();
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

  function sendPatch(e) {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      content: content,
      note_name: noteName,
      folder_id: folderId,
    });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log(folderId);
    fetch(`${serverUrl}/api/notes/${noteId}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        window.location.href = `/folder/${folderId}`;
      })
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
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
