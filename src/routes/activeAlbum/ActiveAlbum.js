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

  const getReleaseDate = date => {
    // const date = releaseDate;
    const monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const getMonth = Math.floor(+date.substring(5, 7));
    let alphaMonth = "";
    monthArr.forEach((val, index) => {
      if (index === getMonth) {
        alphaMonth = val;
      }
    });
    const fullDate =
      alphaMonth + " " + date.substring(8, 10) + ", " + date.substring(0, 4);
    setReleaseTime(fullDate);
  };

  const getCatTracks = async () => {
    await fetch(`https://api.spotify.com/v1/albums/${trackId}`, searchParams)
      .then(res => res.json())
      .then(res => {
        setAlbumTracks(res.tracks)
        getReleaseDate(res.release_date);

        let timeCounter = 0;
        if (res.album_type === "album") {
          res.tracks?.items.map(track => {
            timeCounter += track.duration_ms;
          });
          const durationTime = msToTime(timeCounter);
          setDuration(durationTime[0]);
        } else {
          const activeTime = msToTime(res.tracks.items[0].duration_ms);
          setDuration(activeTime[2]);
        }


      });
  };

  const getArtistInfo = async () => {
    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      searchParams
    ).then(res =>
      res.json().then(res => {
        if (res.error) {
          navigate("/");
        } else {
          setArtistInfo(res);
        }
      })
    );
  };

  useEffect(() => {
    fetchColor();
    if (trackId) {
      getCatTracks();
      getArtistInfo()
    }
  }, [album])

  return (
    <div className={classes.main}>
      {albumInfo && artistInfo && (
        <div>
          <Bouncer dependencies={['album', album]} />
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
