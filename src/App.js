import React from 'react';
import './App.css';
import StartPage from './Components/StartPage/StartPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NoteRoute from './Routes/NoteRoute/NoteRoute';
import Error from './Components/ErrorPage/ErrorPage';
import Header from './Components/Header/Header';
import NotefulContext from './NotefulContext';
import AddFolder from './Components/AddFolder/AddFolder';
import NoteDetails from './Components/NoteDetails/NoteDetails';
import AddNote from './Components/AddNote/AddNote';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import EditNote from './Components/EditNote/EditNote';

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    folderId: [],
    selectedFolder: null,
  };

  componentDidMount() {
    fetch('http://localhost:8000/api/folders', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((folders) => this.setState({ folders }));

    fetch('http://localhost:8000/api/notes', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((notes) => this.setState({ notes }));
  }

  deleteNote = (noteId) => {
    const notes = this.state.notes;
    let myFilter = notes.filter((note) => note.id !== noteId);
    this.setState({
      notes: myFilter,
    });
  };

  deleteFolder = (folderId) => {
    const folders = this.state.folders;
    let myFilter = folders.filter((folder) => folder.id !== folderId);
    this.setState({
      folders: myFilter,
    });
  };

  addNote = (data) => {
    this.setState({
      notes: data,
    });
  };

  // addFolder = (folderId) => {};

  setSelectedFolder = (selectedFolderId) => {
    return selectedFolderId;
  };

  setSelectedNote = (selectedNoteId) => {
    return selectedNoteId;
  };

  render() {
    return (
      <BrowserRouter>
        <NotefulContext.Provider
          value={{
            ...this.state,
            addNote: this.addNote,
            deleteNote: this.deleteNote,
            addFolder: this.addFolder,
            deleteFolder: this.deleteFolder,
            setSelectedFolder: this.setSelectedFolder,
            setSelectedNote: this.setSelectedNote,
          }}
        >
          <Header title={'Noteful'} />
          <ErrorBoundary>
            <Switch>
              <Route exact path='/' component={StartPage} />
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
}

export default App;
// withRouter makes available match, params, and history
