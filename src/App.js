import React from "react";
import "./App.css";
import MainPage from "./Components/MainPage/MainPage";
import { Route, Switch } from "react-router-dom";
import dummyStore from "./dummy-store";
import FolderRoute from "./Routes/FolderRoute/FolderRoute";
import NoteRoute from "./Routes/NoteRoute/NoteRoute";
import Error from "./Components/ErrorPage/ErrorPage";
import Header from "./Components/Header/Header";
import NotefulContext from "./NotefulContext";
import AddFolder from './Components/AddFolder/AddFolder'
import NoteDetails from './Components/NoteDetails/NoteDetails'
import AddNote from './Components/AddNote/AddNote'

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    fetch("http://localhost:9090/folders", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(folders => this.setState({folders}));

    fetch("http://localhost:9090/notes", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => res.json())
    .then(notes => this.setState({notes}));
  }

  deleteNote = (noteId) => {
    const notes = this.state.notes;
    let myFilter = notes.filter((note) => note.id !== noteId);
    this.setState({
      notes: myFilter,
    });
  };

  render() {
    // this sends data to context. possible to set it from state with this.state
    // const notefulContextValue = {
    //   notes: dummyStore.notes,
    //   folders: dummyStore.folders
    // };

    return (
      <>
        <NotefulContext.Provider
          value={{ state: this.state, deleteNote: this.deleteNote }}
        >
          <Header title={"Noteful"} />
          <Switch>
            <Route exact path="/" component={MainPage} />
            {/* <Route path="/folder" component={FolderRoute} /> */}
            <Route path="/note/:folderId" component={NoteRoute} />
            <Route path="/add-folder" component={AddFolder} />
            <Route path="/add-note" component={AddNote} />
            <Route path="/note" component={NoteDetails} />
            <Route component={Error} />
          </Switch>
        </NotefulContext.Provider>
      </>
    );
  }
}

export default App;
