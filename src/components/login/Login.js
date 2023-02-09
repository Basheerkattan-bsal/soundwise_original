import React, { useContext } from 'react';
import MainContext from '../../context/MainContext';

import { loginUrl } from '../../spotify';
import classes from './Login.module.css';

function Login() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { login, hashToken } = STATE;
  const headerParams = {
    'Content-Type': 'application/json',
    Authorization: 'bearer' + hashToken,
    
  };
  const getUser = async () => {
    await fetch('http://spotify.com/v1/me', {
      method: "GET",
    headers: headerParams})
    .then(res => res.json())
    .then(res => DISPATCH({
      type: 'SET_USER',
      user : res
    }));
  };
  getUser()

  return (
    <div>
      {!login ? (
        <div className={classes.main}>
          <a href={loginUrl}>LOGIN TO SPOTIFY</a>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Login;
