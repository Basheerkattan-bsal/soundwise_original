import { NavLink, Outlet } from 'react-router-dom';

import msToTime from '../../../functions/timer.js';
import style from '../../MusicBox.module.css';

const PlaylistResults = ({ playlists }) => {
  const returnDuration = playlist => {
    return `${playlist.release_date
      .slice(0, 7)
      .split('-')
      .reverse()
      .join(' ')} - ${msToTime(playlist.duration_ms)[0]}`;
  };

  return (
    <div className={style.main} style={{marginTop: 0, marginBottom: 0, paddingBottom: 0}}>
      <div>
        {playlists && (
          <div>
            <div className={style.albumContainer}>
              {playlists.items?.map((playlist, index) => {
                return (
                  <NavLink
                    to={
                      playlist.type === 'playlist'
                        ? '/activePlaylist'
                        : '/album'
                    }
                    state={
                      playlist.type === 'playlist'
                        ? {
                            playlist: playlist,
                          }
                        : {
                            album: playlist,
                          }
                    }
                    key={index}
                    className={style.albumBox}
                  >
                    <div className={style.albumImage}>
                      <img src={playlist.images[0].url} alt="playlist_image" />
                    </div>
                    <div className={style.albumName} title={`${playlist.name}`}>
                      {playlist.name}
                    </div>
                    <div className={style.artistName}>
                      {playlist.owner
                        ? playlist.owner.display_name
                        : playlist.artists
                        ? playlist?.artists?.map(
                            (artist, i) => `${i > 0 ? ', ' : ''}${artist.name}`
                          )
                        : playlist.authors
                        ? playlist?.authors?.map(
                            (author, i) => `${i > 0 ? ', ' : ''}${author.name}`
                          )
                        : returnDuration(playlist)}
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

export default PlaylistResults;
