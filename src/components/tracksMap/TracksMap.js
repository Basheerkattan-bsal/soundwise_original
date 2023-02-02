import React, { useState, useEffect, useRef} from 'react'
import { NavLink } from 'react-router-dom'

import msToTime from '../../functions/timer.js'

import classes from '../../routes/category-list/CategoryTracks.module.css'
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArtistsMap from '../../routes/components/artistsMap/ArtistsMap.js';

const TracksMap = ({target}) => {
  const [isActive, setIsActive] = useState(-1);

  const realMap = target?.tracks ? target.tracks.items : target?.track ? target.track.items : target

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
        {realMap?.map((track, index) => {
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
                    state={{ singleTrack: track, album: target }}
                  >
                    {track.name}
                  </NavLink>
                  <div style={{display: 'flex', gap: '.2rem'}}>
                    {' '}
                    <ArtistsMap artists={track.artists} />
                    {' '}
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
  )
}

export default TracksMap
