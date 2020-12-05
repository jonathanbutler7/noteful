import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const NotefulContext = React.createContext({});
const serverUrl = 'https://noteful-server-11.herokuapp.com';

export function useNoteful() {
  return useContext(NotefulContext);
}

export function NotefulProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    getData('folders');
    getData('notes');
  }, []);

  async function getData(param) {
    const url = `${serverUrl}/api/${param}`;
    try {
      const response = await axios.get(url);
      const result = response.data;
      if (param === 'folders') {
        setFolders(result);
      }
      if (param === 'notes') {
        setNotes(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const value = {
    folders,
    notes,
    setSelectedFolder,
    setSelectedNote,
    selectedFolder,
    selectedNote,
    serverUrl,
  };
  return (
    <NotefulContext.Provider value={value}>{children}</NotefulContext.Provider>
  );
}

export default NotefulContext;
