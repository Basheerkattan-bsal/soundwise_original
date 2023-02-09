import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Library.module.css";
import style from "../MusicBox.module.css";
import playlistImg from "../../media/headphones-gradient.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

export default function Library() {
  return (
    <div translate="no" className={classes.main}>
      <h1>Playlists</h1>
      <div className={classes["playlist_container"]}>
        <div className={classes.likedBox}>
          <div>
            <h2>Your favorite song</h2>
            <h5>0 liked songs</h5>
          </div>
          <div>
            <FontAwesomeIcon className={classes["player-icon"]} icon={faPlay} />
          </div>
        </div>
        <div className={style.albumBox}>
          <NavLink className={style.albumBox}>
            <div className={style.albumImage}>
              <img src={playlistImg} alt="/playlist_image" />
            </div>
            <div className={style.albumName}>My Playlist #</div>
            <div className={style.artistName}>By: </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
