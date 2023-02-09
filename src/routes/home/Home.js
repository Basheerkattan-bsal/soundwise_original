import React, { useEffect, useContext } from "react";
import Login from "../../components/login/Login";
import NewRelease from "../newRelease/NewRelease";
import FeaturedPlaylists from "../featured-playlists/FeaturedPlaylists";
import classes from "./Home.module.css";
import MainContext from "../../context/MainContext";

export default function Home(props) {
  /* const [token, setToken] = useState(''); */
  const [STATE, DISPATCH] = useContext(MainContext);
  const { token } = STATE;
  const SPOTIFY_CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const SPOTIFY_CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body:
        "grant_type=client_credentials&client_id=" +
        SPOTIFY_CLIENT_ID.toString("base64") +
        "&client_secret=" +
        SPOTIFY_CLIENT_SECRET.toString("base64"),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(r => r.json())
      .then(r => {
        /* setToken(r.access_token); */
        DISPATCH({
          type: "SET_TOKEN",
          token: r.access_token,
        });
      });
  }, []);

  

  return (
    <div className={classes.main} translate="no">
     <div className={classes['login-button']}> <Login /></div> 
      {token !== "" && <NewRelease token={token} />}
      {token !== "" && <FeaturedPlaylists token={token} />}
    </div>
  );
}
