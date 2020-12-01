import React, { useContext } from 'react';
import styles from './FolderSelect.css';
import { Link } from 'react-router-dom';
import NotefulContext from '../../NotefulContext';
import { AiFillDelete } from 'react-icons/ai';
import { withRouter } from 'react-router';
import axios from 'axios';

function FolderSelectF() {
  const { folders, serverUrl, selectedFolder, setSelectedFolder } = useContext(
    NotefulContext
  );

  async function deleteFromApi(id) {
    const url = `${serverUrl}/api/folders/${id}`;
    try {
      const response = axios.delete(url);
      const result = response.data;
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggle(e, folderId) {
    setSelectedFolder(folderId);
  }

  function className(selectedFolder, folderId) {
    if (selectedFolder === folderId) {
      return 'folderItemSelected';
    }
    return 'folderItem';
  }
  return (
    <div className='mainDisplay'>
      <div className='folderSelect'>
        <h2>Folders</h2>
        {folders.map((folder) => {
          return (
            <Link
              to={`/folder/${folder.id}`}
              id='linkItem'
              key={folder.id}
              style={{ textDecoration: 'none' }}
              name='linkToFolderContents'
            >
              <h4
                onClick={(e) => handleToggle(e, folder.id)}
                className={className(selectedFolder, folder.id)}
                key={folder.id}
              >
                {folder.folder_name}
                <div className='deleteCorner'>
                  <AiFillDelete
                    className='deleteIcon'
                    onClick={() => deleteFromApi(folder.id)}
                  />
                </div>
              </h4>
            </Link>
          );
        })}
        <Link
          to={'/add-folder'}
          className='addFolderButton'
          name='addFolderLink'
        >
          <h5>Add Folder</h5>
        </Link>
      </div>
    </div>
  );
}

export default withRouter(FolderSelectF);
