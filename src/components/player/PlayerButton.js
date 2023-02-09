import React, { useContext, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faPlay,
  faBackwardStep,
  faForwardStep,
  faShuffle,
  faRepeat,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

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
  /*   const [isPlaying, setPlaying] = useState(false);
   */ const { context, offset, contextUri, playerState } = player;
  const uri = contextUri;
  console.log('uri', uri , offset)
  const headersParam = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + hashToken,
  };

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

    //Basheer deviceId : 525f0c0b767681dad96177094f27f13464a33ce3

    const state = playerState ? "pause" : "play";
    deviceId &&
      (await axios.put(
        `https://api.spotify.com/v1/me/player/${state}`,
        JSON.stringify({
          context_uri: uri,
          offset: offset
        }),
        JSON.stringify({
          headers: headersParam,
        })
        
      ));
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
      <div
        className={classes["play-button"]}
        onClick={() => {
          playerDispatch({
            type: "SET_PLAYER_STATE",
            playerState: !playerState,
          });
          playSong()
        }}
      >
        {playerState ? (
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
