import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.scss';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('email@test.com');
  const [password, setPassword] = useState('password');
  const history = useHistory();

  async function submit(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_SERVER_URL}/api/login/gettoken`;
    var data = { email, password };
    try {
      let response = await axios.post(url, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.viewport}>
      <div className={styles.addForm}>
        <h5>Login</h5>
        <form onSubmit={(e) => submit(e)}>
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
          <button type='submit'>submit</button>
        </form>
        <Link to='/signup'>Don't have an account?</Link>
      </div>
    </div>
  );
}
