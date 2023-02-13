import axios from "axios";
import React, { useEffect, useContext, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import PlayerContext from "../../context/PlayerContext";
import MainContext from "../../context/MainContext";
import classes from "./PlayerBody.module.css";

import msToTime from "../../functions/timer.js";
import Player from "./Player";
import Songs from "../../routes/songs/Songs";

export default function PlayerBody() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [{ seeLyrics, selectedPlaylist }, playerDispatch] =
    useContext(PlayerContext);
  /* const [selectedPlaylist, setSelectedPlaylist] = useState(null); */
  const [isActive, setIsActive] = useState(-1);
  const [songName, setSongName] = useState("");

  const location = useLocation();
  const selectedPlaylistId = location.state.id;

  const headerParams = {
    Authorization: "Bearer " + hashToken,
    "Content-Type": "application/json",
  };

  const getInitialPlaylist = async () => {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
      {
        headers: headerParams,
      }
    );
    const selectedPlaylist = {
      id: response.data.id,
      name: response.data.name,
      description: response.data.description.startsWith("<a")
        ? ""
        : response.data.description,
      image: response.data.images[0].url,
      tracks: response.data.tracks.items.map(({ track }) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map(artist => artist.name),
        image: track.album.images[2].url,
        duration: track.duration_ms,
        album: track.album.name,
        context_uri: track.album.uri,
        track_number: track.track_number,
      })),
    };
    playerDispatch({ type: "SET_SELECTED_PLAYLISTS", selectedPlaylist });
    /* setSelectedPlaylist(selectedPlaylist); */
  };

  useEffect(() => {
    if (selectedPlaylistId) {
      getInitialPlaylist();
    }
  }, [hashToken, playerDispatch, selectedPlaylistId]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: headerParams,
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      playerDispatch({ type: "SET_PLAYING", currentPlaying });
      playerDispatch({ type: "SET_PLAYER_STATE", playerState: true });
    } else {
      playerDispatch({ type: "SET_PLAYER_STATE", playerState: true });
    }
  };

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

  return (
    hashToken && (
      <div className={classes.main} translate="no">
        {selectedPlaylist && (
          <div>
            {seeLyrics ? (
              <Songs songName={songName} />
            ) : (
              <div>
                <div className={classes.playlist}>
                  <div className={classes.image}>
                    <img src={selectedPlaylist.image} alt="selected playlist" />
                  </div>
                  <div className={classes.details}>
                    <span className={classes.type}>PLAYLIST</span>
                    <h1 className={classes.title}>{selectedPlaylist.name}</h1>
                    <p className={classes.description}>
                      {selectedPlaylist.description}
                    </p>
                  </div>
                </div>
                <div>
                  <div className={classes["song-info"]}>
                    <div className={classes["song-title"]}>
                      <div>#</div>
                      <div>TITLE</div>
                    </div>
                    <div className={classes["song-album"]}>
                      <span>ALBUM</span>
                    </div>
                    <div className={classes["song-time"]}>
                      <FontAwesomeIcon icon={faClock} />
                    </div>
                  </div>

                  {selectedPlaylist.tracks.map(
                    (
                      {
                        id,
                        name,
                        artists,
                        image,
                        duration,
                        album,
                        context_uri,
                        track_number,
                      },
                      index
                    ) => {
                      return (
                        <div
                          className={`${
                            isActive === index ? classes.active : ""
                          } ${classes["playlist-container"]} `}
                          key={id}
                          onClick={e => {
                            e.stopPropagation();
                            setIsActive(index);
                          }}
                          onDoubleClick={() => {
                            playTrack(
                              id,
                              name,
                              artists,
                              image,
                              context_uri,
                              track_number
                            );
                            setSongName(name);
                          }}
                        >
                          <div className={classes.playlistInfo} key={index}>
                            <div lassName={classes.trackImg}>
                              <span>{index + 1} </span>
                              <img src={image} alt="track" />
                            </div>
                          </div>
                          <div className={classes.trackInfo}>
                            <div className={classes["track-nav"]}>{name}</div>
                            <div>{artists}</div>
                          </div>

                          <div className={classes["album-info"]}>
                            <div className={classes["album-name"]}>{album}</div>
                          </div>
                          <div className={classes["track-duration"]}>
                            <div>{msToTime(duration)[1]}</div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
            <Player />
          </div>
        )}
      </div>
    )
  );
}
