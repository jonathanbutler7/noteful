import React, { useEffect, useState } from 'react';
import './App.css';
import FolderSelect from './Components/FolderList/FolderList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NoteRoute from './Components/NoteRoute/NoteRoute';
import Error from './Components/ErrorPage/ErrorPage';
import Header from './Components/Header/Header';
import NotefulContext from './NotefulContext';
import AddFolder from './Components/AddFolder/AddFolder';
import NoteDetails from './Components/NoteDetails/NoteDetails';
import AddNote from './Components/AddNote/AddNote';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import EditNote from './Components/EditNote/EditNote';
import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

function AppF() {
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

  return (
    <BrowserRouter>
      <NotefulContext.Provider
        value={{
          folders,
          notes,
          setSelectedFolder: setSelectedFolder,
          setSelectedNote: setSelectedNote,
          selectedFolder,
          selectedNote,
          serverUrl: serverUrl,
        }}
      >
        <Header title={'Noteful'} />
        <ErrorBoundary>
          <Switch>
            <Route exact path='/' component={FolderSelect} />
            <Route path='/folder/:folderId' component={NoteRoute} />
            <Route path='/add-folder' component={AddFolder} />
            <Route path='/add-note' component={AddNote} />
            <Route exact path='/edit-note/:note_id' component={EditNote} />
            <Route
              path='/note'
              render={(routeProps) => (
                <NoteDetails
                  //route props object with location, history, and match
                  {...routeProps}
                />
              )}
            />
            <Route component={Error} />
          </Switch>
        </ErrorBoundary>
      </NotefulContext.Provider>
    </BrowserRouter>
  );
}

export default AppF;
