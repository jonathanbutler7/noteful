import React from 'react';
import { useNoteful } from '../../NotefulContext';
import { useHistory } from 'react-router-dom';
import styles from './Toast.module.scss';
import counter from '../Counter/Counter';

function Toasty() {
  const { showToast, setShowToast, toastMessage, setCount } = useNoteful();
  const number = counter();
  const history = useHistory();
  const message =
    history.location.pathname !== '/' ? 'Taking you home in: ' : 'Closing in: ';

  return (
    <>
      {number > 0 && (
        <div
          show={showToast.toString()}
          onClose={() => setShowToast(!showToast)}
          className={styles.toast}
        >
          <strong>{toastMessage}</strong>
          <small>
            {message} {number}
          </small>
          <button onClick={() => setCount(0)}>
            <p>close</p>
          </button>
        </div>
      )}
    </>
  );
}

export default Toasty;
