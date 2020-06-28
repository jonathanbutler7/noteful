import React from 'react'
import './ErrorPage.css'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div className="errorMessage">
            <h2>You have reached this page in error</h2>
            <Link to={'/'} >
                <button className="returnButton"><h4>Return to main</h4></button>
            </Link>
        </div>
    )
}
