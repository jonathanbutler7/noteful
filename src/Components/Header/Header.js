import React from "react";
import "./Header.css";
// import { Link } from "react-router-dom";

export default function Header(props) {
    function goBackToHome() {
        window.location.href = "/"
    }
    return (
    // <Link to={"/"} name="linkToHome">
      <div onClick={goBackToHome}>
        <header className="header">
          <h1 id="headerButton">{props.title}</h1>
        </header>
      </div>
    // </Link>
  );
}
