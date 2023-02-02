import React, { useEffect, useRef, useState, useContext } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Bouncer from '../../functions/bouncer.js';
import MainContext from '../../context/MainContext.js';

import PopularAlbums from '../artist/PopularAlbums.js';
import RelatedArtists from '../artist/RelatedArtists.js';
import { useToken } from '../../spotify.js';

import msToTime from '../../functions/timer.js';
import fetchColor from '../../functions/getColor.js'
import getDuration from '../../functions/duration.js'
import getReleaseDate from '../../functions/releaseDate.js'
import getDetails from '../../functions/getDetails.js'

import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '../category-list/CategoryTracks.module.css';

export default function ActiveAlbum() {
  const { state } = useLocation()
  const { album } = state
  const [albumInfo, setAlbumInfo] = useState(false)
  const [artistInfo, setArtistInfo] = useState(null);


  const [colors, setColors] = useState(null);
  const [duration, setDuration] = useState('');
  const [isActive, setIsActive] = useState(-1);
  const [releaseTime, setReleaseTime] = useState("");

  const artistName = album?.artists[0].name;
  const artistId = album?.artists[0].id;
  const trackId = album?.id;
  const trackName = album?.name;
  //search params for fetching data
  const navigate = useNavigate()

  const searchParams = useToken();

  useEffect(async() => {
    if (album) {
      const newAlbum = await getDetails(album.type, album.id, searchParams)
      const newArtist = await getDetails(album.artists[0].type, album.artists[0].id, searchParams)
      console.log(newAlbum, newArtist)
      setAlbumInfo(newAlbum)
      setArtistInfo(newArtist)
    }
  }, [album])

  // handle selected track to be active and lost focus by click outside of playlist
  const ref = useRef(null);
  useEffect(() => {
    const handleOutsideClick = e => {
      if (!ref?.current?.contains(e.target)) {
        setIsActive(-1);
      }
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick, false);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, [isActive]);

  return (
    <div id='album-main' className={classes.main}>
      {/* {album && colors && ( */}
      {/*   <div> */}
      {/*     <Bouncer dependencies={[album]} /> */}
      {/*     <div className={classes.headerNav}>The top nav</div> */}
      {/**/}
      {/*     <div */}
      {/*       className={classes.header} */}
      {/*       style={{ */}
      {/*         backgroundImage: `linear-gradient(to bottom left, ${colors[3]},  ${colors[4]})`, */}
      {/*       }} */}
      {/*     > */}
      {/*       <img */}
      {/*         className={classes["album_cover"]} */}
      {/*         src={album?.images[1]?.url} */}
      {/*         alt="track_image" */}
      {/*       /> */}
      {/*       <div> */}
      {/*         <h2>{album?.name}</h2> */}
      {/*         <div className={classes.headerInfo}> */}
      {/*           <div> */}
      {/*             <img */}
      {/*               src={artistInfo?.images[2].url} */}
      {/*               alt="artist_image" */}
      {/*               className={classes["artist_image"]} */}
      {/*             /> */}
      {/*             { */}
      {/*               album.artists.map((artist, index) => { */}
      {/*                 return ( */}
      {/*                   <React.Fragment key={index}> */}
      {/*                     {index ? '- ' : ''} */}
      {/*                     <NavLink */}
      {/*                       className={classes.profileLink} */}
      {/*                       to="/artist" */}
      {/*                       key={index} */}
      {/*                       state={{ artist }} */}
      {/*                     > */}
      {/*                       {artist.name} */}
      {/*                     </NavLink> */}
      {/*                   </React.Fragment> */}
      {/*                 ); */}
      {/*               }) */}
      {/*             } */}
      {/*             <span></span> */}
      {/*             <p style={{ fontWeight: "bold" }}> */}
      {/*               {album?.release_date.substring(0, 4)}{" "} */}
      {/*             </p> */}
      {/*             <span></span> */}
      {/*             <p style={{ fontWeight: "bold" }}> */}
      {/*               {album?.total_tracks} */}
      {/*               {album.total_tracks > 1 ? " songs" : " song"} */}
      {/*             </p> */}
      {/*             <span></span> */}
      {/*             <p style={{ fontWeight: "bold" }}>{duration}</p> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       </div> */}
      {/*     </div> */}
      {/**/}
      {/*     <div> */}
      {/*       <div className={classes.mainContainer}> */}
      {/*         <div className={classes['song-info']}> */}
      {/*           <div className={classes['song-title']}> */}
      {/*             <div>#</div> */}
      {/*             <div>TITLE</div> */}
      {/*           </div> */}
      {/**/}
      {/*           <div className={classes['song-time']}> */}
      {/*             <FontAwesomeIcon icon={faClock} /> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*         {albumTracks?.items?.map((track, index) => { */}
      {/*           return ( */}
      {/*             <div */}
      {/*               key={index} */}
      {/*               onClick={e => { */}
      {/*                 e.stopPropagation(); */}
      {/*                 setIsActive(index); */}
      {/*               }} */}
      {/*               className={`${isActive === index ? classes.active : ''} ${classes['playlist-container'] */}
      {/*                 } `} */}
      {/*             > */}
      {/*               <div className={classes.playlistInfo} key={index}> */}
      {/*                 <div className={classes.trackImg}> */}
      {/*                   <div>{index + 1}</div> */}
      {/*                 </div> */}
      {/*                 <div className={classes.trackInfo}> */}
      {/*                   <NavLink */}
      {/*                     className={classes['track-nav']} */}
      {/*                     to="/single" */}
      {/*                     state={{ singleTrack: track, album: album }} */}
      {/*                   > */}
      {/*                     {track.name} */}
      {/*                   </NavLink> */}
      {/*                   <div> */}
      {/*                     {' '} */}
      {/*                     {track.artists.map((artist, index) => { */}
      {/*                       return ( */}
      {/*                         <NavLink */}
      {/*                           className={classes['track-navName']} */}
      {/*                           to="/artist" */}
      {/*                           key={index} */}
      {/*                           state={{ artist }} */}
      {/*                         > */}
      {/*                           {(index ? ', ' : '') + artist.name} */}
      {/*                         </NavLink> */}
      {/*                       ); */}
      {/*                     })}{' '} */}
      {/*                   </div> */}
      {/*                 </div> */}
      {/*               </div> */}
      {/*               <div className={classes['album-date']}> */}
      {/*               </div>{' '} */}
      {/*               <div className={classes['track-duration']}> */}
      {/*                 {msToTime(track.duration_ms)[1]} */}
      {/*               </div> */}
      {/*             </div> */}
      {/*           ); */}
      {/*         })} */}
      {/*       </div> */}
      {/*     </div> */}
      {/*     <div> */}
      {/*       <h2>{artistName} Albums</h2> */}
      {/*       <PopularAlbums artistId={artistId} /> */}
      {/*     </div> */}
      {/**/}
      {/*     <div> */}
      {/*       <h2>{artistName} Related Artists</h2> */}
      {/*       <RelatedArtists artistId={artistId} /> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* )} */}
      {/* <Outlet /> */}
    </div>
  );
}
