import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { spotify } from "./spotify";
import { GetTokenFromResponse } from "./spotify";
import MainContext from "./context/MainContext.js";
import PlayerContext from "./context/PlayerContext";

import DisplayContext from "./context/DisplayContext.js";
import SongReminder from "./components/reminder/SongReminder";
import Nav from "./components/nav/Nav";
import MyPlayer from "./components/player/PlayerBody";
import Player from "./components/player/Player";
import TrackPlayer from "./components/trackPlayer/Player";

import Home from "./routes/home/Home";
import Search from "./routes/search/Search";
import Library from "./routes/library/Library";
import Songs from "./routes/songs/Songs";
import CategoryTracks from "./routes/category-list/CategoryTracks";
import Profile from "./routes/profile/Profile";
import MyPlaylist from "./routes/playlist/Playlist";
import Artist from "./routes/artist/Artist";
import Single from "./routes/single/Single";
import ActiveAlbum from "./routes/activeAlbum/ActiveAlbum";
import LikedSong from "./routes/likedSong/LikedSong";

import classes from "./App.module.css";

import UserPlayList from "./routes/user_playList/UserPlayList";
import PlayerBody from "./components/player/PlayerBody";

function App() {
  const [{ songReminder }, dispatch] = useContext(DisplayContext);
  const [{ hashToken, user }, DISPATCH] = useContext(MainContext);
  const [{ isPlayer, trackPlayer }, playerDispatch] = useContext(PlayerContext);

  console.log(songReminder);
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
    <div>
      {!songReminder ? (
        <div className={classes.main}>
          <Nav />
          <div id="routes" className={classes.routes}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="search" element={<Search />} />
              {hashToken && <Route path="library" element={<Library />} />}
              {hashToken && (
                <Route path="playlist" element={<UserPlayList />} />
              )}
              {hashToken && <Route path="songs" element={<Songs />} />}
              <Route path="activePlaylist" element={<CategoryTracks />} />
              <Route path="album" element={<ActiveAlbum />} />
              <Route path="artist" element={<Artist />} />
              <Route path="single" element={<Single />} />
              <Route path="profile" element={<Profile />} />
              <Route path="player" element={<Player />} />
              <Route path="myPlayer" element={<MyPlayer />} />
              <Route path="myPlaylist" element={<MyPlaylist />} />
              {<Route path="likedSong" element={<LikedSong />} />}
            </Routes>
          </div>
          {isPlayer && hashToken && <PlayerBody />}
          {hashToken && trackPlayer && <Player />}
        </div>
      ) : (
        <div className={classes["songReminder_container"]}>
          {!hashToken && <SongReminder />}
        </div>
      )}
    </div>
  );
}
export default App;
