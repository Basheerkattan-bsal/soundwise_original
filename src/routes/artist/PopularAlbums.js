import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../spotify.js";

import style from "../MusicBox.module.css";
import PlaylistResults from "../search/searchComponents/PlaylistResults.js";

export default function PopularAlbums({ artistId }) {
  const searchParams = useToken();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState(null);

  const getPopularAlbums = async () => {
    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?country=DE&limit=7&include_groups=album,single`,
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
  }, [artistId]);

  return (
    <div className={style.main} style={{marginTop: 0, marginBottom: 0, paddingBottom: 0}}>
        {albums && (
          <div>
            <div className={style.albumContainer}>
              <PlaylistResults playlists={albums}/>
            </div>
          </div>
        )}
    </div>
  );
}
