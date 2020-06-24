import React from 'react'
import NoteDisplay from '../../Components/NoteDisplay/NoteDisplay'
import './NoteRoute.css'
import DummyData from '../../dummy-store'

export default function NoteRoute() {
    return (
        <div className="noteDisplay">
            <button className="backButton"><h5>Go Back</h5></button>
            <NoteDisplay
             notes={DummyData.notes}
            />
        </div>
    )
}
