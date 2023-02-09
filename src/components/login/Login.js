import React from 'react'


import { loginUrl } from '../../spotify';
import classes from './Login.module.css'
import MainContext from '../../context/MainContext';
import { useContext } from 'react';

function Login() {
  const [STATE, DISPATCH] = useContext(MainContext)
  const {login, user} = STATE


  return (
    <div>
    {!login ?   <div className={classes.main}>
      
      <a href={loginUrl}>LOGIN TO SPOTIFY</a>
      
      </div> : <div></div> }
      </div>
   
  )
}

export default Login