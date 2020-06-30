import React from 'react'

export default function ValidationError(props) {
    if(props.message) {
        return (
            <div>
                <div className="error">{props.message}</div>
            </div>
        )
    }
    return <></>
}
