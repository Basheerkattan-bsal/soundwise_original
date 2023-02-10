import React, { useContext, useState, useEffect, useRef } from "react";
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
//import SpotifyPlayer from "react-spotify-web-playback";

import PlayerContext from "../../context/PlayerContext";
import MainContext from "../../context/MainContext.js";

import classes from "./PlayerButton.module.css";
/* import ChangeTrack from "./player-functions/changeTrack";
import ChangeState from "./player-functions/changeState";
 */

export default function PlayerButton() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [player, playerDispatch] = useContext(PlayerContext);
  const { context, playerState } = player;
  const uri = context.uri;
  const headersParam = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + hashToken,
  };

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: headersParam,
        }
      );
      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map(artist => artist.name),
          image: response.data.item.album.images[2].url,
        };
        playerDispatch({ type: "SET_PLAYING", currentPlaying });
      } else {
        playerDispatch({ type: "SET_PLAYING", currentPlaying: null });
      }
    };
    getCurrentTrack();
  }, [hashToken, playerDispatch]);

  const playSong = async () => {
    //get device info. to play songs
    const deviceRes = await axios.get(
      "https://api.spotify.com/v1/me/player/devices ",
      {
        headers: headersParam,
      }
    );
    const deviceId = deviceRes.data.devices[0].id;
    console.log(deviceId);

    const state = playerState ? "pause" : "play";
    deviceId &&
      (await axios.put(
        `https://api.spotify.com/v1/me/player/${state}/volume?volume_percent=55&device_id="${deviceId}"`,

        {
          context_uri: uri,
        },
        {
          headers: headersParam,
        }
      ));
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
          <FontAwesomeIcon className={classes["player-icon"]} icon={faPause} />
        ) : (
          <FontAwesomeIcon className={classes["player-icon"]} icon={faPlay} />
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
