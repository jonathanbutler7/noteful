import React from 'react';
import './App.css';
import MainPage from './Components/MainPage/MainPage'
import { Route, Switch } from 'react-router-dom'
import dummyStore from './dummy-store'
import FolderRoute from './Routes/FolderRoute/FolderRoute'
import NoteRoute from './Routes/NoteRoute/NoteRoute'
import Error from './Components/ErrorPage/ErrorPage'
import Header from './Components/Header/Header'
import NotefulContext from './NotefulContext';

function deleteNoteRequest(noteId, callback) {

}

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

  // componentDidMount() {
  //   fetch()
  // }

  render() {
    const notefulContextValue = {
      notes: dummyStore.notes,
      folders: dummyStore.folders
    };

    return (
      <>
        <NotefulContext.Provider value={notefulContextValue}>
          <Header 
            data={dummyStore.folders} 
            title={"Noteful"}
          />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path ="/folder" component={FolderRoute} />
            <Route path="/note/:folderId" component={NoteRoute} />
            <Route component={Error} />
          </Switch>
        </NotefulContext.Provider>
      </>
    );
  }
}

export default App;
