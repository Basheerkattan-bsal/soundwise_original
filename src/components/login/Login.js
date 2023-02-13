import React, { useContext } from "react";
import { useEffect } from "react";
import MainContext from "../../context/MainContext";

import { loginUrl } from "../../spotify";
import classes from "./Login.module.css";

function Login() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { login, user, hashToken } = STATE;

  const getUser = async () => {
    await fetch("https://api.spotify.com/v1/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + hashToken,
      },
    })
      .then(res => res.json())
      .then(res =>
        DISPATCH({
          type: "SET_USER",
          user: res,
        })
      );
  };
  useEffect(() => {
    if (hashToken) {
      getUser();
    }
  }, [hashToken]);

  return (
    <div>
      {!login ? (
        <div className={classes.main}>
          <a href={loginUrl}>LOGIN TO SPOTIFY</a>
        </div>
      ) : (
        <div>
          <button>{user?.displayName}</button>
        </div>
      )}
    </div>
  );
}

export default Login;
