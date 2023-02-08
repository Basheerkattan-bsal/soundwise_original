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
  const { context } = player;
  const uri = context.uri;

  const { playerState } = player;

  const headersParam = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + hashToken,
  };

  const [isPlaying, setPlaying] = useState(false);

  //Progress Bar
  const audioPlayer = useRef();
  const progressBar = useRef();

  //Play - Pause
  const changePlayPause = () => {
    const prevValue = isPlaying;
    setPlaying(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
  };

  /*
  const usePlaySong = async () => {
   const deviceID = await  fetch('https://api.spotify.com/v1/me/player/devices', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization:   `Bearer ${hashToken}`,
      },
  
    }) */
  /* devices="525f0c0b767681dad96177094f27f13464a33ce3" */
  /*  console.log('The device id ', await deviceID.json()) 
    console.log(hashToken);

    await fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${hashToken}`,
      },
      data: {
        context_uri: uri,
        offset: {
          position: context.track_number - 1,
        },
        position_ms: 0,
      },
    });

    playerDispatch({ type: "SET_PLAYER_STATE", playerState: true });
  };*/

  /* const changeState = async () => {
    console.log('play button was clicked');
    const state = playerState ? 'pause' : 'play';
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: headersParam,
      }
    );
    playerDispatch({
      type: 'SET_PLAYER_STATE',
      playerState: !playerState,
    });
  }; */

  /*  const changeTrack = async type => {
    console.log('type of button', type);
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: headersParam,
      }
    );
    playerDispatch({ type: 'SET_PLAYER_STATE', playerState: true });
    const response1 = await axios.get(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: headersParam,
      }
    );
    if (response1.data !== '') {
      const currentPlaying = {
        id: response1.data.item.id,
        name: response1.data.item.name,
        artists: response1.data.item.artists.map(artist => artist.name),
        image: response1.data.item.album.images[2].url,
      };
      playerDispatch({ type: 'SET_PLAYING', currentPlaying });
    } else {
      playerDispatch({ type: 'SET_PLAYING', currentPlaying: null });
    }
  }; */

  return (
    <div className={classes.player}>
      <div className={classes["shuffle-button"]}>
        <FontAwesomeIcon icon={faShuffle} />
      </div>
      <div className={classes["backward-button"]}>
        <FontAwesomeIcon
          icon={faBackwardStep}
          // onClick={() => changeTrack('previous')}
        />
      </div>
      <div className={classes["play-button"]} onClick={changePlayPause}>
        {isPlaying ? (
          <FontAwesomeIcon className={classes["player-icon"]} icon={faPause} />
        ) : (
          <FontAwesomeIcon className={classes["player-icon"]} icon={faPlay} />
        )}
      </div>
      <div className={classes["forward-button"]}>
        <FontAwesomeIcon
          icon={faForwardStep}
          /*  onClick={() => {
            changeTrack('next');
          }} */
        />
      </div>
      <div className={classes["repeat-button"]}>
        <FontAwesomeIcon icon={faRepeat} />
      </div>
    </div>
  );
}
