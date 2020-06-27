import React from 'react'
import NoteDisplay from '../../Components/NoteDisplay/NoteDisplay'
import './NoteRoute.css'
// import DummyData from '../../dummy-store'

export default function NoteRoute(props) {
    return ( 
        <div className="noteDisplay">
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
