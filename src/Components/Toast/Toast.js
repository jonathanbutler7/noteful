import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import { useNoteful } from '../../NotefulContext';

function Toasty() {
  const { showToast, setShowToast, toastMessage } = useNoteful();
  
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
    <Toast show={showToast} onClose={() => setShowToast(!showToast)} style={styles}>
      <Toast.Header>
        {/* <img src='holder.js/20x20?text=%20' className='rounded mr-2' alt='' /> */}
        <strong className='mr-auto'>Noteful</strong>
      </Toast.Header>
      <Toast.Body>{toastMessage}</Toast.Body>
    </Toast>
  );
}

export default Toasty;
