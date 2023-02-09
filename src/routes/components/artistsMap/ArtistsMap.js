import React from "react";
import { NavLink } from 'react-router-dom'
import classes from '../../category-list/CategoryTracks.module.css'

const ArtistsMap = ({artists, header}) => {

  return (
    <React.Fragment>
      {
        artists.map((artist, index) => {
          return (
            <React.Fragment key={index}>
              {index > 0 ? 
                <p className={header ? classes.profileLink : classes['track-navName']}>{header ? '-  ' : ' - '}</p>
                : ''
              }
              <NavLink
                className={header ? classes.profileLink : classes['track-navName']}
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
    </React.Fragment>
  )
}

export default ArtistsMap
