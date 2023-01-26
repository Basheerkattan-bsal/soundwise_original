import React from 'react'
import classes from './SearchNav.module.css'


const SearchNav = ({activeCat, setActiveCat}) => {

  const setCategory = (e) => {
    console.log(e.target.value)
    setActiveCat(e.target.value)
  }

  return (
    <div className={classes.searchNav}>
      <button className={activeCat === 'all' ? classes.active : ''} value='all' onClick={setCategory}>All</button>
      <button className={activeCat === 'playlists' ? classes.active : ''} value='playlists' onClick={setCategory}>Playlists</button>
      <button className={activeCat === 'podcasts & shows' ? classes.active : ''} value='podcasts & shows' onClick={setCategory}>Podcasts & Shows</button>
      <button className={activeCat === 'genres & moods' ? classes.active : ''} value='genres & moods' onClick={setCategory}>Genres & Moods</button>
      <button className={activeCat === 'artists' ? classes.active : ''} value='artists' onClick={setCategory}>Artists</button>
      <button className={activeCat === 'songs' ? classes.active : ''} value='songs' onClick={setCategory}>Songs</button>
      <button className={activeCat === 'profiles' ? classes.active : ''} value='profiles' onClick={setCategory}>Profiles</button>
      <button className={activeCat === 'albums' ? classes.active : ''} value='albums' onClick={setCategory}>Albums</button>
    </div>
  )
}


export default SearchNav
