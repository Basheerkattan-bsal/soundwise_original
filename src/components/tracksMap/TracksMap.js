import React, { useState, useEffect, useRef} from 'react'
import { NavLink } from 'react-router-dom'

import msToTime from '../../functions/timer.js'

import classes from '../../routes/category-list/CategoryTracks.module.css'
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArtistsMap from '../../routes/components/artistsMap/ArtistsMap.js';

const TracksMap = ({target, picture, artists, album, release}) => {
  const [isActive, setIsActive] = useState(-1);
  console.log(target)

  const realMap = target.tracks ? target.tracks.items : target

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
          {album ? 
            <React.Fragment>
              <div className={classes['song-album']}>ALBUM</div>
              {release ? <div className={classes['song-release']}>RELEASE DATE</div> : '' }
            </React.Fragment>
            : ''
          }
          <div className={classes['song-time']}>
            <FontAwesomeIcon icon={faClock} />
          </div>
        </div>
        {realMap?.map((track, index) => {
          const realTrack = track.track ? track.track : track

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
                  {picture ?
                    <img
                      src={realTrack.album.images[2].url}
                      alt="album_image"
                    />
                    : ''
                  }
                </div>
                <div className={classes.trackInfo}>
                  <NavLink
                    className={classes['track-nav']}
                    to="/single"
                    state={{ singleTrack: realTrack, album: target }}
                  >
                    {realTrack.name}
                  </NavLink>
                  {artists ? 
                    <div style={{display: 'flex', gap: '.3rem'}}>
                      <ArtistsMap artists={realTrack.artists} />
                    </div>
                    : ''
                  }
                </div>
              </div>
              {
                album ?
                <React.Fragment>
                  <div className={classes['album-info']}>
                    <NavLink
                      to='/album'
                      className={classes['album-name']}
                      state={{album: realTrack.album}}
                    >
                      {realTrack.album.name}
                    </NavLink>
                  </div>
                  {release ? 
                    <div className={classes['album-date']}>
                      {realTrack.album.release_date}
                    </div>
                    : ''
                  }
                </React.Fragment>
                : ''
              }
              <div className={classes['track-duration']}>
                {msToTime(realTrack.duration_ms)[1]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default TracksMap
