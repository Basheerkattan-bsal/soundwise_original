import React, { useContext, useEffect } from "react";
import { spotify } from "../../spotify";
import { GetTokenFromResponse } from "../../spotify";
import MainContext from "../../context/MainContext";
import classes from './UserPlayList.module.css'
import { NavLink, Outlet } from "react-router-dom";
export default function UserPlayList() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { user, hashToken } = STATE;

  console.log('This is the playlists',STATE.playlist)

    const playlists = STATE.playlist?.items

    console.log(playlists)
  useEffect(() => {
    async function getData() {
   
      if (hashToken) {
        spotify.setAccessToken(hashToken);
        DISPATCH({
          type: "SET_TOKEN",
          token:hashToken,
        });

        let playListId = "";

        await spotify.getUserPlaylists().then(response => {
          console.log(response);
          console.log(response.items[0].id);
          playListId = response.items[0].id;

          DISPATCH({
            type: "SET_PLAYLIST",
             playlist: response,      
          });
        });

        spotify.getPlaylistTracks(playListId).then(response => {
          console.log(playListId);
          console.log(response);
          DISPATCH({
            type: "SET_PLAYLIST_TRACKS",
            playlistTracks: response,
          });
        });
      }
    }
    getData();
  }, []);

  return <div className={classes.main}>
    {playlists?.map((playlist, index) => {
    return (
      <NavLink to= '/activePlaylist' state= {{playlist: playlist}} key= {index}>{playlist.name}</NavLink>
    )
  })}
  <Outlet/>
  </div>;
}
