import React, { useEffect, useContext } from "react";
import PlayerContext from "../../context/PlayerContext";
import MainContext from "../../context/MainContext.js";
import axios from "axios";
export default function CurrentTrack() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [player, playerDispatch] = useContext(PlayerContext);
  const { currentPlaying } = player;

  const getCurrentTrack = async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + hashToken,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data !== "") {
      const { item } = response.data;
      const currentPlaying = {
        id: item.id,
        name: item.name,
        artists: item.artists.map(artist => artist.name),
        image: item.album.images[2].url,
      };
      playerDispatch({
        type: "SET_CURRENT_PLAYING",
        currentTrack: currentPlaying,
      });
    }
  };

  useEffect(() => {
    getCurrentTrack();
  }, [hashToken, playerDispatch]);
  return <div>CurrentTrack</div>;
}
