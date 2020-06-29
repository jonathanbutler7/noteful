import React from 'react'
import NotefulContext from '../../NotefulContext'
import FolderSelect from '../FolderSelect/FolderSelect';
import "./NoteDetails.css"

export default class NoteDetails extends React.Component {

    static contextType = NotefulContext;

    render() {
        
        const { notes } = this.context.state
        const params = this.props.location.search
        let noteName = params.split('=')[1]
        let foundNote = notes.find(item => item.name === noteName)
        console.log(foundNote);
        
        

        return (
            <div className="mainDisplay">
                <FolderSelect />
                {
                    foundNote && (
                    <div className="note__box">
                        <h2>{foundNote.name}</h2>
                        <p>{foundNote.content}</p>
                        <p>{foundNote.modified}</p>
                    </div>
                    )
                }
                    
                    
                
            </div>
        )
    }
}
