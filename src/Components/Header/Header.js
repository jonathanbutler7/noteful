import React from 'react';
import styles from './Header.module.scss';

function Header({ title }) {
  
  function goBackToHome() {
    window.location.href = '/';
  }

  return (
    <div className={styles.header} onClick={goBackToHome}>
      <header>
        <h1 id='headerButton'>{title}</h1>
      </header>
    </div>
  );
}

export default Header;
