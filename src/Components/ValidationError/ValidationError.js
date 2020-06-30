import React from 'react'
import "./ValidationError.css"

export default function ValidationError(props) {
    if(props.message) {
        return (
            <div className="validation">
                <h6 className="error">{props.message}</h6>
            </div>
        )
    }
    return <></>
}
