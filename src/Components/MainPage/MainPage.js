import React from 'react';
import './MainPage.css';
import FolderSelect from '../FolderSelect/FolderSelect'
import NoteDisplay from '../NoteDisplay/NoteDisplay'
import DummyData from '../../dummy-store'

class MainPage extends React.Component {
    render() {
        return (
        <div className="mainDisplay">
            <FolderSelect 
                data={DummyData.folders}
            />
            <NoteDisplay 
                notes={DummyData.notes}
            />          
        </div>   
        )
    }
}

export default MainPage