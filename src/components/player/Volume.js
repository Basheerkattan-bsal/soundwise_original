import axios from 'axios';
import React, { useContext } from 'react';
import MainContext from '../../context/MainContext.js';
import classes from './Player.module.css';
export default function Volume() {
  const [{ hashToken }, DISPATCH] = useContext(MainContext);
  const setVolume = async e => {
    await axios.put(
      'https://api.spotify.com/v1/me/player/volume',
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + hashToken,
        },
      }
    );
  };
  return (
    <div className={classes['volume-button']}>
      <input type="range" onMouseUp={e => setVolume(e)} min={0} max={100} />
    </div>
  );
}
