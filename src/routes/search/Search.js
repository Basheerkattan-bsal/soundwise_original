import React, { useState, useEffect, useContext } from "react";
import classes from "./Search.module.css";
import MainContext from "../../context/MainContext";
import style from "../MusicBox.module.css";

export default function Search() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { albums, token } = STATE;
  const [searchInput, setSearchInput] = useState("");
  console.log(albums);
  // ===> Need the id to get the artist
  async function getSearch() {
    const artistParams = {
      method: "GET",
      accept: "application/json",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const artist = await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
      artistParams
    )
      .then(res => res.json())
      .then(res => {
        /*         console.log(res.artists.items[0].id);
         */ return res.artists?.items[0].id; // add "?" to avoid the error of no artist
      });

    const resAlbums = await fetch(
      `https://api.spotify.com/v1/artists/${artist}/albums?include_groups=album&market=DE&limit=50`,
      artistParams
    )
      .then(res => res.json())
      .then(res =>
        DISPATCH({
          type: "SET_ALBUMS",
          albums: res.items,
        })
      );
  }

  //using useEffect to refresh new input value
  useEffect(() => {
    if (searchInput !== "") getSearch();
  }, [searchInput]);

  return (
    <div className={classes.main}>
      <div className={classes.searchBar}>
        <input
          placeholder="Search for Artist"
          type="input"
          onChange={e => setSearchInput(e.target.value)}
        />
        <button onClick={getSearch}>Search</button>
      </div>
      <div>{/* ===> This will be the same album box style  */}</div>
    </div>
  );
}
