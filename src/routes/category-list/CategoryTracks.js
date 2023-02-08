import React, { useEffect, useState, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Bouncer from "../../functions/bouncer.js";
import Header from "../components/header/Header.js";
import TracksMap from "../../components/tracksMap/TracksMap.js";

import { useToken } from "../../spotify.js";
import getDetails from "../../functions/getDetails.js";

import classes from "../category-list/CategoryTracks.module.css";

import PlayerContext from "../../context/PlayerContext.js";
import Songs from "../../routes/songs/Songs.js";

export default function CategoryTracks() {
  //for the lyrics to pop up
  const [player, playerDispatch] = useContext(PlayerContext);
  const { seeLyrics, context } = player;

  const { state } = useLocation();
  const { playlist } = state;
  const [playlistInfo, setPlaylistInfo] = useState(false);

  const searchParams = useToken();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (playlist) {
      getDetails(playlist.type, playlist.id, searchParams).then(res =>
        setPlaylistInfo(res)
      );
    }
  }, [playlist]);

  return seeLyrics ? (
    <Songs songName={context.name} />
  ) : (
    <div className={classes.main} translate="no">
      {playlistInfo && (
        <div>
          <Bouncer dependencies={["playlist", playlist]} />
          <div className={classes.headerNav}>The top nav</div>

          <Header target={playlistInfo} />

          <TracksMap
            target={playlistInfo}
            picture={true}
            artists={true}
            album={true}
            release={true}
            info={true}
          />
        </div>
      )}
      <Outlet />
    </div>
  );
}
