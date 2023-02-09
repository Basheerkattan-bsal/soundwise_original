import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Bouncer from "../../functions/bouncer.js";
import Header from "../components/header/Header.js";
import TracksMap from "../../components/tracksMap/TracksMap.js";
import PopularAlbums from "../artist/PopularAlbums.js";
import RelatedArtists from "../artist/RelatedArtists.js";

import { useToken } from "../../spotify.js";
import getDetails from "../../functions/getDetails.js";

import classes from "../category-list/CategoryTracks.module.css";

export default function ActiveAlbum() {
  const { state } = useLocation();
  const { album } = state;
  const [albumInfo, setAlbumInfo] = useState(false);
  const [artistInfo, setArtistInfo] = useState(null);

  const searchParams = useToken();

  useEffect(() => {
    const routes = document.getElementById('routes')
    routes.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    if (album) {
      getDetails(album.type, album.id, searchParams).then(res =>
        setAlbumInfo(res)
      );
      getDetails(album.artists[0].type, album.artists[0].id, searchParams).then(
        res => setArtistInfo(res)
      );
    }
  }, [album]);

  return (
    <div className={classes.main}>
      {albumInfo && artistInfo && (
        <div>
          <Bouncer dependencies={["album", album]} />
          <div className={classes.headerNav}>The top nav</div>

          <Header target={albumInfo} artistInfo={artistInfo} />

          <TracksMap
            target={albumInfo}
            picture={false}
            artists={true}
            album={false}
            info={true}
          />

          <div className={classes.moreInfo} translate="no">
            <h2>{artistInfo.name}'s Albums</h2>
            <PopularAlbums artistId={artistInfo.id} />
          </div>

          <div className={classes.moreInfo} translate="no">
            <h2>{artistInfo.name} Related Artists</h2>
            <RelatedArtists artistId={artistInfo.id} />
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}
