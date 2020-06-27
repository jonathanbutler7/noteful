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
      .then(data => this.setState({folders: data.folders}));

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
    // const notefulContextValue = {
    //   notes: dummyStore.notes,
    //   folders: dummyStore.folders
    // };

    return (
      <>
        <NotefulContext.Provider
          value={{ state: this.state, deleteNote: this.deleteNote }}
        >
          <Header data={dummyStore.folders} title={"Noteful"} />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/folder" component={FolderRoute} />
            <Route path="/note/:folderId" component={NoteRoute} />
            <Route component={Error} />
          </Switch>
        </NotefulContext.Provider>
      </>
    );
  }
}

export default App;
