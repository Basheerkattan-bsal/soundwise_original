import React, { useContext, useEffect } from "react";
import { spotify } from "../../spotify";
import { GetTokenFromResponse } from "../../spotify";
import MainContext from "../../context/MainContext";

export default function UserPlayList() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { user } = STATE;

  useEffect(() => {
    async function getData() {
      const hash = GetTokenFromResponse();
      window.location.hash = "";

      let _token = hash.access_token;

      if (_token) {
        spotify.setAccessToken(_token);
        DISPATCH({
          type: "SET_TOKEN",
          token: _token,
        });

        let playListId = "";

        await spotify.getUserPlaylists().then(response => {
          console.log(response);
          console.log(response.items[0].id);
          playListId = response.items[0].id;

          DISPATCH({
            type: "SET_PLAYLISTS",
            playList: response,
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

  return <div>Play List...</div>;
}
