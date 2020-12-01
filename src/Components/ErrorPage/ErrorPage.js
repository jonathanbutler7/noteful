import React from 'react';
import styles from './ErrorPage.module.scss';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className={styles.errorMessage}>
      <h2>You have reached this page in error</h2>
      <Link to={'/'} name='error-link'>
        <button className={styles.returnButton}>
          <h4>Return to main</h4>
        </button>
      </Link>
    </div>
  );
}
