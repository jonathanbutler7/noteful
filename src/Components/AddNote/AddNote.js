import React, { Component } from "react";
import NotefulContext from "../../NotefulContext";
import "./AddNote.css";
import ValidationError from "../ValidationError/ValidationError";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: "",
      noteContent: "",
      folderId: "",
      modified: "",
      noteValue: false,
      contentValue: false,
      folderValue: false,
      errorMsg: "",
    };
  }

  static contextType = NotefulContext;

  updateNote(note) {
    this.setState({
      noteName: note,
      noteValue: true,
    });
    !note.length && this.setState({noteValue: false})
  }

  updateNoteContent(note) {
    this.setState({
      noteContent: note,
      contentValue: true,
    });
    !note.length && this.setState({contentValue: false})
  }

  updateFolderId(folderId) {
    this.setState({ folderId: parseInt(folderId), 
        folderValue: true
    });
    !folderId.length && this.setState({folderValue: false})
  }

  timeStamp() {
    var time = Date.now();
    let newMod = new Date(time);
    this.setState({ modified: newMod });
    return newMod;
  }

  validateFolderEntry(e) {
    const notePresent = this.state.noteValue;
    const contentPresent = this.state.contentValue;
    const folderPresent = this.state.folderValue;
    
    !notePresent || !contentPresent || !folderPresent
      ? this.setState({ errorMsg: "all fields are required" })
      : this.handleSubmit(e);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      note_name: this.state.noteName,
      content: this.state.noteContent,
      folder_id: this.state.folderId,
      // modified: this.timeStamp(),
    };
    fetch("http://localhost:8000/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw error;
          });
        }
        return res.json();
      })
      .then((res) => (window.location.href = `/folder/${this.state.folderId}`))
      .catch((error) => {
        this.setState({errorMsg: 'Failed to add note to server', value: false})
      });
  };

  render() {
    const { folders } = this.context;

    return (
      <div className="viewport">
        <h2>Add Note:</h2>
        <div className="addNoteForm">
          <label className="input" htmlFor="noteName">
            <h4>Name:</h4>
          </label>
          <input
            type="text"
            name="noteName"
            placeholder="Name..."
            onChange={(e) => this.updateNote(e.target.value)}
          />
          <label htmlFor="select-folder">
            <h4>Select folder:</h4>
          </label>
          <select
            name="select-folder"
            id="select-folder"
            onChange={(e) => this.updateFolderId(e.target.value)}
          >
            <option value="--Select folder--">--Select folder--</option>
            {folders.map((item) => {
              return (
                <option id={item.id} key={item.id} value={item.id}>
                  {item.folder_name}
                </option>
              );
            })}
          </select>
          <label className="input" htmlFor="noteContent">
            <h4>Content:</h4>
          </label>
          <textarea
            type="textarea"
            id="textarea"
            name="noteContent"
            placeholder="Content..."
            onChange={(e) => this.updateNoteContent(e.target.value)}
          />
          {!this.state.value && this.state.errorMsg && (
            <ValidationError message={this.state.errorMsg} />
          )}
          <button
            className="addButton"
            onClick={(e) => this.validateFolderEntry(e)}
          >
            <h5>Add</h5>
          </button>
        </div>
      </div>
    );
  }
}
//not sure how to implement the feedback because there are no props being passed into AddNote component. can you give an example of what I should do to implement this feedback?