import React, { useEffect, useContext } from "react";
import classes from "../MusicBox.module.css";
import MainContext from "../../context/MainContext";

export default function NewRelease(props) {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { newRelease, token } = STATE;

  useEffect(() => {
    async function getNewRelease() {
      await fetch("https://api.spotify.com/v1/browse/new-releases?&limit=12", {
        method: "GET",
        accept: "application/json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(res => {
          DISPATCH({
            type: "SET_NEW_RELEASE",
            newRelease: res,
          });
        });
    }
    getNewRelease();
  }, []);

  return (
    <div className={classes.main}>
      <h2>New Releases</h2>
      {newRelease && (
        <div className={classes.albumContainer}>
          {newRelease.albums.items.map((album, index) => {
            return (
              <div key={index} className={classes.albumBox}>
                <div className={classes.albumImage}>
                  <img src={album.images[1].url} alt="artist image" />
                </div>
                <div className={classes.albumName}>{album.name}</div>
                <div className={classes.artistName}>
                  BY: {album.artists[0].name}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <h2>Featured Playlists</h2>
    </div>
  );
}
