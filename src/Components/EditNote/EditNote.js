import React, { useState, useContext } from "react";
import NotefulContext from "../../NotefulContext";
import { Link } from "react-router-dom";

function EditNote() {
  const context = useContext(NotefulContext);
  const [noteName, setNoteName] = useState();
  const [folderId, setFolderId] = useState();
  const [content, setContent] = useState();

  const folders = context.folders;
  const notes = context.notes;
  let noteId = parseInt(window.location.href.split("/edit-note/")[1]);
  let foundNote = notes.find((item) => item.id === noteId);
  let note_name;
  let note_content;
  if (foundNote) {
    note_name = foundNote.note_name;
    note_content = foundNote.content;
  }

  function sendPatch(e) {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      content: content,
      note_name: noteName,
      folder_id: folderId,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:8000/api/notes/${noteId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <div className="viewport">
      <h2>Edit Note:</h2>
      <div className="addNoteForm">
        <label className="input" htmlFor="noteName">
          <h4>Name:</h4>
        </label>
        <input
          type="text"
          name="noteName"
          placeholder={note_name}
          onChange={(e) => setNoteName(e.target.value)}
        />
        <label htmlFor="select-folder">
          <h4>Select folder:</h4>
        </label>
        <select
          name="select-folder"
          id="select-folder"
          onChange={(e) => setFolderId(e.target.value)}
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
          placeholder={note_content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Link to={`/note?name=${noteId}`}>
          <button className="addButton" onClick={(e) => sendPatch(e)}>
            <h5>Submit</h5>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EditNote;
