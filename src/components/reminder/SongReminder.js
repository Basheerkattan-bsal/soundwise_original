import React, { useContext, useState } from "react";
import classes from "./SongReminder.module.css";

import { loginUrl } from "../../spotify";
import DisplayContext from "../../context/DisplayContext.js";
import MainContext from "../../context/MainContext.js";
import { useEffect } from "react";

export default function SongReminder() {
  const [{ token, hashToken }, DISPATCH] = useContext(MainContext);
  const [{ songInfo }, dispatch] = useContext(DisplayContext);
  const [songImg, setSongImg] = useState(null);

  const getTrackInfo = async trackId => {
    await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      method: "GET",
      accept: "application/json",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(res => setSongImg(res.album.images[1].url));
  };
  useEffect(() => {
    //get image from album or from track
    if (!hashToken) {
      if (songInfo.type === "album") {
        setSongImg(songInfo.images[1].url);
      } else if (songInfo.type === "track") {
        const trackId = songInfo.id;
        getTrackInfo(trackId);
      }
    }
  }, [songInfo]);

  return (
    !hashToken &&
    songInfo && (
      <div translate="no" className={classes.main}>
        <div className={classes.reminderBox}>
          <div className={classes.songImage}>
            {<img src={songImg} alt="/song_image" />}
          </div>
          <div className={classes.reminderText}>
            <h2>Start listening with a free Spotify account</h2>
            <a href={loginUrl}>LOGIN TO SPOTIFY</a>
            <button
              onClick={() => {
                dispatch({
                  type: "SET_SONG_REMINDER",
                  songReminder: false,
                });
              }}
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    )
  );
}
