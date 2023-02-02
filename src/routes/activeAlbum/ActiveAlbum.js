import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Bouncer from '../../functions/bouncer.js';
import Header from '../components/header/Header.js'
import TracksMap from '../../components/tracksMap/TracksMap.js'
import PopularAlbums from '../artist/PopularAlbums.js';
import RelatedArtists from '../artist/RelatedArtists.js';

import { useToken } from '../../spotify.js';
import getDetails from '../../functions/getDetails.js'

import classes from '../category-list/CategoryTracks.module.css';

export default function ActiveAlbum() {
  const { state } = useLocation()
  const { album } = state
  const [albumInfo, setAlbumInfo] = useState(false)
  const [artistInfo, setArtistInfo] = useState(null);

  const searchParams = useToken();

  useEffect(async() => {
    if (album) {
      const newAlbum = await getDetails(album.type, album.id, searchParams)
      const newArtist = await getDetails(album.artists[0].type, album.artists[0].id, searchParams)

      console.log('artis', newArtist)
      setAlbumInfo(newAlbum)
      setArtistInfo(newArtist)
    }
  }, [album])

  return (
    <div className={classes.main}>
      {albumInfo && artistInfo && (
        <div>
          <Bouncer dependencies={[album]} />
          <div className={classes.headerNav}>The top nav</div>

          <Header target={albumInfo} artistInfo={artistInfo} />

          <TracksMap target={albumInfo} />

          <div>
            <h2>{artistInfo.name} Albums</h2>
            <PopularAlbums artistId={artistInfo.id} />
          </div>

          <div>
            <h2>{artistInfo.name} Related Artists</h2>
            <RelatedArtists artistId={artistInfo.id} />
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}
