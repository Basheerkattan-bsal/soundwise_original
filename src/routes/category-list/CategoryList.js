import React, { useContext } from "react";
import { useEffect } from "react";
import { useToken } from "../../spotify.js";
import DisplayContext from "../../context/DisplayContext.js";
import classes from "./CategoryList.module.css";
import style from "../MusicBox.module.css";
import { NavLink, Outlet } from "react-router-dom";


export default function CategoryList() {
  const searchParams = useToken();

  const [display, dispatch] = useContext(DisplayContext);
  const { playLists, catId, catName } = display;

  const getCatPlaylist = async () => {
    await fetch(
      `https://api.spotify.com/v1/browse/categories/${catId}/playlists?limit=50`,
      searchParams
    )
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: "SET_PLAYLISTS",
          playLists: res,
        })
      );
  };
  useEffect(() => {
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
                  <NavLink
                    to="/activePlaylist"
                    onClick={() => {
                      dispatch({
                        type: "SET_ACTIVE_PLAYLIST",
                        activePlaylist: playlist,
                      });
                    }}
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
