import React from 'react';

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  folderId: [],
  addNote: () => {},
  deleteNote: () => {},
  addFolder: () => {},
  deleteFolder: () => {}
});

export default NotefulContext;