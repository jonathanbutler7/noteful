import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.scss';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setLError] = useState('');
  const history = useHistory();

  async function submit(e) {
    e.preventDefault();
    const url = `${process.env.REACT_APP_SERVER_URL}/api/login/gettoken`
    var data = { email, password };
    try {
      let response = await axios.post(url, data);
      localStorage.setItem('noteful-jwt', response.data);
      history.push('/');
    } catch (error) {
      setLError('Email/password combo incorrect');
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
          <button type='submit'>Log in</button>
        </form>
        demo account: <br/>email: email@test.com <br/>password: password
        {error && error}
        <Link to='/signup'>Don't have an account?</Link>
      </div>
    </div>
  );
}
