import React, { useContext } from "react";
import axios from "axios";
import PlayerContext from "../../../context/PlayerContext";
import MainContext from "../../../context/MainContext.js";

export default function ChangeTrack({ type }) {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [player, playerDispatch] = useContext(PlayerContext);
  const { playerState } = player;

  console.log("change track called");

  const fetchData = async () => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + hashToken,
        },
      }
    );
    playerDispatch({ type: "SET_PLAYER_STATE", playerState: true });

    const response1 = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + hashToken,
        },
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
  fetchData();

  return <React.Fragment></React.Fragment>;
}
