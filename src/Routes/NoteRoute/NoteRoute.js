import React from 'react';
import NoteDisplay2 from '../../Components/NoteDisplay/NoteDisplay2';
import './NoteRoute.css';
import NotefulContext from '../../NotefulContext';
import FolderSelect from '../../Components/FolderSelect/FolderSelectF';

export default function NoteRoute(props) {
  return (
    <div className='mainDisplay'>
      <FolderSelect />
      <NoteDisplay2 folderId={props.match.params.folderId} />
    </div>
  );
}
