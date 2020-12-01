import React, { useContext } from 'react';
import NoteDisplay2 from '../../Components/NoteDisplay/NoteDisplay2';
import './NoteRoute.css';
import NotefulContext from '../../NotefulContext';
import FolderSelect from '../../Components/FolderSelect/FolderSelect';

export default function NoteRoute(props) {
  const context = useContext(NotefulContext);
  console.log(context);

  return (
    <div className='mainDisplay'>
      <FolderSelect />
      <NoteDisplay2 folderId={props.match.params.folderId} />
    </div>
  );
}
