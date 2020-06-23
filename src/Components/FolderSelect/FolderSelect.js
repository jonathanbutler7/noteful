import React from 'react';
import './FolderSelect.css'


class FolderSelect extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
    
    render() {
        return (
            <div className="folderSelect">
                {this.props.data.map(folder => {
                    return <h4 className="folderItem" key={folder.id}>{folder.name}</h4>
                })}
                <button>
                    <h5>Add Folder</h5>
                </button>
            </div>
        )
    }
}

export default FolderSelect