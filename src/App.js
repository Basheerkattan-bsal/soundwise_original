import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { spotify } from "./spotify";
import { GetTokenFromResponse } from "./spotify";
import MainContext from "./context/MainContext.js";
import PlayerContext from "./context/PlayerContext";

import Nav from "./components/nav/Nav";
import Home from "./routes/home/Home";
import UserHome from "./routes/user_playList/UserPlayList";
import Search from "./routes/search/Search";
import Library from "./routes/library/Library";
import CreatePlaylist from "./routes/createPlaylist/CreatePlaylist";
/* import Login from "../src/components/login/Login.js";  */
import Songs from "./routes/songs/Songs";
import CategoryTracks from "./routes/category-list/CategoryTracks";
import Profile from "./routes/profile/Profile";
import Player from "./components/player/Player";
import Artist from "./routes/artist/Artist";
import Single from "./routes/single/Single";
import ActiveAlbum from "./routes/activeAlbum/ActiveAlbum";
/* import Album from "./routes/albums/Album"; */
import classes from "./App.module.css";
import { useToken } from "./spotify.js";
import axios from "axios";

function App() {
  const [{ token, hashToken, user }, DISPATCH] = useContext(MainContext);
  const [player, playerDispatch] = useContext(PlayerContext);

  const { musicPlayer } = player;

  const searchParams = useToken();

  useEffect(() => {
    const getPlaybackState = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: "Bearer " + hashToken,
          "Content-Type": "application/json",
        },
      });
      playerDispatch({
        type: "SET_PLAYER_STATE",
        playerState: data.is_playing,
      });
    };
    getPlaybackState();
  }, [playerDispatch, hashToken]);

  useEffect(() => {
    async function getData() {
      const hash = GetTokenFromResponse();
      window.location.hash = "";

      let _token = hash.access_token;
      if (_token) {
        spotify.setAccessToken(_token);
        DISPATCH({
          type: "SET_HASH_TOKEN",
          hashToken: _token,
        });

        spotify.getMe().then(user => {
          DISPATCH({
            type: "SET_USER",
            user,
          });
        });
        let playListId = "";

        await spotify.getUserPlaylists().then(response => {
          playListId = response.items[0].id;

          DISPATCH({
            type: "SET_PLAYLISTS",
            playList: response,
          });
        });

        spotify.getPlaylistTracks(playListId).then(response => {
          DISPATCH({
            type: "SET_PLAYLIST_TRACKS",
            playlistTracks: response,
          });
        });
      }
    }
    getData();
  }, []);

  return (
    <div className={classes.main}>
      <Nav />

      <div id="routes" className={classes.routes}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Search />} />
          {user && <Route path="library" element={<Library />} />}
          {user && <Route path="playlist" element={<CreatePlaylist />} />}
          {user && <Route path="songs" element={<Songs />} />}
          <Route path="activePlaylist" element={<CategoryTracks />} />
          <Route path="album" element={<ActiveAlbum />} />
          <Route path="artist" element={<Artist />} />
          <Route path="single" element={<Single />} />
          <Route path="profile" element={<Profile />} />
          {/*  <Route path="album" element={<Album />} />  */}
        </Routes>
      </div>
      {hashToken && <Player />}
      {user ? <UserHome /> : <div></div>}
    </div>
  );
}

export default App;
