import React, { useState, useEffect, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import MainContext from "../../context/MainContext.js";

export default function Dashboard(props) {
  /*   console.log("dashboard", props);
   */ const [play, setPlay] = useState(false);
  const [{ token }, DISPATCH] = useContext(MainContext);

  /*   const progressBarStyles = {
    width: (props.progress_ms * 100) / props.item.duration_ms + "%",
  }; */
  useEffect(() => setPlay(true), [props.trackUri]);

  if (!token) return null;
  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={props.trackUri ? [props.trackUri] : []}
    />
  );
}
