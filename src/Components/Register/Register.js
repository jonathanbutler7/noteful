import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../Login/Login.module.scss';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setLError] = useState('');
  const history = useHistory();

  function validate(e) {
      e.preventDefault()
      if (password !== confirmPassword) {
          setLError('passwords do not match')
      } else if (password === confirmPassword) {
          submit(e)
      }
  }

  async function submit(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_SERVER_URL}/api/login/register`;
    var data = { email, password };
    try {
      let response = await axios.post(url, data);
      console.log(response);
      history.push('/login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.viewport}>
      <div className={styles.addForm}>
        <h5>Create an account</h5>
        <form onSubmit={(e) => validate(e)}>
          <label htmlFor='email'>
            email
            <input
              type='text'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor='password'>
            password
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor='password'>
            password
            <input
              type='password'
              name='confirmpassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          <button type='submit'>Create an account</button>
        </form>
        {error && error}
        <Link to='/login'>Already have an account?</Link>
      </div>
    </div>
  );
}
