import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
const serverUrl = 'https://noteful-server-11.herokuapp.com';
const NotefulContext = createContext();

export function useNoteful() {
  return useContext(NotefulContext);
}

export function NotefulProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showToast, setShowToast] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [toastRoute, setToastRoute] = useState('/');
  const [isRunning, setIsRunning] = useState(true);
  const [count, setCount] = useState(5);

  useEffect(() => {
    getData('folders');
  }, [folders]);

  useEffect(() => {
    getData('notes');
  }, [notes]);

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

  useEffect(() => {
    setToastMessage('Welcome to Noteful, add some fun folders and notes!');
    setToastRoute(null)
  }, []);

  function restartTimer(route) {
    setIsRunning(true);
    setToastRoute(route)
    setShowToast(true);
    setCount(3);
  }
  
  const value = {
    folders,
    notes,
    setSelectedFolder,
    setSelectedNote,
    selectedFolder,
    selectedNote,
    serverUrl,
    showToast,
    setShowToast,
    toastMessage,
    setToastMessage,
    isRunning,
    setIsRunning,
    count,
    setCount,
    restartTimer,
    toastRoute,
  };

  return (
    <NotefulContext.Provider value={value}>{children}</NotefulContext.Provider>
  );
}

export default NotefulContext;
