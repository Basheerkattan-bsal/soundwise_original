import React, { useState, useEffect, useContext } from "react";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import MainContext from "../../context/MainContext";
import classes from "./Playlist.module.css";
import logo from "../../media/headphones-gradient.png";
import fetchColor from "../../functions/getColor.js";
export default function MyPlaylist() {
  const [{ user, hashToken }, DISPATCH] = useContext(MainContext);
  const [colors, setColors] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  const getInfo = async () => {
    if (user) {
      const userId = user.id;
      await fetchColor(logo).then(res => setColors(res));
      await axios
        .get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + hashToken,
          },
        })
        .then(function (response) {
          setPlaylists(response?.data?.items.length);
        });
    }
  };
  useEffect(() => {
    if (hashToken) {
      getInfo();
    }
  }, [user]);
  return (
    user && (
      <div className={classes.main}>
        {colors && (
          <div>
            <div translate="no" className={classes.headerNav}>
              The CREATE PLAYLIST page
            </div>
            <div
              className={classes.header}
              style={{
                backgroundImage: `linear-gradient(to bottom left, ${
                  colors ? colors[3] : "black"
                },  ${colors ? colors[4] : "black"})`,
              }}
            >
              <div>
                <img
                  className={classes["album_cover"]}
                  src={logo}
                  alt="logo_image"
                />
              </div>
              <div className={classes["banner_text"]}>
                <h4>PLAYLIST</h4>
                <h1>My Playlist #{playlists > 0 ? playlists + 1 : 1}</h1>
                <h5>{user.display_name} </h5>
              </div>
            </div>
            <div className={classes.dotArea}>
              <h2>...</h2>
            </div>
            <div className={classes["song-container"]}>
              <div>
                <h3>Let's find something fro your playlist</h3>
              </div>
              <div className={classes.searchBar}>
                <input
                  className="fa"
                  placeholder="&#xF002; Search for songs or episodes"
                  type="input"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
