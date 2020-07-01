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
      noteValue: !this.state.value,
    });
  }

  updateNoteContent(note) {
    this.setState({
      noteContent: note,
      contentValue: !this.state.value,
    });
  }

  updateFolderId(folderId) {
    this.setState({ folderId: folderId, 
        folderValue: !this.state.value 
    });
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
      name: this.state.noteName,
      content: this.state.noteContent,
      folderId: this.state.folderId,
      modified: this.timeStamp(),
    };
    fetch("http://localhost:9090/notes", {
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
        console.error(error);
      });
  };

  render() {
    const { folders } = this.context.state;

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
          {/* {!this.state.value && this.state.errorMsg && <ValidationError message={this.state.errorMsg}/>} */}
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
                  {item.name}
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
