import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "../../routes/category-list/CategoryTracks.module.css";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArtistsMap from "../../routes/components/artistsMap/ArtistsMap.js";
import PlayerContext from "../../context/PlayerContext.js";

import Songs from "../../routes/songs/Songs.js";

import msToTime from "../../functions/timer.js";

const TracksMap = ({ target, picture, artists, album, release, info }) => {
  const [player, playerDispatch] = useContext(PlayerContext);
  const { seeLyrics, context } = player;
  console.log("seelyrics", seeLyrics);
  const [isActive, setIsActive] = useState(-1);

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
          /*  console.log('realTrack', realTrack) */

          return (
            <div
              key={index}
              onClick={e => {
                e.stopPropagation();
                setIsActive(index);
              }}
              onDoubleClick={e => {
                playerDispatch({
                  type: "SET_CONTEXT",
                  context: realTrack,
                });
              }}
              className={`${isActive === index ? classes.active : ""} ${
                classes["playlist-container"]
              } `}
            >
              <div className={classes.playlistInfo} key={index}>
                <div className={classes.trackImg}>
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
