import React from 'react';
import './NoteDisplay.css'

class NoteDisplay extends React.Component {
    render() {
        const {notes, folderId} = this.props;
        let newNotes = notes;
        if (folderId) {
            newNotes = newNotes.filter(function(note) {
                return note.folderId === folderId
            })
        }
        return (
            <div className="noteBox">
                {newNotes.map(({name, modified}) => {
                    return (<div className="note">
                    <h2 className="noteTitle">{name}</h2>
                        <div className="noteDetails">
                            <p>Date modified {modified}</p>
                            <button id="folderDelete">
                                <h5>Delete</h5>
                            </button>
                        </div>
                    </div>)
                })}
                <button className="addNoteButton">
                    <h5>Add note</h5>
                </button>
            </div>
        )
    }
}

export default NoteDisplay