import React from 'react';
import './FolderSelect.css';
import { Link } from 'react-router-dom';
import NotefulContext from '../../NotefulContext';
import {AiFillDelete} from 'react-icons/ai'

class FolderSelect extends React.Component {
    state = {
        isSelected1: false,
        isSelected2: false,
        isSelected3: false
    }

    static contextType = NotefulContext;

    deleteFromApi = (id) => {
        fetch(`http://localhost:9090/folders/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        // .then(res => res.json())
        .then(data => this.context.deleteFolder(id))
        .catch(error => {
            console.error(error)
        })
    }

    handleToggle = (e) => {
        this.setState({
            [e.target.name]: [e.target.value]
        })
    }
    render() {
        const { folders } = this.context.state;
        
        return (
            //this maps over this.props.data and returns an <h4> with folder.id and folder.name within a larger <div>
            //the <h4> is wrapped in a <Link> 
            <div className="folderSelect">
                <h2>Folders</h2>
                {folders.map(folder => {
                    return (
                        <Link 
                            to={`/note/${folder.id}`} 
                            id="linkItem" key={folder.id}
                            style={{ textDecoration: 'none' }}
                        >
                        <h4 
                            value={this.state.isSelected1}
                            onClick={e => this.handleToggle(e)}
                            className={this.state.isSelected1 ? "folderItemSelected" : "folderItem"} 
                            key={folder.id}>
                        {folder.name}
                            <div className="deleteCorner">
                                <Link to="/">
                                    <AiFillDelete
                                    className="deleteIcon" 
                                    onClick={() => this.deleteFromApi(folder.id)}
                                    />
                                </Link>
                            </div>
                        </h4>
                            
                        </Link> 
                    )     
                })}
                <Link to={'/add-folder'} >
                    <button className="addFolderButton">
                        <h5>Add Folder</h5>
                    </button>
                </Link>
            </div>
        )
    }
}

export default FolderSelect