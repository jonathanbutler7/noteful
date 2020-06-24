import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header(props) {
    return (
        <div>
        <header className="header">
            <Link to={'/'}>
                <button class="headerTitle">
                    <h1>Noteful</h1>
                </button>
            </Link>
        </header>
        </div>
    )
}
