import React, { useEffect, useState } from 'react'

import ArtistsMap from '../artistsMap/ArtistsMap.js'

import getDuration from '../../../functions/duration.js'
import fetchColor from '../../../functions/getColor.js'

import classes from '../../category-list/CategoryTracks.module.css'

const Header = ({target, artistInfo}) => {

  const [colors, setColors] = useState(null);
  const [duration, setDuration] = useState('');

  useEffect(async() => {
    const color = await fetchColor(target?.images[0].url)
    const duration2 = getDuration(target)
    setColors(color)
    setDuration(duration2)
  }, [target])

  return (
    <React.Fragment>
      {target && artistInfo && colors && duration &&
        <div
          className={classes.header}
          style={{
            backgroundImage: `linear-gradient(to bottom left, ${colors ? colors[3] : 'black'},  ${colors ? colors[4] : 'black'})`,
          }}
        >
          <img
            className={classes["album_cover"]}
            src={target?.images[1]?.url}
            alt="track_image"
          />
          <div>
            <h2>{target?.name}</h2>
            <div className={classes.headerInfo}>
              <div>
                <img
                  src={artistInfo?.images[2].url}
                  alt="artist_image"
                  className={classes["artist_image"]}
                />
                <ArtistsMap artists={target.artists} header={true} />
                <span></span>
                <p style={{ fontWeight: "bold" }}>
                  {target?.release_date?.substring(0, 4)}{" "}
                </p>
                <span></span>
                <p style={{ fontWeight: "bold" }}>
                  {target?.total_tracks}
                  {target?.total_tracks > 1 ? " songs" : " song"}
                </p>
                <span></span>
                <p style={{ fontWeight: "bold" }}>{target.album_type && target.abum_type === 'single' ? duration[1] : duration[0]}</p>
              </div>
            </div>
          </div>
        </div>

      }
    </React.Fragment>
  )
}

export default Header
