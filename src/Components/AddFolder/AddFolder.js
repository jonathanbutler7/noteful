import React from "react";
import "./AddFolder.css";
import ValidationError from "../ValidationError/ValidationError";

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: "",
      value: false,
      errorMsg: "",
    };
  }

  updateFolder(folder) {
    this.setState({
      folderName: folder,
      value: true,
    });
  }

  validateFolderEntry(e) {
    const textPresent = this.state.value;
    !textPresent
      ? this.setState({ errorMsg: "please enter some text" })
      : this.handleSubmit(e);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const folderName = {
      name: this.state.folderName,
    };
    fetch("http://localhost:9090/folders", {
      method: "POST",
      body: JSON.stringify(folderName),
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
      .then((res) => (window.location.href = "/"))
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="viewport">
        <h2>Add Folder:</h2>
        <div className="addFolderForm">
          <label className="input" htmlFor="folderName">
            <h4>Folder name:</h4>
          </label>

          <input
            type="text"
            placeholder="Folder name..."
            id="folderNameEntry"
            name="folderName"
            onChange={(e) => this.updateFolder(e.target.value)}
          />
          {!this.state.value && this.state.errorMsg && (
            <ValidationError message={this.state.errorMsg} />
          )}
          <button
            className="addFolderButton"
            onClick={(e) => this.validateFolderEntry(e)}
          >
            <h5>Add</h5>
          </button>
        </div>
      </div>
    );
  }
}
