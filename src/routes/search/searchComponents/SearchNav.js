import React from 'react'
import classes from './SearchNav.module.css'


const SearchNav = ({activeType, setActiveType}) => {
  const all = "album,artist,playlist,track,show,episode,audiobook"
  const playlist = 'playlist'
  const albums = 'album'
  const track = 'track'
  const artists = 'artist'
  const podcasts = 'episode,show'

  const setCategory = (e) => {
    console.log(activeType)
    console.log(e.target.value)
    setActiveType(e.target.value)
  }

  return (
    <div className={classes.searchNav}>
      <button className={activeType == all ? classes.active : ''} value={all} onClick={setCategory}>All</button>
      <button className={activeType == playlist ? classes.active : ''} value={playlist} onClick={setCategory}>Playlists</button>
      <button className={activeType == albums ? classes.active : ''} value={albums} onClick={setCategory}>Albums</button>
      <button className={activeType == track ? classes.active : ''} value={track} onClick={setCategory}>Songs</button>
      <button className={activeType == artists ? classes.active : ''} value={artists} onClick={setCategory}>Artists</button>
      <button className={activeType == podcasts ? classes.active : ''} value={podcasts} onClick={setCategory}>Podcasts & Shows</button>
    </div>
  )
}


export default SearchNav
