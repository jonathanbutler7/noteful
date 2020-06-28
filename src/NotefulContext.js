import React from 'react';

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  folderId: [],
  addNote: () => {},
  deleteNote: () => {},
  deleteFolder: () => {}
});

export default NotefulContext;