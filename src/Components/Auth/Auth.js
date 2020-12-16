import React, { useState, useEffect } from 'react';
import { useHistory, Route } from 'react-router-dom';
import { getJwt } from './helpers';
import axios from 'axios';
import Login from '../Login/Login';

export default function Auth(props) {
  const [user, setUser] = useState(undefined);
  const jwt = getJwt();
  const history = useHistory();

  useEffect(() => {
    if (!jwt) {
      history.push('/login');
    }
    getUser();
  }, []);

  async function getUser() {
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_SERVER_URL}/api/login/getUser`,
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    };
    try {
      const response = await axios(config);
      setUser(response.data.email);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {user === undefined ? (
        <div>
          <Route exact path='/login' component={Login} />
        </div>
      ) : (
        <div>{props.children}</div>
      )}
    </>
  );
}
