import React from 'react'
import NoteDisplay from '../../Components/NoteDisplay/NoteDisplay'
import './NoteRoute.css'
import FolderSelect from '../../Components/FolderSelect/FolderSelect'

export default function NoteRoute(props) {
    return ( 
        <div className="mainDisplay">
            <FolderSelect />
            <NoteDisplay
             folderId={props.match.params.folderId}
            />
        </div>
    )
}
