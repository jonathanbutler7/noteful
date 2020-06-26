import React from 'react';
import './FolderSelect.css';
import {Link} from 'react-router-dom';


class FolderSelect extends React.Component {
    
    render() {
        return (
            //this maps over this.props.data and returns an <h4> with folder.id and folder.name within a larger <div>
            //the <h4> is wrapped in a <Link> 
            <div className="folderSelect">
                {this.props.data.map(folder => {
                    return (
                        <Link 
                            to={`/note/${folder.id}`} 
                            id="linkItem" key={folder.id}
                            onClick={() => console.log('clicked', folder.name)}
                        >
                        <h4 className="folderItem" key={folder.id}>{folder.name}</h4>
                        </Link> 
                    )     
                })}
                <button 
                    className="addFolderButton"
                >
                    <h5>Add Folder</h5>
                </button>
            </div>
        )
    }
}

export default FolderSelect