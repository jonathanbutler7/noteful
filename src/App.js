import React from "react";
import "./App.css";
import StartPage from "./Components/StartPage/StartPage";
import { Route, Switch } from "react-router-dom";
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
    folders: [],
    folderId: [],
    selectedFolder: null
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

  deleteFolder = (folderId) => {
    const folders = this.state.folders;
    let myFilter = folders.filter((folder) => folder.id !== folderId);
    this.setState({
      folders: myFilter
    })
  }

  addNote = (data) => {
    this.setState({
      notes: data
    })
  }

  addFolder = (folderId) => {
    
  }

  render() {
    const selectFolder = (selectedFolderId) => {
      this.setState({selectedFolder: selectedFolderId})
    }
  
    return (
      <>
        <NotefulContext.Provider
          value={{ 
            state: this.state,
            addNote: this.addNote,
            deleteNote: this.deleteNote, 
            addFolder: this.addFolder,
            deleteFolder: this.deleteFolder
          }}
        >
          <Header title={"Noteful"} />
          <Switch>
            <Route exact path="/" component={
              StartPage} />
            <Route path="/folder/:folderId" component={NoteRoute} />
            {/* //render props pattern,, instead of component attribute, have a render attribute which calls the component. call that function inside add folder compoment, and give it props from react router and selected oflder */}
            <Route path="/add-folder" component={AddFolder}  />
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
