import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import { useNoteful } from '../../NotefulContext';
import Counter from '../Counter/Counter';
function Toasty() {
  const { showToast, setShowToast, toastMessage, count } = useNoteful();

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
      <Toast
        show={showToast}
        onClose={() => setShowToast(!showToast)}
        style={styles}
      >
        <Toast.Header>
          <strong className='mr-auto'>Noteful</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
        <p>Taking you home in:</p>
        <Counter />
      </Toast>
    </>
  );
}

export default Toasty;
