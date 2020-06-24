import React from 'react';
import './NoteDisplay.css'

class NoteDisplay extends React.Component {
    render() {
        const {notes} = this.props
        return (
            <div className="noteBox">
                {notes.map(({name, modified}) => {
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