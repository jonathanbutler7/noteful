import React from 'react';
import NoteDisplay2 from '../../Components/NoteDisplay/NoteDisplay';
import './NoteRoute.css';
import FolderSelect from '../../Components/FolderSelect/FolderSelect';

export default function NoteRoute(props) {
  return (
    <div className='mainDisplay'>
      <FolderSelect />
      <NoteDisplay2 folderId={props.match.params.folderId} />
    </div>
  );
}
