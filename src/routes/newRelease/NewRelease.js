import React, { useEffect, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import MainContext from "../../context/MainContext";
import style from "../MusicBox.module.css";
//import Bouncer from "../../functions/bouncer.js";

export default function NewRelease(props) {
  const [STATE, DISPATCH] = useContext(MainContext);
  const navigate = useNavigate();
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
          if (res.error) {
            navigate("/");
          } else {
            DISPATCH({
              type: "SET_NEW_RELEASE",
              newRelease: res,
            });
          }
        });
    }
    getNewRelease();
  }, []);

  return (
    <div className={style.main}>
      <h2>New Releases</h2>
      {newRelease && (
        <div className={style.albumContainer}>
          {newRelease?.albums?.items.map((album, index) => {
            return (
              <div key={index} className={style.albumBox}>
                <NavLink
                  to="/album"
                  state={{ album: album }}
                  className={style.albumBox}
                >
                  <div className={style.albumImage}>
                    <img src={album.images[1].url} alt="/artist_image" />
                  </div>
                  <div className={style.albumName}>{album.name}</div>
                  <div className={style.artistName}>
                    BY: {album.artists[0].name}
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      )}
      <Outlet />

      <h2>Featured Playlists</h2>
    </div>
  );
}
