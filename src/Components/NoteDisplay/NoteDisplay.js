import React from "react";
import { Link } from "react-router-dom";
import "./NoteDisplay.css";
import NotefulContext from "../../NotefulContext";

class NoteDisplay extends React.Component {
  static contextType = NotefulContext;

  deleteFromApi = (id) => {
    fetch(`http://localhost:9090/notes/${id}`, {
      method: "DELETE",
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
      // .then(res => res.json())
      .then((data) => this.context.deleteNote(id))
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { notes: notesList } = this.context.state;
    const { folderId } = this.props;
    const { folders } = this.context.state;
    //take notes and folderId from this.props: (this.props.notes, this.props.folderId)
    //props is an object with 14 items from dummydata

    //save newNotes and notes to be equal
    let newNotesList = notesList;

    //if there is a folderId (in the array from props), then filter through notes and return only the new notes with that folder Id, then store notes with that Id in newNotes

    if (folderId) {
      newNotesList = newNotesList.filter(function (note) {
        return note.folderId === folderId;
      });
    }
    let folderNameMatch = folders.find((item) => item.id === folderId);

    return (
      <div className="noteBox">
        {/* this JSX maps over either notes or newNotes and returns a <div> with the note name and last modified in FolderSelect */}
        <h4>
          {!folderNameMatch ? "" : `Notes in ${folderNameMatch.name} folder`}
        </h4>
        {newNotesList != null &&
          newNotesList.map(({ id, name, modified }) => {
            let newMod = new Date(modified);
            let month = newMod.getMonth();
            let day = newMod.getDay();
            let year = newMod.getFullYear();
            return (
              <Link to={`/note?name=${name}`} key={id} name={id}>
                <div className="note" key={id}>
                  <h2 className="noteTitle">{name}</h2>
                  <div className="noteDetails">
                    <p>Last modified {`${month + 1}/${day + 1}/${year}`}</p>
                    <button
                      id="folderDelete"
                      // onClick={() => this.context.deleteNote(id)}
                      onClick={() => this.deleteFromApi(id)}
                    >
                      <h5>Delete</h5>
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        <Link 
            to={"/add-note"} 
            className="addFolderButton" 
            name="linkToAddNote"
        >
          <h5>Add note</h5>
        </Link>
      </div>
    );
  }
}

export default NoteDisplay;
