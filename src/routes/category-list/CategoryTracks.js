import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Bouncer from '../../functions/bouncer.js';
import Header from '../components/header/Header.js'
import TracksMap from '../../components/tracksMap/TracksMap.js'

import { useToken } from '../../spotify.js';
import getDetails from '../../functions/getDetails.js'

import classes from '../category-list/CategoryTracks.module.css';


export default function CategoryTracks() {

  const { state } = useLocation()
  const { playlist } = state
  const [playlistInfo, setPlaylistInfo] = useState(false)
  
  const searchParams = useToken();

  useEffect(async() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
    if (playlist) {
      const newPlaylist = await getDetails(playlist.type, playlist.id, searchParams)
      setPlaylistInfo(newPlaylist)
    }
  }, [playlist])

  return (
    <div className={classes.main} translate="no">
      {playlistInfo && (
        <div>
          <Bouncer dependencies={['playlist', playlist]} />
          <div className={classes.headerNav}>The top nav</div>

          <Header target={playlistInfo} />

          <TracksMap target={playlistInfo} picture={true} artists={true} album={true} release={true} />
        </div>
      )}
      <Outlet />
    </div>
  );
}
