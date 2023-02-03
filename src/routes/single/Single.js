import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Lyrics from "./Lyrics.js";
import Header from "../components/header/Header.js";
import TracksMap from "../../components/tracksMap/TracksMap.js";
import PopularAlbums from "../artist/PopularAlbums.js";
import RelatedArtists from "../artist/RelatedArtists.js";

import getDetails from "../../functions/getDetails.js";
import fetchColor from "../../functions/getColor.js";
import { useToken } from "../../spotify.js";

import style from "./Single.module.css";
import classes from "../category-list/CategoryTracks.module.css";

import Bouncer from "../../functions/bouncer.js";

export default function Single() {
  const { state } = useLocation();
  const track = state.track;

  const [trackInfo, setTrackInfo] = useState(null);
  const [artistInfo, setArtistInfo] = useState(null);
  const [popularTrack, setPopularTrack] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [colors, setColors] = useState(null);

  const searchParams = useToken();

  const realTrack = track.track ? track.track : track;
  const songName = realTrack?.name;
  const artist = track.artists[0];

  let trackArr = [];
  if (popularTrack) {
    trackArr = showMore
      ? popularTrack?.tracks.slice(0, 10)
      : popularTrack?.tracks.slice(0, 5);
  }

  useEffect(() => {
    const data = async () => {
      const routes = document.getElementById("routes");
      routes.scrollTo({ top: 0, behavior: "smooth" });
      if (artist.id) {
        const newTrack = await getDetails(
          realTrack.type,
          realTrack.id,
          searchParams
        );
        setTrackInfo(newTrack);
        const newColors = await fetchColor(newTrack.album.images[0].url);
        setColors(newColors);
        const newArtist = await getDetails(
          artist.type,
          artist.id,
          searchParams
        );
        setArtistInfo(newArtist);
        const popularTracks = await getDetails(
          artist.type,
          artist.id,
          searchParams,
          "/top-tracks?country=DE&limit=10"
        );
        setPopularTrack(popularTracks);
      }
    };
    data();
  }, [state]);

  return (
    <div className={classes.main}>
      {track && colors && artistInfo && (
        <div>
          <Bouncer dependencies={["single", track]} />
          <div translate="no" className={classes.headerNav}>
            The SINGLE page
          </div>
          <Header target={trackInfo.album} artistInfo={artistInfo} />
          <div className={style["song-container"]}>
            <Lyrics colors={colors} songName={songName} />

            <div translate="no" className={style["artist_info"]}>
              <img
                src={artistInfo.images[1].url}
                alt="artist_image"
                className={style["artist_profile_image"]}
              />
              <div>
                <h5 style={{ padding: "0.5rem 0" }}>ARTIST</h5>
                <h4> {artist.name}</h4>
              </div>
            </div>
          </div>
          <div translate="no">
            <div className={style["popular_track"]}>
              <p>Popular Tracks by</p>
              <h3>{artist.name}</h3>
            </div>
            {popularTrack && (
              <TracksMap
                target={trackArr}
                picture={true}
                artists={true}
                album={true}
                release={true}
              />
            )}
            {popularTrack?.tracks.length > 5 && (
              <button
                onClick={() => setShowMore(!showMore)}
                className={style["show_btn"]}
              >
                {showMore ? "SHOW LESS" : "SEE MORE"}
              </button>
            )}
          </div>
          <div translate="no">
            <h2>{artist.name} Albums</h2>
            <PopularAlbums artistId={artist.id} />
          </div>

          <div translate="no">
            <h2>{artist.name} Related Artists</h2>
            <RelatedArtists artistId={artist.id} />
          </div>
        </div>
      )}
    </div>
  );
}
