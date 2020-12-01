import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../../NotefulContext';
import FolderSelect from '../FolderSelect/FolderSelect';
import NoteDisplay2 from '../NoteDisplay/NoteDisplay';
import './NoteDetails.css';
import axios from 'axios';

function NoteDetailsF(props) {
  const { notes, serverUrl } = useContext(NotefulContext);
  const params = props.location.search;

  let noteId = parseInt(params.split('=')[1]);
  let foundNote = notes.find((item) => item.id === noteId);
  // let foundNote = notes.find((item) => console.log(item.id));

  let readableDate = '';
  let folderId = '';
  if (foundNote) {
    folderId = foundNote.folderId;
    let newMod = new Date(foundNote.date_created);
    let month = newMod.getMonth();
    let day = newMod.getDay();
    let year = newMod.getFullYear();
    readableDate = `${month + 1}/${day}/${year}`;
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
    <div className='fullDisplay'>
      <FolderSelect />
      <NoteDisplay2 folderId={folderId} />
      {foundNote && (
        //make 55-65 another component in the future
        <div className='note__box'>
          <h2>{foundNote.note_name}</h2>
          <p>Content: {foundNote.content}</p>
          <p>Last modified {readableDate}</p>
          <Link to={`edit-note/${foundNote.id}`}>
            <button
              id='folderDelete'
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
