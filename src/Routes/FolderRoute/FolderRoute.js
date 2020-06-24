import React from 'react'
import FolderSelect from '../../Components/FolderSelect/FolderSelect'
import NoteDisplay from '../../Components/NoteDisplay/NoteDisplay'
import DummyData from '../../dummy-store'
import './FolderRoute.css'

export default function FolderRoute() {
    return (
        <div className="folderDisplay">
            <FolderSelect 
                data={DummyData.folders}
            />
            <NoteDisplay 
                notes={DummyData.notes}
            />
        </div>
    )
}
