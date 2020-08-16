import React from "react";
import { Link } from "react-router-dom";
import "./NoteDisplay.css";
import NotefulContext from "../../NotefulContext";
import PropTypes from "prop-types";

class NoteDisplay extends React.Component {
  state = {
    selectedNote: null,
    className: "note",
  };

  static contextType = NotefulContext;

  deleteFromApi = (id) => {
    fetch(`http://localhost:8000/api/notes/${id}`, {
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

  handleToggle = (e, noteId) => {
    this.context.setSelectedNote(noteId);
    this.context.selectedNote = noteId;
  };

  render() {
    
    const { notes: notesList } = this.context;
    const { folderId } = this.props;
    console.log(this.context);
    const { folders } = this.context;
    //take notes and folderId from this.props: (this.props.notes, this.props.folderId)
    //props is an object with 14 items from dummydata

    //save newNotes and notes to be equal
    let newNotesList = notesList;

    //if there is a folderId (in the array from props), then filter through notes and return only the new notes with that folder Id, then store notes with that Id in newNotes
    let folderNameMatch;
    if (folderId || this.context.selectedFolder) {
      let foundFolderId = folderId || this.context.selectedFolder;
      newNotesList = newNotesList.filter(function (note) {
        return note.folderId === foundFolderId;
      });
      folderNameMatch = folders.find((item) => item.id === foundFolderId);
    }

    let className = (selectedNote, noteId) => {
      if (
        (this.context.selectedNote && this.context.selectedNote === noteId) ||
        selectedNote === noteId
      ) {
        return "noteItemSelected";
      }
      return "note";
    };

    return (
      <div className="noteBox">
        {/* this JSX maps over either notes or newNotes and returns a <div> with the note name and last modified in FolderSelect */}
        <h3>{!folderNameMatch ? "" : `Notes in ${folderNameMatch.name}`}</h3>
        {newNotesList.map(({ id, name, modified }) => {
          let newMod = new Date(modified);
          let month = newMod.getMonth();
          let day = newMod.getDay();
          let year = newMod.getFullYear();
          return (
            <Link
              to={`/note?name=${name}`}
              key={id}
              name={id}
              onClick={(e) => this.handleToggle(e, id)}
              className={className(this.state.selectedNote, id)}
            >
              <div className="not" key={id}>
                <h2 className="noteTitle">{name}</h2>
                <div className="noteDetails">
                  <p>Last modified {`${month + 1}/${day + 1}/${year}`}</p>
                  <button
                    id="folderDelete"
                    onClick={() => this.deleteFromApi(id)}
                  >
                    <h5>Delete</h5>
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
        <Link to={"/add-note"} className="addFolderButton" name="linkToAddNote">
          <h5>Add note</h5>
        </Link>
      </div>
    );
  }
}

export default NoteDisplay;
//class NoteDisplay is adding a key to itself called propTypes, which is adding another key to itself that has a value of PropTypes.string. possible to define it at the top. typically default props defined at top. it comes down to consistency.
NoteDisplay.propTypes = {
  folderId: PropTypes.string,
};
