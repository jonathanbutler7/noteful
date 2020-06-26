import React from 'react';
import './NoteDisplay.css'
import NotefulContext from '../../NotefulContext';

class NoteDisplay extends React.Component {

    static contextType = NotefulContext;

    render() {
        const { notes } = this.context;
        const { folderId } = this.props;

        //take notes and folderId from this.props: (this.props.notes, this.props.folderId)
        //props is an object with 14 items from dummydata
        
        //save newNotes and notes to be equal
        let newNotes = notes;
        //if there is a folderId (in the array from props), then filter through notes and return only the new notes with that folder Id, then store notes with that Id in newNotes
        if (folderId) {
            newNotes = newNotes.filter(function(note) {
                return note.folderId === folderId
            })
        }
        return (
            <NotefulContext.Consumer>
                {(context) => (
                    <div className="noteBox">
                        {/* this JSX maps over either notes or newNotes and returns a <div> with the note name and last modified in FolderSelect */}
                        {newNotes.map(({id, name, modified}) => {
                            let newMod = new Date(modified)
                            let month = newMod.getMonth()
                            let day = newMod.getDay()
                            let year = newMod.getFullYear()
                            return (<div className="note" key={id}>
                            <h2 className="noteTitle">{name}</h2>
                                <div className="noteDetails">
                                    <p>Last modified {`${month + 1}/${day + 1}/${year}`}</p>
                                    <button 
                                        id="folderDelete"
                                        onClick={() => console.log('clicked', name)}
                                    >
                                        <h5>Delete</h5>
                                    </button>
                                </div>
                            </div>)
                        })}
                        <button className="addNoteButton">
                            <h5>Add note</h5>
                        </button>
                    </div>
                )}

            </NotefulContext.Consumer>
        )
    }
}

export default NoteDisplay