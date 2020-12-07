import React, { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useInterval } from './useInterval';
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

  // function handleIsRunningChange(e) {
  //   setIsRunning(e.target.checked);
  // }

  useEffect(() => {
    getData('folders');
  }, [folders]);

  useEffect(() => {
    getData('notes');
  }, [notes]);

  useEffect(() => {
    setToastMessage('Welcome, add some fun folders and notes!');
  }, []);

  useInterval(() => {
    setShowToast(false);
    // setIsRunning(false);
  }, 3000);

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
    showToast,
    setShowToast,
    toastMessage,
    setToastMessage,
    // isRunning,
    // setIsRunning,
    // count,
    // setCount,
  };

  return (
    <NotefulContext.Provider value={value}>{children}</NotefulContext.Provider>
  );
}

export default NotefulContext;
