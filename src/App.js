import React from 'react';
import './App.css';
import MainPage from './Components/MainPage/MainPage'
import { Route, Switch } from 'react-router-dom'
import dummyStore from './dummy-store'
import FolderRoute from './Routes/FolderRoute/FolderRoute'
import NoteRoute from './Routes/NoteRoute/NoteRoute'
import Error from './Components/ErrorPage/ErrorPage'
import Header from './Components/Header/Header'

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
      <>
        <Header data={dummyStore.folders}/>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path ="/folder" component={FolderRoute} />
          <Route path="/note/:folderId" component={NoteRoute} />
          <Route component={Error} />
        </Switch>
      </>
    );
  }
}

export default App;
