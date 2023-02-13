import React, { useRef, useEffect, useState, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { prominent } from 'color.js';
import PlayerContext from '../../context/PlayerContext.js';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { useToken } from '../../spotify.js';
import PopularAlbums from '../artist/PopularAlbums.js';
import RelatedArtists from '../artist/RelatedArtists.js';
import classes from './Album.module.css';

//import Bouncer from "../../functions/bouncer.js";

export default function CategoryTracks() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const album = state.album;
  console.log(album, ' this is from album.js');
  const [colors, setColors] = useState(null);
  const [duration, setDuration] = useState('');
  const [isActive, setIsActive] = useState(-1);
  const [singleAlbum, setSingleAlbum] = useState(null);
  const [artistInfo, setArtistInfo] = useState(null);
  const [releaseTime, setReleaseTime] = useState('');
  const [player, playerDispatch] = useContext(PlayerContext);
  const { context, playerState } = player;

  //search params for fetching data
  const searchParams = useToken();

  const artistName = state?.album?.artists[0].name;
  const artistId = state?.album?.artists[0].id;

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

    const duration = h + ' h ' + m + ' min';
    if (s < 10) {
      s = '0' + s;
    }
    const trackTime = m + ':' + s;

    let albumDuration = '';
    if (h > 0) {
      albumDuration = h + ' h ' + m + ' min ' + s + ' sec';
    } else {
      albumDuration = m + ' min ' + s + ' sec';
    }

    return [duration, trackTime, albumDuration];
  }

  const getAlbum = async albumId => {
    await fetch(`https://api.spotify.com/v1/albums/${albumId}`, searchParams)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          navigate('/');
        } else {
          setSingleAlbum(res);

          /* store the colors from album cover */
          prominent(res.images[1].url, {
            format: 'hex',
            amount: 5,
          }).then(color => {
            setColors(color);
          });

          //get release date
          getReleaseDate(res.release_date);

          let timeCounter = 0;
          if (res.album_type === 'album') {
            res.tracks?.items.map(track => {
              timeCounter += track.duration_ms;
              const durationTime = msToTime(timeCounter);
              setDuration(durationTime[2]);
              return durationTime;
            });
          } else {
            const singleTime = msToTime(album.duration_ms);
            setDuration(singleTime[2]);
          }
        }
      });
  };

  //get artist info
  const getArtistInfo = async () => {
    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      searchParams
    ).then(res =>
      res.json().then(res => {
        if (res.error) {
          navigate('/');
        } else {
          setArtistInfo(res);
        }
      })
    );
  };

  //convert time to date format
  const getReleaseDate = date => {
    // const date = releaseDate;
    const monthArr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const getMonth = Math.floor(+date.substring(5, 7));
    let alphaMonth = '';
    monthArr.forEach((val, index) => {
      if (index === getMonth) {
        alphaMonth = val;
      }
    });
    const fullDate =
      alphaMonth + ' ' + date.substring(8, 10) + ', ' + date.substring(0, 4);
    setReleaseTime(fullDate);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (state) {
      getAlbum(state.albumId);
      getArtistInfo();
    }
  }, [state.albumId]);

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
    <div className={classes.main} translate="no">
      {singleAlbum && colors && (
        <div>
          <div className={classes.headerNav}>The ALBUM</div>
          <div
            className={classes.header}
            style={{
              backgroundImage: `linear-gradient(to bottom left, ${colors[3]},  ${colors[4]})`,
            }}
          >
            <img
              className={classes['album_cover']}
              src={singleAlbum?.images[1].url}
              alt="track_image"
              
            />
            <div className={classes["play-button"]}>
        {playerState ? (
          <FontAwesomeIcon className={classes["player-icon"]} icon={faPause} />
        ) : (
          <FontAwesomeIcon className={classes["player-icon"]} icon={faPlay} />
        )} {/* ===> On hover both the play button and the heart should be visible */} {/* important */}
      </div>
            <div>
              <h4>{singleAlbum?.album_type}</h4>
              <h2>{singleAlbum?.name}</h2>
              <div className={classes.headerInfo}>
                <div>
                  <img
                    src={artistInfo?.images[2].url}
                    alt="artist_image"
                    className={classes['artist_image']}
                  />
                  <NavLink className={classes.profileLink} to="/profile">
                    {singleAlbum?.artists[0].name}
                  </NavLink>
                  <span></span>
                  <p style={{ fontWeight: 'bold' }}>
                    {singleAlbum?.release_date.substring(0, 4)}{' '}
                  </p>
                  <span></span>
                  <p style={{ fontWeight: 'bold' }}>
                    {singleAlbum?.total_tracks}
                    {singleAlbum.total_tracks > 1 ? ' songs' : ' song'}
                    {', '}
                  </p>
                  <p>{duration}</p>
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
              {/* checking if album_type is single then no map */}
              {singleAlbum?.album_type === 'single' && (
                <div
                  onClick={e => {
                    e.stopPropagation();
                    setIsActive(0);
                  }}
                  className={`${isActive === 0 ? classes.active : ''} ${
                    classes['playlist-container']
                  } `}
                >
                  <div className={classes.playlistInfo}>
                    <div className={classes.trackImg}>
                      <div>{1}</div>
                    </div>
                    <div className={classes.trackInfo}>
                      <div>{singleAlbum.name}</div>
                      <div>
                        {' '}
                        {singleAlbum.artists.map((artist, index) => {
                          return (
                            <div key={index} className={classes['artist_name']}>
                              {(index ? ',' : '') + artist.name}
                            </div>
                          );
                        })}{' '}
                      </div>
                    </div>
                  </div>

                  <div className={classes['track-duration']}>
                    {msToTime(album.duration_ms)[1]}
                  </div>
                </div>
              )}
              {/* if album_type is "album" need to map through track items */}
              {singleAlbum?.album_type === 'album' &&
                singleAlbum?.tracks?.items.map((track, index) => {
                  return (
                    <div
                      key={index}
                      onClick={e => {
                        e.stopPropagation();
                        setIsActive(index);
                      }}
                      className={`${isActive === index ? classes.active : ''} ${
                        classes['playlist-container']
                      } `}
                    >
                      <div className={classes.playlistInfo} key={index}>
                        <div className={classes.trackImg}>
                          <div>{index + 1}</div>
                        </div>
                        <div className={classes.trackInfo}>
                          <div>{track.name}</div>
                          <div className={classes['artist_name']}>
                            {' '}
                            {track.artists.map((artist, index) => {
                              return (
                                <div key={index}>
                                  {(index ? ',' : '') + artist.name}
                                </div>
                              );
                            })}{' '}
                          </div>
                        </div>
                      </div>

                      <div className={classes['track-duration']}>
                        {msToTime(track.duration_ms)[1]}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className={classes['album_copyright']}>
              <div>{releaseTime}</div>
              <div>{singleAlbum.copyrights[0].text}</div>
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
    </div>
  );
}
