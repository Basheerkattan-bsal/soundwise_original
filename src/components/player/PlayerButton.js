import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBackwardStep,
  faForwardStep,
  faShuffle,
  faRepeat,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import PlayerContext from "../../context/PlayerContext";
import MainContext from "../../context/MainContext.js";
import classes from "./PlayerButton.module.css";

export default function PlayerButton() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [{ playerState }, playerDispatch] = useContext(PlayerContext);
  const headersParam = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + hashToken,
  };

  //get play - pause state
  useEffect(() => {
    if (hashToken) {
      const getPlaybackState = async () => {
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/player",
          {
            headers: headersParam,
          }
        );
        playerDispatch({
          type: "SET_PLAYER_STATE",
          playerState: data.is_playing,
        });
      };

      getPlaybackState();
    }
  }, [playerDispatch, hashToken]);

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    if (hashToken) {
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

  const changeTrack = async type => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: headersParam,
      }
    );
    playerDispatch({ type: "SET_PLAYER_STATE", playerState: true });
    const response1 = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: headersParam,
      }
    );
    if (response1.data !== "") {
      const currentPlaying = {
        id: response1.data.item.id,
        name: response1.data.item.name,
        artists: response1.data.item.artists.map(artist => artist.name),
        image: response1.data.item.album.images[2].url,
      };
      playerDispatch({ type: "SET_PLAYING", currentPlaying });
    } else {
      playerDispatch({ type: "SET_PLAYING", currentPlaying: null });
    }
  };

  return (
    <div className={classes.player}>
      <div className={classes["shuffle-button"]}>
        <FontAwesomeIcon
          icon={faShuffle}
          onClick={() => changeTrack("shuffle")}
        />
      </div>
      <div className={classes["backward-button"]}>
        <FontAwesomeIcon
          icon={faBackwardStep}
          onClick={() => changeTrack("previous")}
        />
      </div>
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
      <div className={classes["forward-button"]}>
        <FontAwesomeIcon
          icon={faForwardStep}
          onClick={() => {
            changeTrack("next");
          }}
        />
      </div>
      <div className={classes["repeat-button"]}>
        <FontAwesomeIcon
          icon={faRepeat}
          onClick={() => changeTrack("repeat")}
        />
      </div>
    </div>
  );
}
