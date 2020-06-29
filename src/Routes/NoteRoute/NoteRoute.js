import React from 'react'
import NoteDisplay from '../../Components/NoteDisplay/NoteDisplay'
import './NoteRoute.css'
// import dummyStore from '../../dummy-store'
import FolderSelect from '../../Components/FolderSelect/FolderSelect'

export default function NoteRoute(props) {
    return ( 
        <div className="noteDisplay">
            <FolderSelect 
                // data={dummyStore.folders}
            />
            <button 
                className="backButton"
                onClick={() => {props.history.push("/")}}
            >
                <h5>Go Back</h5>
            </button>
            <NoteDisplay
             folderId={props.match.params.folderId}
            />
        </div>
    )
}
