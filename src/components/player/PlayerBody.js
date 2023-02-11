import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import PlayerContext from "../../context/PlayerContext";
import MainContext from "../../context/MainContext";
import classes from "./PlayerBody.module.css";
import msToTime from "../../functions/timer.js";
import Player from "./Player";

export default function PlayerBody() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [player, playerDispatch] = useContext(PlayerContext);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

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
    setSelectedPlaylist(selectedPlaylist);
  };

  useEffect(() => {
    if (selectedPlaylistId) {
      getInitialPlaylist();
    }
  }, [hashToken, location]);

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

  return (
    hashToken && (
      <div className={classes.mainContainer}>
        {selectedPlaylist && (
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
                      className={classes["playlist-container"]}
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className={classes.playlistInfo} key={index}>
                        <div lassName={classes.trackImg}>
                          <div>{index + 1} </div>
                          <img src={image} alt="track" />
                          <div className={classes.trackInfo}>
                            <span className={classes["track-nav"]}>{name}</span>
                            <span>{artists}</span>
                          </div>
                        </div>
                      </div>
                      <div className={classes["album-info"]}>
                        <span className={classes["album-name"]}>{album}</span>
                      </div>
                      <div className={classes["track-duration"]}>
                        <span>{msToTime(duration)[1]}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
            <Player />
          </div>
        )}
      </div>
    )
  );
}
