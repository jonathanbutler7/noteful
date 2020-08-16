import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./NoteDisplay.css";
import NotefulContext from "../../NotefulContext";
import PropTypes from "prop-types";

function NoteDisplay2() {
  const [noteClass, setNoteClass] = useState("note");

  function toggleNoteClass(e, id) {
    setNoteClass("");
  }

  const deleteFromApi = (id) => {
    console.log(id)
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
  const context = useContext(NotefulContext);
  const selectedFolder = context.selectedFolder;
  const notes = context.notes;
  const newNotesList = notes.filter((i) => i.folder_id === selectedFolder);
  // console.log(newNotesList);
  return (
    <div className="notebox">
      {newNotesList.map((note, id) => {
        let newMod = new Date(note.date_created);
        let month = newMod.getMonth();
        let day = newMod.getDay();
        let year = newMod.getFullYear();
        return (    
            // <Link
            //   to={`/note?name=${note.note_name}`}
            //   key={id}
            //   name={id}
            //   onClick={(e) => toggleNoteClass(e, id)}
            //   className="newnotebox"
            // >
              <div className="newnotebox">
                  <Link to={`/note?name=${note.id}`}>
                <h2 className="noteTitle">{note.note_name}</h2>
                <div className="noteDetails">
                  <p>Last modified {`${month + 1}/${day + 1}/${year}`}</p>
                  <button
                    id="folderDelete"
                    onClick={() => deleteFromApi(note.id)}
                  >
                    <h5>Delete</h5>
                  </button>
                </div>
                </Link>
                
            </div>
        );
      })}
      <Link to={"/add-note"} className="addFolderButton" name="linkToAddNote">
          <h5>Add note</h5>
        </Link>
    </div>
  );
}

export default NoteDisplay2;
