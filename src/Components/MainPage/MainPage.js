import React from 'react';
import './MainPage.css';
import FolderSelect from '../FolderSelect/FolderSelect'
import NoteDisplay from '../NoteDisplay/NoteDisplay'
import DummyData from '../../dummy-store'

class MainPage extends React.Component {
    render() {
        return (
            <div>
                <header className="header">
                    <h1>Noteful</h1>
                </header>
                <div className="mainDisplay">
        <FolderSelect 
            data={DummyData.folders}
        />
        <NoteDisplay 
            notes={DummyData.notes}
        />          
        </div>
        
      </div>
            
        )
    }
}

export default MainPage