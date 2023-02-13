import React, { useContext, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useToken } from '../../spotify.js';
import DisplayContext from '../../context/DisplayContext.js';
import PlayerContext from '../../context/PlayerContext.js';
import classes from './CategoryList.module.css';
import style from '../MusicBox.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
//import Bouncer from "../../functions/bouncer.js";

export default function CategoryList() {
  const searchParams = useToken();
  const navigate = useNavigate();
  const [player, playerDispatch] = useContext(PlayerContext);
  const [display, dispatch] = useContext(DisplayContext);
  const { playLists, catId, catName } = display;

  const { context, playerState } = player;

  const getCatPlaylist = async () => {
    await fetch(
      `https://api.spotify.com/v1/browse/categories/${catId}/playlists?limit=50`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          navigate('/');
        } else {
          dispatch({
            type: 'SET_PLAYLISTS',
            playLists: res,
          });
        }
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getCatPlaylist();
  }, []);

  return (
    <div className={style.main}>
      <div>
        {playLists && (
          <div>
            <h2 className={classes.header}> {catName} </h2>
            <div className={style.albumContainer}>
              {playLists?.playlists?.items?.map((playlist, index) => {
                return (
                  playlist && (
                    <NavLink
                      to="/activePlaylist"
                      state={{ playlist: playlist }}
                      key={index}
                      className={style.albumBox}
                    >
                      <div className={style.albumImage}>
                        <img
                          src={playlist.images[0].url}
                          alt="/ playlist_image"
                        />
                        <div className={classes['play-button']}>
                          {playerState ? (
                            <FontAwesomeIcon
                              className={classes['player-icon']}
                              icon={faPause}
                            />
                          ) : (
                            <FontAwesomeIcon
                              className={classes['player-icon']}
                              icon={faPlay}
                            />
                          )}
                        </div>
                      </div>
                      <div className={style.albumName}>
                        {playlist.description}
                      </div>
                      <div className={style.artistName}>{playlist.name}</div>
                    </NavLink>
                  )
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
