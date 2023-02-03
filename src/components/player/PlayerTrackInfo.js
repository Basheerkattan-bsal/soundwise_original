import React from 'react';
import classes from './Player.module.css';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
/* import { faDark } from '@fortawesome/free-solid-svg-icons'; */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function PlayerTrackInfo() {
  return (
    <div className={classes['track-container']}>
      <div className={classes['track-info']}>
        <div className={classes['track-image']}>
            image
        </div>
        <div className={classes['track-description']}>
          <div className={classes['track-name']}>
            song
          </div>
          <div className={classes['artist-name']}>
            artist
          </div>
        </div>
      </div>
      <div><FontAwesomeIcon icon= {faHeart} />
      </div>
    </div>
  );
}
