import React, { createContext } from 'react';

const NotefulContext = createContext({
  folders: [],
  notes: [],
  addNote: () => {}
});

export default NotefulContext;