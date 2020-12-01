import React from 'react';
import './MainPage.css';
import FolderSelect from '../FolderSelect/FolderSelect';

class StartPage extends React.Component {
  render() {
    return (
      <div className='mainDisplay'>
        <FolderSelect />
      </div>
    );
  }
}

export default StartPage;
