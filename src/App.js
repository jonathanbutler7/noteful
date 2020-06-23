import React from 'react';
import './App.css';
import MainPage from './Components/MainPage/MainPage'
import { Route } from 'react-router-dom'
import dummyStore from './dummy-store'
import FolderRoute from './Routes/FolderRoute/FolderRoute'
import NoteRoute from './Routes/NoteRoute/NoteRoute'

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  }

  render() {
    return (
      <div>
        <Route exact path="/main" component={MainPage} />
        <Route exact path ="/folder" component={FolderRoute} />
        <Route exact path="/note" component={NoteRoute} />
      </div>
    );
  }
}

export default App;
