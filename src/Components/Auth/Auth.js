import React, { useState } from 'react';
import Login from '../Login/Login';

export default function Auth(props) {
  const [user, setUser] = useState(undefined);

  
  return (
    <>
      {user === undefined ? (
        <div>
          <Login />
        </div>
      ) : (
        <div>{props.children}</div>
      )}
    </>
  );
}
