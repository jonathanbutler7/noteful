import React from 'react'
import NotefulContext from '../../NotefulContext'
import FolderSelect from '../FolderSelect/FolderSelect';
import NoteDisplay from '../NoteDisplay/NoteDisplay'
import "./NoteDetails.css"

export default class NoteDetails extends React.Component {

    static contextType = NotefulContext;

    deleteFromApi = (id) => {
        fetch(`http://localhost:9090/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        // .then(res => res.json())
        .then(data => this.context.deleteNote(id))
        .catch(error => {
            console.error(error)
        })
    }

    render() {
        
        const { notes } = this.context.state
        // const { folders } = this.context.state
        const params = this.props.location.search
        let noteName = params.split('=')[1]
        let foundNote = notes.find(item => item.name === noteName)
        // let newMod = ''
        let readableDate = ''
        if (foundNote) {
        let newMod = new Date(foundNote.modified)
        let month = newMod.getMonth()
        let day = newMod.getDay()
        let year = newMod.getFullYear()
        readableDate = `${month + 1}/${day + 1}/${year + 1}`
        }
        
        

        return (
            <div className="fullDisplay">
                <FolderSelect onFolderSelect={this.props.selectFolder} isSelected={this.props.selectedFolder} />
                <NoteDisplay />
                {
                    foundNote && (
                    <div className="note__box">
                        <h2>{foundNote.name}</h2>
                        <p>{foundNote.content}</p>
                        <p>Last modified {readableDate}</p>
                        <button 
                            id="folderDelete"
                            onClick={() => this.deleteFromApi(foundNote.id)}
                        >
                            <h5>Delete</h5>
                        </button>
                    </div>
                    )
                } 
            </div>
        )
    }
}
