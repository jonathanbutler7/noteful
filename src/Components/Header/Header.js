import React from 'react';
import './Header.css';

function Header({ title }) {
  function goBackToHome() {
    window.location.href = '/';
  }

  return (
    <div className='header' onClick={goBackToHome}>
      <header>
        <h1 id='headerButton'>{title}</h1>
      </header>
    </div>
  );
}

export default Header;
