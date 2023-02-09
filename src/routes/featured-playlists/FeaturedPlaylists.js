import React, { useEffect, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import classes from "../MusicBox.module.css";
import MainContext from "../../context/MainContext";
import DisplayContext from "../../context/DisplayContext.js";
import style from "../MusicBox.module.css";
// import Bouncer from "../../functions/bouncer.js";

export default function FeaturedPlaylists() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const [display, dispatch] = useContext(DisplayContext);
  const { featuredPlaylists, token } = STATE;
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);

    async function getFeaturedPlaylists() {
      await fetch(
        "https://api.spotify.com/v1/browse/featured-playlists?&limit=20",
        {
          method: "GET",
          accept: "application/json",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            navigate("/");
          } else {
            DISPATCH({
              type: "SET_FEATURED_PLAYLISTS",
              featuredPlaylists: res,
            });
          }
        });
    }
    getFeaturedPlaylists();
  }, []);

  return (
    <div className={classes.main}>
      {featuredPlaylists && (
        <div>
          <h3> {featuredPlaylists.message} </h3>
          <div className={classes.albumContainer}>
            {featuredPlaylists?.playlists?.items?.map((playlist, index) => {
              return (
                <div key={index} className={classes.albumBox}>
                  <NavLink
                    to="/activePlaylist"
                    state={{playlist: playlist}}
                    key={index}
                    className={style.albumBox}
                  >
                    <div className={classes.albumImage}>
                      <img
                        src={playlist?.images[0]?.url}
                        alt="/ playlist_image"
                      />
                    </div>
                    <div className={classes.albumName}>
                      {playlist?.description}
                    </div>
                    <div className={classes.artistName}>{playlist?.name}</div>
                  </NavLink>
                </div>
              );
            })}
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
