import React, { useContext, useState } from "react";
import classes from "./Player.module.css";
import PlayerContext from "../../context/PlayerContext";
import PlayTrack from "./player-functions/playTrack";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
/* import { useToken } from '../../spotify';
import getDetails from '../../functions/getDetails.js';  */
import PlayerTrackInfo from "./PlayerTrackInfo.js";
import PlayerButton from "./PlayerButton";

const Player = () => {
  const [player, playerDispatch] = useContext(PlayerContext);
  /*   console.log(' coming from player.js', player);
   */ /* const searchParams = useToken();  */
  //console.log("context", context);
  // console.log("trackInfo", trackInfo);
  //console.log("artistInfo", artistInfo);
  //console.log("popularTrack", popularTrack);
  /*   const songName = realTrack?.name; */

  return (
    <div className={classes.player}>
      <div className={classes["player-container"]}>
        <PlayerTrackInfo />
        <PlayerButton />
        {/*  <PlayTrack /> */}
        <FontAwesomeIcon
          onClick={state => {
            playerDispatch({
              type: "SET_SEE_LYRICS",
              seeLyrics: !state.seeLyrics,
            });
          }}
          className={classes.lyrics}
          icon={faBook}
          title="Lyrics"
        />
      </div>
    </div>
  );
};
export default Player;
