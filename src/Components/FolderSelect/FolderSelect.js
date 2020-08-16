import React from "react";
import "./FolderSelect.css";
import { Link } from "react-router-dom";
import NotefulContext from "../../NotefulContext";
import { AiFillDelete } from "react-icons/ai";
import { withRouter } from "react-router";

class FolderSelect extends React.Component {
  state = {
    selectedFolder: null,
    className: "folderItem",
  };

  static contextType = NotefulContext;

  deleteFromApi = (id) => {
    fetch(`http://localhost:8000/api/folders/${id}`, {
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
      selectedFolder: folderId,
    });

    this.context.setSelectedFolder(folderId);
    this.context.selectedFolder = folderId;
  };

  render() {
    const { folders } = this.context;
    // console.log(this.context)
    let className = (selectedFolder, folderId) => {
      if (
        (this.context.selectedFolder &&
          this.context.selectedFolder === folderId) ||
        selectedFolder === folderId
      ) {
        return "folderItemSelected";
      }
      return "folderItem";
    };

    return (
      <div className="folderSelect">
        <h2>Folders</h2>
        {folders.map((folder) => {
          return (
            <Link
              to={`/folder/${folder.id}`}
              id="linkItem"
              key={folder.id}
              style={{ textDecoration: "none" }}
              name="linkToFolderContents"
            >
              <h4
                onClick={(e) => this.handleToggle(e, folder.id)}
                className={className(this.state.selectedFolder, folder.id)}
                key={folder.id}
              >
                {folder.folder_name}
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
        <Link
          to={"/add-folder"}
          className="addFolderButton"
          name="addFolderLink"
        >
          <h5>Add Folder</h5>
        </Link>
      </div>
    );
  }
}

export default withRouter(FolderSelect);
