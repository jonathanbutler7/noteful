import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header(props) {
    return (
        <div>
        <header className="header">
            <Link to={'/'}>
                <button className="headerTitle">
                    <h1>{props.title}</h1>
                </button>
            </Link>
        </header>
        </div>
    )
}
