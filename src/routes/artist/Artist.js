import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useToken } from "../../spotify.js";
import msToTime from '../../functions/timer.js'
import getDetails from "../../functions/getDetails.js";

import Header from '../components/header/Header.js'
import TracksMap from "../../components/tracksMap/TracksMap.js";
import PopularAlbums from "../artist/PopularAlbums.js";
import RelatedArtists from "../artist/RelatedArtists.js";
import Bouncer from "../../functions/bouncer.js";

import classes from '../category-list/CategoryTracks.module.css'
import style from './Artist.module.css'

export default function Artist() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [colors, setColors] = useState(null);

  const [isActive, setIsActive] = useState(-1);
  const [artistInfo, setArtistInfo] = useState(null);
  const [popularTrack, setPopularTrack] = useState(null);
  const [showMore, setShowMore] = useState(false);

  //search params for fetching data{
  const searchParams = useToken();

  let trackArr = [];
  const {artist} = state
  console.log(artist)
  const artistName = artist.name;
  const artistId = artist.id;


  if (popularTrack) {
    trackArr = showMore
      ? popularTrack?.tracks.slice(0, 10)
      : popularTrack?.tracks.slice(0, 5);
  }


  useEffect(async() => {
    window.scrollTo(0, 0);
    if (artistId) {
      const newArtist = await getDetails(artist.type, artist.id, searchParams);
      setArtistInfo(newArtist)
      const popularTracks = await getDetails(artist.type, artist.id, searchParams, '/top-tracks?country=DE&limit=10');
      console.log(popularTracks)
      setPopularTrack(popularTracks)
    }

  }, [state]);

  // handle selected track to be active and lost focus by click outside of playlist
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = e => {
      if (!ref?.current?.contains(e.target)) {
        setIsActive(-1);
      }
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleOutsideClick, false);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [isActive]);

  return (
    <div className={classes.main}>
      <Bouncer dependencies={[artist]} />
      {state && artistInfo && (
        <div>
          <div className={classes.headerNav}>The ARTIST page</div>
          <Header target={artistInfo} />
          <div>
            {popularTrack &&
              <TracksMap target={trackArr} />
            }
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
