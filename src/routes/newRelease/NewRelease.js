import React, { useEffect, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import DisplayContext from "../../context/DisplayContext.js";
import MainContext from "../../context/MainContext";
import PlayerContext from "../../context/PlayerContext.js";
import style from "../MusicBox.module.css";
import classes from '../../components/player/PlayerButton.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
//import Bouncer from "../../functions/bouncer.js";

export default function NewRelease(props) {
  const [{ playerState }, playerDispatch] = useContext(PlayerContext);
  const [{ newRelease, token, hashToken}, DISPATCH] = useContext(MainContext);
  const [{ navReminder }, dispatch] = useContext(DisplayContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function getNewRelease() {
      await fetch("https://api.spotify.com/v1/browse/new-releases?&limit=12", {
        method: "GET",
        accept: "application/json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            navigate("/");
          } else {
            DISPATCH({
              type: "SET_NEW_RELEASE",
              newRelease: res,
            });
          }
        });
    }
    getNewRelease();
  }, []);

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    if (hashToken) {
      /* const deviceRes = await axios.get(
        "https://api.spotify.com/v1/me/player/devices ",
        {
          headers: headersParam,
        }
      );
      const deviceId = deviceRes.data.devices[0].id; */
      /* /volume?volume_percent=55&device_id="${deviceId}" 
      deviceId &&*/
      await axios.put(
        `https://api.spotify.com/v1/me/player/${state}`,

        {},
        {
          headers: headersParam,
        }
      );
    }
    playerDispatch({
      type: "SET_PLAYER_STATE",
      playerState: !playerState,
    });
  };
  const headersParam = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + hashToken,
  };


  return (
    <div className={style.main}>
      <h2>New Releases</h2>
      {newRelease && (
        <div className={style.albumContainer}>
          {newRelease?.albums?.items.map((album, index) => {
            /*             console.log("album for reminder", album);
             */ return (
              <div key={index} className={style.albumBox}>
                <NavLink
                  to="/album"
                  state={{ album: album }}
                  className={style.albumBox}
                >
                  <div className={style.albumImage}>
                    <img src={album.images[1].url} alt="/artist_image" />
                    <div className={classes["play-button"]}>
        {playerState ? (
          <FontAwesomeIcon
            className={classes["player-icon"]}
            icon={faPause}
            onClick={changeState}
          />
        ) : (
          <FontAwesomeIcon
            className={classes["player-icon"]}
            icon={faPlay}
            onClick={changeState}
          />
        )}
      </div>
                  </div>
                  <div className={style.albumName}>{album.name}</div>
                  <div className={style.artistName}>
                    BY: {album.artists[0].name}
                  </div>
                </NavLink>
              
              </div>
            );
          })}
        </div>
      )}
      <Outlet />

      <h2>Featured Playlists</h2>
    </div>
  );
}
