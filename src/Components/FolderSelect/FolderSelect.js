import React from "react";
import "./FolderSelect.css";
import { Link } from "react-router-dom";
import NotefulContext from "../../NotefulContext";
import { AiFillDelete } from "react-icons/ai";
import { withRouter } from "react-router";

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
      selectedFolder: folderId,
    });
  };

  render() {
    const { folders } = this.context.state;

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
                value={this.state.isSelected1}
                onClick={(e) => this.props.selectFolder}
                className={
                  this.props.selectedFolder
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
