import React from 'react';
import PlaylistResults from './PlaylistResults';
import general from './GeneralStyle.module.css';
import classes from './AllResults.module.css';
import ArtistsResults from './ArtistsResults';
import { NavLink } from 'react-router-dom';
import TracksMap from '../../../components/tracksMap/TracksMap';
export default function AllResults({ categories }) {
  console.log(categories);

  return (
    <div className={general.main}>
      <div className={classes["artist-container"]}>
        <div className={classes["artist-info"]}>
          <h2>Top Results</h2>
          <NavLink
            className={classes["top-artist"]}
            to="/artist"
            state={{ artist: categories?.artists?.items[0] }}
          >
            <div>
              <img
                src={categories.artists?.items[0]?.images?.at(-1)?.url}
                alt="artist_image"
              />

              <h3>{categories.artists?.items[0]?.name}</h3>
              <span>{categories.artists?.items[0]?.type}</span>
            </div>
          </NavLink>
        </div>

        <div className={classes["artist-songs"]}>
          <h2>Songs</h2>
            {categories.tracks ? <TracksMap target={categories?.tracks?.items?.slice(0, 4)} picture={true} artists={true} album={true} info={false} /> : '' }
        </div>
      </div>
      <div>
        <div>
          <div>
            <h2>Artists</h2>
            <ArtistsResults artists={categories?.artists?.items} />
          </div>
          <div>
            <h2>Albums</h2>
            <PlaylistResults playlists={categories?.albums} />
          </div>
          <div>
            <h2>Playlists</h2>
            <PlaylistResults playlists={categories?.playlists} />
          </div>
          <div>
            <h2>Audiobooks</h2>
            <PlaylistResults playlists={categories?.audiobooks} />
          </div>
          <div>
            <h2>Episodes</h2>
            <PlaylistResults playlists={categories?.episodes} />
          </div>
        </div>
      </div>
    </div>
  );
}
