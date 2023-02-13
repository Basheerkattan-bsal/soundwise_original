import React, { useContext} from "react";
import classes from "./Player.module.css";
import PlayerContext from "../../context/PlayerContext";
import MainContext from "../../context/MainContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
/* import { useToken } from '../../spotify';
import getDetails from '../../functions/getDetails.js';  */
import CurrentTrack from "./CurrentTrack";
import Volume from "./Volume";
import PlayerButton from "./PlayerButton";
import Bouncer from "../../functions/bouncer.js";
const Player = () => {
  const [player, playerDispatch] = useContext(PlayerContext);
  const [{ hashToken }, DISPATCH] = useContext(MainContext);

  return (
    hashToken && (
      <div className={classes.player}>
        <Bouncer dependencies={["playlist"]} />
        <div className={classes["player-container"]}>
        
          <CurrentTrack />
          <PlayerButton />
          <div className={classes['volume-lyrics']}>

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
          <Volume />
          </div>
        </div>
      </div>
    )
  );
};
export default Player;
