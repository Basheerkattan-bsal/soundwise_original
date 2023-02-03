import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useToken } from "../../spotify.js";
import getDetails from "../../functions/getDetails.js";

import Header from "../components/header/Header.js";
import TracksMap from "../../components/tracksMap/TracksMap.js";
import PopularAlbums from "../artist/PopularAlbums.js";
import RelatedArtists from "../artist/RelatedArtists.js";
import Bouncer from "../../functions/bouncer.js";

import classes from "../category-list/CategoryTracks.module.css";
import style from "./Artist.module.css";

export default function Artist() {
  const { state } = useLocation();
  const { artist } = state;
  const artistName = artist.name;
  const artistId = artist.id;

  const [artistInfo, setArtistInfo] = useState(null);
  const [popularTrack, setPopularTrack] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const searchParams = useToken();

  let trackArr = [];
  if (popularTrack) {
    trackArr = showMore
      ? popularTrack?.tracks.slice(0, 10)
      : popularTrack?.tracks.slice(0, 5);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (artistId) {
      getDetails(artist.type, artist.id, searchParams).then(res => {
        setArtistInfo(res);
        console.log(res);
      });

      getDetails(
        artist.type,
        artist.id,
        searchParams,
        "/top-tracks?country=DE&limit=10"
      ).then(res => setPopularTrack(res));
    }
  }, [state]);

  return (
    <div className={classes.main}>
      <Bouncer dependencies={[artist]} />
      {state && artistInfo && (
        <div>
          <div className={classes.headerNav}>The ARTIST page</div>
          <Header target={artistInfo} />
          <div>
            {popularTrack && (
              <TracksMap
                target={trackArr}
                picture={true}
                artists={false}
                album={true}
              />
            )}
            {popularTrack?.tracks.length > 5 && (
              <button
                onClick={() => setShowMore(!showMore)}
                className={style["show_btn"]}
              >
                {showMore ? "less" : "more"}
              </button>
            )}
          </div>
          <div>
            <h2>{artistName} Albums</h2>
            <PopularAlbums artistId={artistId} />
          </div>
          <div>
            <h2>{artistName} Related Artists</h2>
            <RelatedArtists artistId={artistId} />
          </div>
        </div>
      )}
    </div>
  );
}
