import React from 'react';
import styles from './Header.module.scss';

function Header() {
  function goBackToHome() {
    window.location.href = '/';
  }

  return (
    <div className={styles.header} onClick={goBackToHome}>
      <header>
        <h1 id='headerButton'>
          Noteful
          <span aria-label='jsx-a11y/accessible-emoji' role='img'>
            📝
          </span>
        </h1>
      </header>
    </div>
  );
}

export default Header;
