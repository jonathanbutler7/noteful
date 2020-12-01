import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { routes } from './routes';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Header from './Components/Header/Header';
import NotefulContext from './NotefulContext';
import axios from 'axios';
const serverUrl = process.env.REACT_APP_SERVER_URL;

function App() {
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
          setSelectedFolder,
          setSelectedNote,
          selectedFolder,
          selectedNote,
          serverUrl,
        }}
      >
        <Header title={'Noteful'} />
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Switch>
            {routes.map((route, idx) =>
              route.exact ? (
                <Route
                  exact
                  path={route.path}
                  component={route.component}
                  key={idx}
                />
              ) : (
                <Route
                  path={route.path}
                  component={route.component}
                  key={idx}
                />
              )
            )}
          </Switch>
        </ErrorBoundary>
      </NotefulContext.Provider>
    </BrowserRouter>
  );
}

export default App;
