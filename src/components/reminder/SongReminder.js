import React, { useContext } from "react";
import classes from "./NavReminder.module.css";

import { loginUrl } from "../../spotify";
import DisplayContext from "../../context/DisplayContext.js";
import songImg from "../../media/headphones-gradient.png";
export default function SongReminder({ title, message }) {
  const [{ songReminder }, dispatch] = useContext(DisplayContext);
  return (
    <div translate="no" className={classes.main}>
      <div className={classes.reminderBox}>
        <div className={classes.songImg}>
          <img src={songImg} alt="/song_image" />
        </div>
        <div>
          <h2>Start listening with a free Spotify account</h2>
          <a href={loginUrl}>LOGIN TO SPOTIFY</a>
          <button
            onClick={() => {
              dispatch({
                type: "SET_SONG_REMINDER",
                navReminder: false,
              });
            }}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
