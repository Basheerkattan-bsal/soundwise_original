import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useToken } from "../../spotify.js";
import DisplayContext from "../../context/DisplayContext.js";
import classes from "./CategoryList.module.css";
import style from "../MusicBox.module.css";
//import Bouncer from "../../functions/bouncer.js";

export default function CategoryList() {
  const searchParams = useToken();
  const navigate = useNavigate();
  const [display, dispatch] = useContext(DisplayContext);
  const { playLists, catId, catName } = display;

  const getCatPlaylist = async () => {
    await fetch(
      `https://api.spotify.com/v1/browse/categories/${catId}/playlists?limit=50`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          navigate("/");
        } else {
          dispatch({
            type: "SET_PLAYLISTS",
            playLists: res,
          });
        }
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getCatPlaylist();
  }, []);

  return (
    <div className={style.main}>
      <div>
        {playLists && (
          <div>
            <h2 className={classes.header}> {catName} </h2>
            <div className={style.albumContainer}>
              {playLists?.playlists?.items?.map((playlist, index) => {

                return (
                  playlist && (
                    <NavLink
                      to="/activePlaylist"
                      state = {{activePlaylist : playlist}}
                      key={index}
                      className={style.albumBox}
                    >
                      <div className={style.albumImage}>
                        <img
                          src={playlist.images[0].url}
                          alt="/ playlist_image"
                        />
                      </div>
                      <div className={style.albumName}>
                        {playlist.description}
                      </div>
                      <div className={style.artistName}>{playlist.name}</div>
                    </NavLink>
                  )
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
