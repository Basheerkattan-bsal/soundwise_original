import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { prominent } from "color.js";

import { useToken } from "../../spotify.js";
import PopularAlbums from "../artist/PopularAlbums.js";
import RelatedArtists from "../artist/RelatedArtists.js";
import classes from "./Artist.module.css";
import Bouncer from "../../functions/bouncer.js";

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

  //get the artist Id to fetch artist api
  const artistId = artist.id;

  //get artist info
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
          prominent(res.images[0].url, {
            format: "hex",
            amount: 5,
          }).then(color => {
            setColors(color);
          });
        }
      })
    );
  };
  const getPopularTrack = async () => {
    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=DE&limit=10`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          navigate("/");
        } else {
          setPopularTrack(res);
        }
      });
  };

  //change the track array to show more or less
  if (popularTrack) {
    trackArr = showMore
      ? popularTrack?.tracks.slice(0, 10)
      : popularTrack?.tracks.slice(0, 5);
  }

  //convert duration time to hours and minutes
  function msToTime(ms) {
    let d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    h += d * 24;
    const duration = h + " h " + m + " min";
    if (s < 10) {
      s = "0" + s;
    }
    const trackTime = m + ":" + s;
    return [duration, trackTime];
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (artistId) {
      getArtistInfo();
      getPopularTrack();
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
      {state && colors && artistInfo && (
        <div>
          <div className={classes.headerNav}>The ARTIST page</div>
          <div
            className={classes.header}
            style={{
              backgroundImage: `linear-gradient(to bottom left, ${colors[3]},  ${colors[4]})`,
            }}
          >
            <img
              className={classes["album_cover"]}
              src={artistInfo?.images[1].url}
              alt="track_image"
            />
            <div>
              <h4>{artistInfo?.type}</h4>
              <h2>{artistInfo?.name}</h2>
              <div className={classes.headerInfo}>
                <div>
                  <img
                    src={artistInfo?.images[2].url}
                    alt="artist_image"
                    className={classes["artist_image"]}
                  />
                  <span></span>
                  <p>
                    {artistInfo?.followers.total.toLocaleString()} followers{" "}
                  </p>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div className={classes["artist_info"]}>
            <img
              src={artistInfo.images[1].url}
              alt="artist_image"
              className={classes["artist_profile_image"]}
            />
            <div>
              <h5 style={{ padding: "0.5rem 0" }}>ARTIST</h5>
              <h4> {artistName}</h4>
            </div>
          </div>
          <div>
            <div className={classes["popular_track"]}>
              <p>Popular Tracks by</p>
              <h3>{artistName}</h3>
            </div>
            <div className={classes.mainContainer}>
              {popularTrack &&
                trackArr.map((track, index) => {
                  return (
                    <div
                      key={index}
                      onClick={e => {
                        e.stopPropagation();
                        setIsActive(index);
                      }}
                      className={`${isActive === index ? classes.active : ""} ${
                        classes["playlist-container"]
                      } `}
                    >
                      <div className={classes.playlistInfo} key={index}>
                        <div className={classes.trackImg}>
                          <div className={classes["track_index"]}>
                            {index + 1}
                          </div>
                          {
                            <img
                              src={track.album.images[2].url}
                              alt="popular_track_image"
                            />
                          }
                        </div>
                      </div>
                      <div className={classes["album-info"]}>
                        <div>{track.name}</div>
                      </div>
                      <div className={classes["album-date"]}>
                        {track.album.release_date}
                      </div>{" "}
                      <div className={classes["track-duration"]}>
                        {msToTime(track.duration_ms)[1]}
                      </div>
                    </div>
                  );
                })}
            </div>
            {popularTrack?.tracks.length > 5 && (
              <button
                onClick={() => setShowMore(!showMore)}
                className={classes["show_btn"]}
              >
                {showMore ? "SHOW LESS" : "SEE MORE"}
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
