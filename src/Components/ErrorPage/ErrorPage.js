import React from 'react'
import './ErrorPage.css'

export default function ErrorPage() {
    return (
        <div className="errorMessage">
            <h2>You have reached this page in error</h2>
            <button className="returnButton"><h4>Return to main</h4></button>
        </div>
    )
}
