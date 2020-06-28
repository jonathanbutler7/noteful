import React, { Component } from 'react'
import './AddNote.css'

export default class AddNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteName: "",
            noteContent: ""
        }
    }

    updateNote(note) {
        this.setState({noteName: note})
    }

    updateNoteContent(note) {
        this.setState({noteContent: note})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        const note = ({
            "name": this.state.noteName,
            "content": this.state.noteContent
        })
        console.log(note)
            fetch("http://localhost:9090/notes", {
              method: "POST",
              body: JSON.stringify(note),
            //   headers: {
            //       'content-type': 'applications/json',
            //   }
            })
              .then((res) => res.json())
              this.props.history.push('/')
            //   .then(data => {this.state.folderName});
          }
    
    
    render() {
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
