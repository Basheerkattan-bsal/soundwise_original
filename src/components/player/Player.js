import React from 'react'
import classes from './Player.module.css'
import PlayerTrackInfo from './PlayerTrackInfo'

const Player = () => {

  return (
    <div className={classes.player}>
     <PlayerTrackInfo />
    </div>
  )
}

export default Player
