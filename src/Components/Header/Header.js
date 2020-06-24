import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header(props) {
    console.log(props, "here it is")
    return (
        <div>
        <header className="header"
            // onClick={() => {props.history.push("/")}}
        >
            <Link to={'/'}><button class="headerTitle"><h1>Noteful</h1></button></Link>
        </header>
        </div>
    )
}
