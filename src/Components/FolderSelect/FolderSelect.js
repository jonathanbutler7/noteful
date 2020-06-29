import React from "react";
import "./FolderSelect.css";
import { Link } from "react-router-dom";
import NotefulContext from "../../NotefulContext";
import { AiFillDelete } from "react-icons/ai";

class FolderSelect extends React.Component {
  state = {
    selectedFolder: "",
  };

  static contextType = NotefulContext;

  deleteFromApi = (id) => {
    fetch(`http://localhost:9090/folders/${id}`, {
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
      .then((data) => this.context.deleteFolder(id))
      .catch((error) => {
        console.error(error);
      });
  };

  handleToggle = (e, folderId) => {
    this.setState({
      // [e.target.name]: [e.target.value]
      selectedFolder: folderId,
    });
  };
  render() {
    const { folders } = this.context.state;

    return (
      //this maps over this.props.data and returns an <h4> with folder.id and folder.name within a larger <div>
      //the <h4> is wrapped in a <Link>
      <div className="folderSelect">
        <h2>Folders</h2>
        {folders.map((folder) => {
          return (
            <Link
              to={`/folder/${folder.id}`}
              id="linkItem"
              key={folder.id}
              style={{ textDecoration: "none" }}
            >
              <h4
                value={this.state.isSelected1}
                onClick={(e) => this.handleToggle(e, folder.id)}
                className={
                  this.state.selectedFolder === folder.id
                    ? "folderItemSelected"
                    : "folderItem"
                }
                key={folder.id}
              >
                {folder.name}
                <div className="deleteCorner">
                  <AiFillDelete
                    className="deleteIcon"
                    onClick={() => this.deleteFromApi(folder.id)}
                  />
                </div>
              </h4>
            </Link>
          );
        })}
        <Link to={"/add-folder"} className="addFolderButton">
          <h5>Add Folder</h5>
        </Link>
      </div>
    );
  }
}

export default FolderSelect;
