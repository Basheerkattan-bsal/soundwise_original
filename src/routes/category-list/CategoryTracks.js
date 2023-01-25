import React, { useContext, useLayoutEffect } from "react";
import { useEffect, useState } from "react";
import { useToken } from "../../spotify.js";
import DisplayContext from "../../context/DisplayContext.js";
import style from "../MusicBox.module.css";
import classes from "./CategoryTracks.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { prominent } from 'color.js';
import Bouncer from '../../functions/bouncer.js'



export default function CategoryTracks(props) {
  const [display, dispatch] = useContext(DisplayContext);
  const { tracks, activePlaylist } = display;
  const [colors, setColors] = useState(null);
  const [duration, setDuration] = useState("");

  const trackId = activePlaylist?.id;
  const trackName = activePlaylist?.name;
  //search params for fetching data
  const searchParams = useToken();


  //convert duration time to hours and minutes
  function msToTime(ms) {
    let d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    h += d * 24;
    const duration = h + "h" + m + "m" + s + "s";
    return duration;
  }

  //store the colors from album cover
  const fetchColor = async () => {
    prominent(activePlaylist?.images[0]?.url, {
      format: "hex",
      amount: 5,
    }).then(color => {
      setColors(color);
    });
  };

  /*   const getCatTracks = async () => {
    await fetch(`https://api.spotify.com/v1/playlists/${trackId}`, searchParams)
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: 'SET_TRACKS',
          tracks: res,
        })
      );
  }; */

  const getCatTracks = async () => {
    await fetch(`https://api.spotify.com/v1/playlists/${trackId}`, searchParams)
      .then(res => res.json())
      .then(res => {
        //counting total tracks duration time
        let timeCounter = 0;
        res.tracks.items.map(track => {
          timeCounter += track.track.duration_ms;
          const durationTime = msToTime(timeCounter);
          setDuration(durationTime);
          return durationTime;
        });

        dispatch({
          type: "SET_TRACKS",
          tracks: res,
        });
      });
  };

  useEffect(() => {
    if (trackId) {
      getCatTracks();
      fetchColor();
    }
  }, []);

  return (
    <div className={classes.main}>
      {tracks && colors && (
        <div>
          <Bouncer dependencies={[activePlaylist]} />
          <div className={classes.headerNav}>The top nav</div>
          <div
            className={classes.header}
            style={{
              /* backgroundColor: colors[3] , */ backgroundImage: `linear-gradient(to bottom left, ${colors[3]},  ${colors[4]})`,
            }} //set background color to album cover colors set
          >
            <img src={activePlaylist.images[0].url} alt="track_image" />
            <div>
              <h2>{trackName}</h2>
              <div className={classes.headerInfo}>
                <p>{activePlaylist.description}</p>
                <div>
                  <NavLink className={classes.profileLink} to="/profile">
                    Spotify
                  </NavLink>
                  <span></span>
                  <p>{tracks.followers.total} likes </p>
                  <span></span>
                  <p>about {duration}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={classes.mainContainer}>
              <div className={classes["song-info"]}>
                <div>#</div>
                <div>TITLE</div>
              </div>
              <div className={classes["song-info"]}>ALBUM</div>
              <div className={classes["song-info"]}>RELEASE DATE</div>
              <div className={classes["song-info"]}>
                <FontAwesomeIcon icon={faClock} />
              </div>
            </div>
            {tracks?.tracks?.items.map((track, index) => {
              return (
                <div className={classes["playlist-container"]} key={index}>
                  <div className={classes.playlistInfo} key={index}>
                    <div className={classes.trackImg}>
                      <div>{index + 1}</div>
                      {
                        <img
                          src={track.track.album.images[2].url}
                          alt="playlist_image"
                        />
                      }
                    </div>
                    <div className={classes.trackInfo}>
                      <div>{track.track.name}</div>
                      <div> {track.track.artists[0].name} </div>
                    </div>
                  </div>
                  <div className={classes["album-info"]}>
                    <div>{track.track.album.name}</div>
                  </div>
                  <div className={classes["album-date"]}>
                    {track.track.album.release_date}
                  </div>{" "}
                  <div className={classes["track-duration"]}>
                    {track.track.album.duration_ms}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
