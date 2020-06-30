import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header(props) {
    return (
        <Link to={'/'}>
            <div>
                <header className="header">
                        <h1 id="headerButton">{props.title}</h1>
                </header>
            </div>
        </Link>
    )
}
