import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import DisplayContext from '../../../context/DisplayContext.js';
import style from '../../MusicBox.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const ArtistsResults = ({ artists }) => {
  const [state, dispatch] = useContext(DisplayContext);

  return (
    <div className={style.main} style={{marginTop: 0, marginBottom: 0, paddingBottom: 0}}>
      <div>
        {artists && (
          <div>
            <div className={style.albumContainer}>
              {artists?.map((artist, index) => {
                return (
                  <NavLink
                    to="/artist"
                    state={{artist}}
                    key={index}
                    className={style.albumBox}
                  >
                    <div className={`${style.albumImage} ${style.artistImage}`}>
                      <img
                        src={artist?.images[0]?.url}
                        alt="/artist_image"
                      />
                    </div>
                    <div className={style.albumName} title={`${artist.name}`}>
                      {artist.name}
                    </div>
                    <div className={style.artistName}>
                      {artist.followers.total.toLocaleString()}{" "}
                      <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: "pink", marginLeft: "5px" }}
                      />
                    </div>
                  </NavLink>
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
};

export default ArtistsResults;
