import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useToken } from "../../spotify.js";

import style from "../MusicBox.module.css";

export default function PopularAlbums({ artistId }) {
  const searchParams = useToken();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState(null);

  const getPopularAlbums = async () => {
    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=DE&limit=10`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          navigate("/");
        } else {
          setAlbums(res);
        }
      });
  };
  useEffect(() => {
    getPopularAlbums();
  }, []);

  return (
    <div className={style.main}>
      <div>
        {albums && (
          <div>
            <div className={style.albumContainer}>
              {albums?.tracks?.map((album, index) => {
                return (
                  <NavLink
                    to="/album"
                    state={{ album: album.album}}
                    key={index}
                    className={style.albumBox}
                  >
                    <div className={style.albumImage}>
                      <img
                        src={album.album.images[1].url}
                        alt="/album_cover_image"
                      />
                    </div>
                    <div className={style.albumName}>{album.album.name}</div>
                    <div className={style.artistName}>
                      {album.album.release_date.substring(0, 4)} .{" "}
                      {album.album.type}
                    </div>
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