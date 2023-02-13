import React, { useContext } from "react";
import classes from "./Player.module.css";
import PlayerContext from "../../context/PlayerContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

import PlayerTrackInfo from "./PlayerTrackInfo.js";
import PlayerButton from "./PlayerButton.js";

const Player = () => {
  const [player, playerDispatch] = useContext(PlayerContext);
  return (
    <div className={classes.player}>
      <div className={classes["player-container"]}>
        <PlayerTrackInfo />
        <PlayerButton />
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
