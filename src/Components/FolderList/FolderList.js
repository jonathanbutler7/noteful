import React from 'react';
import './FolderList.css';
import { Link, useHistory } from 'react-router-dom';
import { useNoteful } from '../../NotefulContext';
import { AiFillDelete } from 'react-icons/ai';
import { withRouter } from 'react-router';
import axios from 'axios';

function FolderList() {
  const {
    folders,
    serverUrl,
    selectedFolder,
    setSelectedFolder,
    restartTimer,
    setToastMessage,
  } = useNoteful();
  const history = useHistory();
  function removeToken() {
    localStorage.removeItem('noteful-jwt');
    history.push('/login');
  }
  async function deleteFromApi(id, name) {
    const url = `${serverUrl}/api/folders/${id}`;
    try {
      const response = await axios.delete(url);
      const result = response.data;
      restartTimer('/');
      setToastMessage(`You deleted folder: ${name}`);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggle(folderId) {
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
        <h2>
          Folders{' '}
          <span aria-label='jsx-a11y/accessible-emoji' role='img'>
            📁
          </span>
        </h2>
        {folders.map(({ folder_name, id }) => {
          return (
            <Link
              to={`/folder/${id}`}
              id='linkItem'
              key={id}
              style={{ textDecoration: 'none' }}
              name='linkToFolderContents'
            >
              <h4
                onClick={() => handleToggle(id)}
                className={className(selectedFolder, id)}
                key={id}
              >
                {folder_name}
                <div className='deleteCorner'>
                  <AiFillDelete
                    className='deleteIcon'
                    onClick={() => deleteFromApi(id, folder_name)}
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
        <button className='addFolderButton' onClick={(e) => removeToken()}>
          <h5>Log out</h5>
        </button>
      </div>
    </div>
  );
}

export default withRouter(FolderList);
