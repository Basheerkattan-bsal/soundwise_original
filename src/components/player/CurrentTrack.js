import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import PlayerContext from '../../context/PlayerContext';
import MainContext from '../../context/MainContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
/* import classes from "./CurrentTrack.module.css";
 */ import classes from './Player.module.css';
export default function CurrentTrack() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const [{ currentPlaying }, playerDispatch] = useContext(PlayerContext);

  const getCurrentTrack = async () => {
    const response = await axios.get(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: 'Bearer ' + hashToken,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data !== '') {
      const currentPlaying = {
        id: response.data.item.id,
        name: response.data.item.name,
        artists: response.data.item.artists.map(artist => artist.name),
        image: response.data.item.album.images[2].url,
      };
      DISPATCH({ type: 'SET_PLAYING', currentPlaying });
    } else {
      DISPATCH({ type: 'SET_PLAYING', currentPlaying: null });
    }
  };

  useEffect(() => {
    getCurrentTrack();
  }, [hashToken, playerDispatch]);
  return (
    hashToken && (
      <div>
        {currentPlaying && (
          <div className={classes['track-container']}>
            <div className={classes['track-info']}>
              <div className={classes['track-image']}>
                <img
                  src={currentPlaying.image}
                  alt="/artist_image"
                  /*   style={{ width: "4rem", height: "4rem", margin: "0.7rem" }} */
                />
              </div>
            </div>
            <div className={classes['track-description']}>
              <NavLink className={classes['track-name']} to="/single">
                {currentPlaying.name}
              </NavLink>
              <NavLink className={classes['artist-name']} to="/artist">
                {currentPlaying.artists.join(', ')}
              </NavLink>
            </div>
            <div>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
        )}
      </div>
    )
  );
}

/*  <div className={classes['track-container']}>
            <div className={classes['track__info']}>
              <div className={classes['track__image']}>
                <img src={currentPlaying.image} alt="currentPlaying" />
              </div>
            </div>
            <div className={classes['track-description']}>
              <div className={classes['track__name']}>
                {currentPlaying.name}
              </div>
              <div className={classes['track__artists']}>
                {currentPlaying.artists.join(', ')}
              </div>
            </div>
          </div> */
