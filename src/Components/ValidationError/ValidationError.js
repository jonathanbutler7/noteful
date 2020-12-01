import React from 'react';
import styles from './ValidationError.module.scss';

export default function ValidationError(props) {
  if (props.message) {
    return (
      <div className={styles.validation}>
        <h6 className={styles.error}>{props.message}</h6>
      </div>
    );
  }
  return <></>;
}
