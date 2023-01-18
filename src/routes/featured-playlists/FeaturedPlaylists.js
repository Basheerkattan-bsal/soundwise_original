import React, { useEffect, useContext } from 'react';
import classes from '../MusicBox.module.css';
import MainContext from '../../context/MainContext';

export default function FeaturedPlaylists() {
 

  const [STATE, DISPATCH] = useContext(MainContext);
  const { featuredPlaylists, token } = STATE;
  

  useEffect(() => {
    async function getFeaturedPlaylists() {
      await fetch(
        'https://api.spotify.com/v1/browse/featured-playlists?&limit=20',
        {
          method: 'GET',
          accept: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then(res => res.json())
        .then(res => {
          DISPATCH({
            type: 'SET_FEATURED_PLAYLISTS',
            featuredPlaylists: res,
          });
        });
    }
    getFeaturedPlaylists();
  }, []);

  return (
    <div className={classes.main}>
      {featuredPlaylists && (
        <div>
          <h3> {featuredPlaylists.message} </h3>
          <div className={classes.albumContainer}>
            {featuredPlaylists.playlists.items.map((playlist, index) => {
              return (
                <div key={index} className={classes.albumBox}>
                  <div className={classes.albumImage}>
                    <img src={playlist.images[0].url} alt="playlist image" />
                  </div>
                  <div className={classes.albumName}>
                    {playlist.description}
                  </div>
                  <div className={classes.artistName}>{playlist.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
