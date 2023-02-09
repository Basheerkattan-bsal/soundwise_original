import React, { useState, useEffect } from "react";
import { useToken } from "../../spotify.js";
import { useNavigate } from "react-router-dom";
import style from "../MusicBox.module.css";
import ArtistsResults from "../search/searchComponents/ArtistsResults.js";

export default function RelatedArtists({ artistId }) {
  const searchParams = useToken();
  const navigate = useNavigate();
  const [relatedArtist, setRelatedArtist] = useState(null);

  const getRelatedArtists = async () => {
    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists?`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          navigate("/");
        } else {
          setRelatedArtist(res);
        }
      });
  };
  useEffect(() => {
    getRelatedArtists();
  }, [artistId]);

  return (
    <div className={style.main} style={{marginTop: 0, marginBottom: 0, paddingBottom: 0}}>
      <div>
        {relatedArtist && (
          <div>
            <div className={style.albumContainer}>
              <ArtistsResults artists={relatedArtist.artists.slice(0, 14)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
