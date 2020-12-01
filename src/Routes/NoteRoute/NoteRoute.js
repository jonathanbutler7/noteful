import React from 'react';
import NoteDisplay2 from '../../Components/NoteList/NoteList';
import './NoteRoute.css';
import FolderSelect from '../../Components/FolderList/FolderList';

export default function NoteRoute(props) {
  return (
    <div className='mainDisplay'>
      <FolderSelect />
      <NoteDisplay2 folderId={props.match.params.folderId} />
    </div>
  );
}
