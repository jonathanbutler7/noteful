import React from 'react';
import styles from './NoteRoute.module.scss';
import NoteList from '../NoteList/NoteList';
import FolderList from '../FolderList/FolderList';

export default function NoteRoute(props) {
  return (
    <div className={styles.noteDisplay}>
      <FolderList />
      <NoteList folderId={props.match.params.folderId} />
    </div>
  );
}
