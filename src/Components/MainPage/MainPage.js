import React from 'react';
import './MainPage.css';
import FolderSelect from '../FolderSelect/FolderSelect'
// import NoteDisplay from '../NoteDisplay/NoteDisplay'

class MainPage extends React.Component {
    render() {
        return (
        <div className="mainDisplay">
            <FolderSelect 
            />
            {/* <NoteDisplay 
                // notes={DummyData.notes}
            />           */}
        </div>   
        )
    }
}

export default MainPage