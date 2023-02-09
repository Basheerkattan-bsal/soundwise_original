import React, { useContext } from "react";
import axios from "axios";
import PlayerContext from "../../../context/PlayerContext";
import MainContext from "../../../context/MainContext.js";

export default function ChangeState(type) {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [player, playerDispatch] = useContext(PlayerContext);
  const { playerState } = player;

  console.log("Change state called", type);

  const fetchData = async () => {
    const state = playerState ? "pause" : "play";
    await axios.post(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + hashToken,
        },
      }
    );
    playerDispatch({ type: "SET_PLAYER_STATE", playerState: !playerState });
  };
  fetchData();

  return <React.Fragment></React.Fragment>;
}
