import React from 'react';
import './FolderSelect.css';
import {Link} from 'react-router-dom';


class FolderSelect extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            
            <div className="folderSelect">
                
                {this.props.data.map(folder => {
                    return <Link to={`/note/${folder.id}`} id="linkItem">
                                    <h4 className="folderItem" key={folder.id}>{folder.name}</h4>
                                </Link>
                            
                })}
                <button className="addFolderButton">
                    <h5>Add Folder</h5>
                </button>
            </div>
        )
    }
}

export default FolderSelect