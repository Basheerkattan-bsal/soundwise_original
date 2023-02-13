import React, { useContext, useState, useEffect } from "react";
import PlayerContext from "../../context/PlayerContext";
import { NavLink } from "react-router-dom";
import classes from "./Player.module.css";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
/* import { faDark } from '@fortawesome/free-solid-svg-icons'; */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getDetails from "../../functions/getDetails.js";

import { useToken } from "../../spotify";

export default function PlayerTrackInfo() {
  const [player, playerDispatch] = useContext(PlayerContext);
  const { context } = player;
  const [trackInfo, setTrackInfo] = useState(null);
  const [artistInfo, setArtistInfo] = useState(null);
  const searchParams = useToken();
  const artist = context ? context?.artists[0] : false;
  useEffect(() => {
    const data = async () => {
      const routes = document.getElementById("routes");
      routes.scrollTo({ top: 0, behavior: "smooth" });
      if (artist) {
        const newTrack = await getDetails(
          context.type,
          context.id,
          searchParams
        );
        setTrackInfo(newTrack);

        const newArtist = await getDetails(
          artist.type,
          artist.id,
          searchParams
        );
        setArtistInfo(newArtist);
      }
    };
    data();
  }, [context]);

  return (
    context && (
      <div className={classes["track-container"]}>
        <div className={classes["track-info"]}>
          <div className={classes["track-image"]}>
            <img
              src={trackInfo?.album?.images[2].url}
              alt="/artist_image"
            /*   style={{ width: "4rem", height: "4rem", margin: "0.7rem" }} */
            />
          </div>
        </div>
        <div className={classes["track-description"]}>
          <NavLink
            className={classes["track-name"]}
            to="/single"
            state={{ track: context }}
          >
            {trackInfo?.name}{" "}
          </NavLink>
          <NavLink
            className={classes["artist-name"]}
            to="/artist"
            state={{ artist: artistInfo }}
          >
            {artistInfo?.name}
          </NavLink>
        </div>
        <div>
          <FontAwesomeIcon icon={faHeart} />
        </div>
      </div>
    )
  );
}
