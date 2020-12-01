import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './dummy-store';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Header from './Components/Header/Header';
import NotefulContext from './NotefulContext';
import NoteDetails from './Components/NoteDetails/NoteDetails';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

function AppF() {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [error, setError] = useState(true);

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
          <Switch>
            {routes.map((route) =>
              route.exact ? (
                <Route exact path={route.path} component={route.component} />
              ) : (
                <Route path={route.path} component={route.component} />
              )
            )}
            <Route
              path='/note'
              render={(routeProps) => (
                <NoteDetails
                  //route props object with location, history, and match
                  {...routeProps}
                />
              )}
            />
          </Switch>
      </NotefulContext.Provider>
    </BrowserRouter>
  );
}

export default AppF;
