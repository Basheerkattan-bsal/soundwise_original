import React, { useEffect, useState } from 'react';
import { useToken } from '../../spotify.js';
import classes from '../category-list/CategoryTracks.module.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import msToTime from '../../functions/timer.js';
import { useNavigate } from "react-router-dom";
import PopularAlbums from '../artist/PopularAlbums.js';
import RelatedArtists from '../artist/RelatedArtists.js';
import { prominent } from 'color.js';
import Bouncer from '../../functions/bouncer.js';
import { useRef } from 'react';

export default function ActiveAlbum() {


  const [colors, setColors] = useState(null);
  const [duration, setDuration] = useState('');
  const [isActive, setIsActive] = useState(-1);
  const [artistInfo, setArtistInfo] = useState(null);
  const [releaseTime, setReleaseTime] = useState("");
  const { state } = useLocation()
  const { album } = state
  const [albumTracks, setAlbumTracks] = useState(false)
  const artistName = album?.artists[0].name;
  const artistId = album?.artists[0].id;
  const trackId = album?.id;
  const trackName = album?.name;
  //search params for fetching data
  const searchParams = useToken();
  const navigate = useNavigate()

  //store the colors from album cover
  const fetchColor = async () => {
    prominent(album?.images[0]?.url, {
      format: 'hex',
      amount: 5,
    }).then(color => {
      setColors(color);
    });
  };

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
          const activeTime = msToTime(album.duration_ms);
          setDuration(activeTime[0]);
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
  }, [album]);

  // handle selected track to be active and lost focus by click outside of playlist
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = e => {
      if (!ref?.current?.contains(e.target)) {
        setIsActive(-1);
      }
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick, false);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, [isActive]);

  return (
    <div id='album-main' className={classes.main}>
      {album && colors && (
        <div>
          <Bouncer dependencies={[album]} />
          <div className={classes.headerNav}>The top nav</div>

          <div
            className={classes.header}
            style={{
              backgroundImage: `linear-gradient(to bottom left, ${colors[3]},  ${colors[4]})`,
            }}
          >
            <img
              className={classes["album_cover"]}
              src={album?.images[1]?.url}
              alt="track_image"
            />
            <div>
              <h2>{album?.name}</h2>
              <div className={classes.headerInfo}>
                <div>
                  <img
                    src={artistInfo?.images[2].url}
                    alt="artist_image"
                    className={classes["artist_image"]}
                  />
                  {
                    album.artists.map((artist, index) => {
                      return (
                        <React.Fragment key={index}>
                          {index ? '- ' : ''}
                          <NavLink
                            className={classes.profileLink}
                            to="/artist"
                            key={index}
                            state={{ artist }}
                          >
                            {artist.name}
                          </NavLink>
                        </React.Fragment>
                      );
                    })
                  }
                  <span></span>
                  <p style={{ fontWeight: "bold" }}>
                    {album?.release_date.substring(0, 4)}{" "}
                  </p>
                  <span></span>
                  <p style={{ fontWeight: "bold" }}>
                    {album?.total_tracks}
                    {album.total_tracks > 1 ? " songs" : " song"}
                  </p>
                  <span></span>
                  <p style={{ fontWeight: "bold" }}>{duration}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className={classes.mainContainer}>
              <div className={classes['song-info']}>
                <div className={classes['song-title']}>
                  <div>#</div>
                  <div>TITLE</div>
                </div>

                <div className={classes['song-time']}>
                  <FontAwesomeIcon icon={faClock} />
                </div>
              </div>
              {albumTracks?.items?.map((track, index) => {
                return (
                  <div
                    key={index}
                    onClick={e => {
                      e.stopPropagation();
                      setIsActive(index);
                    }}
                    className={`${isActive === index ? classes.active : ''} ${classes['playlist-container']
                      } `}
                  >
                    <div className={classes.playlistInfo} key={index}>
                      <div className={classes.trackImg}>
                        <div>{index + 1}</div>
                      </div>
                      <div className={classes.trackInfo}>
                        <NavLink
                          className={classes['track-nav']}
                          to="/single"
                          state={{ singleTrack: track, album: album }}
                        >
                          {track.name}
                        </NavLink>
                        <div>
                          {' '}
                          {track.artists.map((artist, index) => {
                            return (
                              <NavLink
                                className={classes['track-navName']}
                                to="/artist"
                                key={index}
                                state={{ artist }}
                              >
                                {(index ? ', ' : '') + artist.name}
                              </NavLink>
                            );
                          })}{' '}
                        </div>
                      </div>
                    </div>
                    <div className={classes['album-date']}>
                    </div>{' '}
                    <div className={classes['track-duration']}>
                      {msToTime(track.duration_ms)[1]}
                    </div>
                  </div>
                );
              })}
            </div>
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
      <Outlet />
    </div>
  );
}
