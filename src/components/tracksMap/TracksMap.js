import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "../../routes/category-list/CategoryTracks.module.css";

import { faHeart, faClock } from "@fortawesome/free-regular-svg-icons";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArtistsMap from "../../routes/components/artistsMap/ArtistsMap.js";

import MainContext from "../../context/MainContext.js";
import PlayerContext from "../../context/PlayerContext.js";
import DisplayContext from "../../context/DisplayContext.js";
import Songs from "../../routes/songs/Songs.js";

import msToTime from "../../functions/timer.js";

const TracksMap = ({ target, picture, artists, album, release, info }) => {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [{ seeLyrics, context, playerState }, playerDispatch] =
    useContext(PlayerContext);
  const [{ navReminder }, dispatch] = useContext(DisplayContext);
  const [isActive, setIsActive] = useState(-1);

  const navigate = useNavigate();

  const realMap = target.tracks
    ? target.tracks.items
    : target.items
    ? target.items
    : target;

  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = e => {
      if (!ref?.current?.contains(e.target)) {
        setIsActive(-1);
      }
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleOutsideClick, false);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [isActive]);

  return seeLyrics ? (
    <Songs songName={context.name} />
  ) : (
    <div>
      <div className={classes.mainContainer}>
        {info ? (
          <div className={classes["song-info"]}>
            <div className={classes["song-title"]}>
              <div>#</div>
              <div>TITLE</div>
            </div>
            {album ? (
              <React.Fragment>
                <div className={classes["song-album"]}>ALBUM</div>
                {release ? (
                  <div className={classes["song-release"]}>RELEASE DATE</div>
                ) : (
                  ""
                )}
              </React.Fragment>
            ) : (
              ""
            )}
            <div className={classes["song-time"]}>
              <FontAwesomeIcon icon={faClock} />
            </div>
          </div>
        ) : (
          ""
        )}
        {realMap?.map((track, index) => {
          const realTrack = track?.track?.id ? track.track : track;
          return (
            <div
              key={index}
              onClick={e => {
                e.stopPropagation();
                setIsActive(index);
              }}
              onDoubleClick={e => {
                e.preventDefault();
                if (!hashToken) {
                  dispatch({
                    type: "SET_SONG_REMINDER",
                    songReminder: true,
                  });
                  dispatch({
                    type: "SET_SONG_INFO",
                    songInfo: realTrack,
                  });
                } else {
                  playerDispatch({
                    type: "SET_CONTEXT",
                    context: realTrack,
                  });
                  dispatch({
                    type: "SET_SONG_REMINDER",
                    songReminder: false,
                  });
                }
              }}
              className={`${isActive === index ? classes.active : ""} ${
                classes["playlist-container"]
              } `}
            >
              <div className={classes.playlistInfo} key={index}>
                <div className={classes.trackImg}>
                  <div className={classes["play-button"]}>
                    {isActive === index ? (
                      <FontAwesomeIcon
                        className={classes["player-icon"]}
                        icon={faPause}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className={classes["player-icon"]}
                        icon={faPlay}
                      />
                    )}
                  </div>
                  <div>{index + 1}</div>
                  {picture ? (
                    <img
                      src={realTrack?.album?.images[2].url}
                      alt="album_image"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className={classes.trackInfo}>
                  <NavLink
                    className={classes["track-nav"]}
                    to="/single"
                    state={{ track: realTrack }}
                  >
                    {realTrack.name}
                  </NavLink>
                  {artists ? (
                    <div style={{ display: "flex", gap: ".3rem" }}>
                      <ArtistsMap artists={realTrack.artists} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {album ? (
                <React.Fragment>
                  <div className={classes["album-info"]}>
                    <NavLink
                      to="/album"
                      className={classes["album-name"]}
                      state={{
                        album: realTrack.album ? realTrack.album : album,
                      }}
                    >
                      {realTrack.album ? realTrack.album.name : album.name}
                    </NavLink>
                  </div>
                  {release ? (
                    <div className={classes["album-date"]}>
                      {realTrack.album
                        ? realTrack.album.release_date
                        : album.release_date}
                    </div>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ) : (
                ""
              )}
              <div className={classes["track-duration"]}>
                <div>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                {msToTime(realTrack.duration_ms)[1]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TracksMap;
