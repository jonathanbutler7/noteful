import React, { Component } from 'react'
import NotefulContext from '../../NotefulContext';
import './AddNote.css'

export default class AddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteName: "",
            noteContent: "",
            folderId: ""
        }
    }

    static contextType = NotefulContext;

    updateNote(note) {
        this.setState({noteName: note})
    }

    updateNoteContent(note) {
        this.setState({noteContent: note})
    }

    updateFolderId(folderId) {
        this.setState({folderId: folderId})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const note = ({
            "name": this.state.noteName,
            "content": this.state.noteContent,
            "folderId": this.state.folderId
        })
        fetch("http://localhost:9090/notes", {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then((res) =>  window.location.href = '/')
        .catch(error => {
        console.error(error)
        })
    }
    
    render() {
        const { folders } = this.context.state;
        console.log(folders);
        
        return (
            <div className="viewport">
                <h2>Add Note:</h2>
                <div className="addNoteForm">
                    <label 
                        className="input" 
                        htmlFor="noteName"
                    >
                       <h4>Name:</h4>   
                    </label>
                    <input 
                        type="text"
                        placeholder="Name..."
                        onChange={e => this.updateNote(e.target.value)}
                    />
                    <label htmlFor=""><h4>Select folder:</h4></label>
                    <select name="select-folder" id="" onChange={e => this.updateFolderId(e.target.value)}>
                        <option value="--Select folder--">--Select folder--</option>
                        {folders.map(item => {
                            return (
                                <option 
                                    id={item.id} 
                                    key={item.id} 
                                    value=""
                                    
                                >{item.name}</option>
                            )
                        })}
                    </select>
                    <label 
                        className="input" 
                        htmlFor="noteContent"
                    >
                        <h4>Content:</h4> 
                    </label>
                    <input 
                        type="textarea"
                        placeholder="Content..."
                        onChange={e => this.updateNoteContent(e.target.value)}
                    />
                    <button 
                        className="addButton"
                        onClick={e => this.handleSubmit(e)}
                    ><h5>Add</h5></button>
                </div>
            </div>
        )
    }
}