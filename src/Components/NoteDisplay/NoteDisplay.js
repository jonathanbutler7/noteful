import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './NoteDisplay.css';
import NotefulContext from '../../NotefulContext';
import axios from 'axios';

function NoteDisplayF() {
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
    <div className='notebox'>
      {newNotesList.map((note, id) => {
        let newMod = new Date(note.date_created);
        let month = newMod.getMonth();
        let day = newMod.getDay();
        let year = newMod.getFullYear();
        return (
          <div className='newnotebox' key={id}>
            <Link to={`/note?name=${note.id}`}>
              <h2 className='noteTitle'>{note.note_name}</h2>
              <div className='noteDetails'>
                <p>Last modified {`${month + 1}/${day}/${year}`}</p>
                <button
                  id='folderDelete'
                  onClick={() => deleteFromApi(note.id)}
                >
                  <h5>Delete</h5>
                </button>
              </div>
            </Link>
          </div>
        );
      })}
      <div className='addFolderButton'>
        <Link to={'/add-note'} name='linkToAddNote'>
          <h5>Add note</h5>
        </Link>
      </div>
    </div>
  );
}

export default NoteDisplayF;
