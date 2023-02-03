import React, { useContext, useState, useEffect } from "react";
import classes from "./Player.module.css";
import PlayerContext from "../../context/PlayerContext";

import { useToken } from "../../spotify";
import getDetails from "../../functions/getDetails.js";

const Player = () => {
  const [player, playerDispatch] = useContext(PlayerContext);
  const { context } = player;

  const [trackInfo, setTrackInfo] = useState(null);
  const [artistInfo, setArtistInfo] = useState(null);
  const [popularTrack, setPopularTrack] = useState(null);

  const searchParams = useToken();

  console.log("trackInfo", trackInfo);
  console.log("artistInfo", artistInfo);
  console.log("popularTrack", popularTrack);

  /*   const songName = realTrack?.name;
   */ const artist = context?.artists[0];

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
        /*         const popularTracks = await getDetails(
          artist.type,
          artist.id,
          searchParams,
          "/top-tracks?country=DE&limit=10"
        );
        setPopularTrack(popularTracks);
 */
      }
    };
    data();
  }, [context]);

  return (
    <div
      className={classes.player}
      translate="no"
      style={{ color: "white", display: "flex" }}
    >
      <div>
        <img
          src={artistInfo?.images[2].url}
          alt="/artist_image"
          style={{ width: "4rem", height: "4rem", margin: "0.7rem" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div>{trackInfo?.name} </div>
        <div>{artistInfo?.name}</div>
      </div>
    </div>
  );
};

export default Player;
