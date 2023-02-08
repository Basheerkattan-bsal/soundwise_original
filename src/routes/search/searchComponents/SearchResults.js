import React from 'react';
import AllResults from './AllResults.js';
import ArtistsResults from './ArtistsResults.js';
import PlaylistResults from './PlaylistResults.js';
import TracksMap from '../../../components/tracksMap/TracksMap.js'
/* import classes from './SearchResults.module.css'; */
import classes from '../../category-list/CategoryTracks.module.css'
const SearchResults = ({ activeCat, activeType }) => {
  const { albums, artists, audiobooks, episodes, playlists, shows, tracks } =
    activeCat;
  const categories = {
    albums,
    artists,
    audiobooks,
    episodes,
    playlists,
    shows,
    tracks,
  };

  return (
    <div className={classes.main}>
      {activeType === "album,artist,playlist,track,show,episode,audiobook" && activeCat ? <AllResults categories={categories}/> : ''}
      {activeType === 'playlist' && playlists ? <PlaylistResults playlists={playlists}/> : ''}
      {activeType === 'album' && albums ? <PlaylistResults playlists={albums} /> : '' }
      {activeType === 'track' && tracks ? <TracksMap target={tracks?.items} picture={true} artists={true} album={true} release={true} info={true}/> : '' }
      {activeType === 'artist' && artists ? <ArtistsResults artists={artists?.items} /> : '' }
       {/* {activeType === 'episode,show' ? <PlaylistResults playlists={episodes?.items} /> : '' } */}
    </div>
  );
};

export default SearchResults;
