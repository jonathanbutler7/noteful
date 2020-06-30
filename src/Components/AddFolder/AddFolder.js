import React from 'react'
import './AddFolder.css'

export default class AddFolder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            folderName: ""
        }
    }
    
    updateFolder(folder) {
        this.setState({folderName: folder})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const folderName = ({
            "name": this.state.folderName
        })
        fetch("http://localhost:9090/folders", {
            method: "POST",
            body: JSON.stringify(folderName),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then((res) => window.location.href = '/')
        .catch(error => {
            console.error(error)
        })
    }
    
    render() {
        return (
            <div className="viewport">
                <h2>Add Folder:</h2>
                <div className="addFolderForm">
                    <label 
                        className="input" 
                        htmlFor="folderName"
                    >
                        <h4>Folder name:</h4>
                    </label>
                    <input 
                        type="text"
                        placeholder="Folder name..."
                        id="folderNameEntry"
                        name="folderName"
                        onChange={e => this.updateFolder(e.target.value)}
                    />
                    <button 
                        className="addFolderButton"
                        onClick={e => this.handleSubmit(e)}
                    >
                        <h5>Add</h5>
                    </button>
                </div>
            </div>
        )
    }
    
}