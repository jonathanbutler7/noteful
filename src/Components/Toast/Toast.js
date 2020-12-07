import React from 'react';
import { Toast } from 'react-bootstrap';
import { useNoteful } from '../../NotefulContext';
import counter from '../Counter/Counter';
function Toasty() {
  const { showToast, setShowToast, toastMessage } = useNoteful();
  const number = counter();

  const styles = {
    border: '1px solid black',
    margin: '2rem',
    position: 'absolute',
    zIndex: '100',
    background: '#F5F5F5',
    padding: '1rem',
    right: '0',
    top: '0',
  };

  return (
    <>
      {number > 0 && (
        <div
          show={showToast.toString()}
          onClose={() => setShowToast(!showToast)}
          style={styles}
        >
          <div>
            <strong>{toastMessage}</strong>
          </div>
          <small>Taking you home in: {number}</small>
        </div>
      )}
    </>
  );
}

export default Toasty;
