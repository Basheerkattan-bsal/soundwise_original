
import React, { useState, useEffect, useContext } from "react";
import "font-awesome/css/font-awesome.min.css";
import classes from "./Search.module.css";
import MainContext from "../../context/MainContext";
import DisplayContext from "../../context/DisplayContext";
import style from "../MusicBox.module.css";
import { useToken } from "../../spotify.js";
import SearchNav from './SearchNav.js'
import CategoryList from "../category-list/CategoryList";


export default function Search() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const [display, dispatch] = useContext(DisplayContext);
  const { albums, token, catPlaylist } = STATE;
  const {catId, catName} = display
  const [searchInput, setSearchInput] = useState("");
  const [browseAll, setBrowseAll] = useState({});
  const [activeCat, setActiveCat] = useState('all')

  //get the return params from useToken function
  const searchParams = useToken();

  /*  console.log(albums); 
  console.log(browseAll);
  */


  /* ===> Trying the categories api */
  function categoriesPlaylist() {
    fetch(`https://api.spotify.com/v1/browse/categories?limit=49`, searchParams)
      .then(res => res.json())
      .then(res => setBrowseAll(res));
  }

  useEffect(() => {
    categoriesPlaylist();
  }, []);



  const toHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

 const randomColor = () => {
    const r = Math.floor(Math.random() * (200 - 50) + 50)
    const g = Math.floor(Math.random() * (200 - 50) + 50)
    const b = Math.floor(Math.random() * (200 - 50) + 50)
     // const backgroundColor = Math.floor(Math.random() * 16777215).toString(16)
     return `#${toHex(r)}${toHex(g)}${toHex(b)}`

  }

  //using useEffect to refresh new input value
  useEffect(() => {

    if (searchInput !== '') getSearch();

  }, [searchInput]);

  async function getSearch() {
    const artistID = await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        return res.artists?.items[0].id; // add "?" to avoid the error of no artist
      });

    await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums/?include_groups=album&market=US&limit=50`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        DISPATCH({
          type: "SET_ALBUMS",
          albums: res.items,
        });
      });
  }


  return (
    <div>
      {catPlaylist ? (
        <CategoryList />
      ) : (
        <div className={classes.main}>
          <div className={classes.searchBar}>
            <input
              placeholder="&#xF002; What do you want to listen to"
              type="input"
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>
          {searchInput && <SearchNav activeCat={activeCat} setActiveCat={setActiveCat} />}
          <div>
            {searchInput ? (
              <div>
                <h3>Albums</h3>
              <div className={style.albumContainer}>
                {albums.map((album, index) => {
                  return (
                    <div key={index} className={style.albumBox}>
                      <div className={style.albumImage}>
                        <img src={album.images[0].url} alt="/playlist images" />
                      </div>
                      <div className={style.albumName}>{album.name}</div>
                      <div className={style.artistName}>
                        {album.artists[0].name}
                      </div>
                    </div>
                  );
                })}
              </div>
              </div>
            ) : (
              //if no searchInput then show all categories
              <div className={style.albumContainer}>
                {browseAll.categories?.items.map((cat, idx) => {
                  return (
                    <div
                      style={{ backgroundColor: randomColor() }}
                      className={classes.categoryBox}
                      key={idx}
                      //change category status to "true" to get to category playlist page and set cat_id and cat_name to send to playlist page
                      onClick={() => {
                        dispatch({
                          type: 'SET_CAT_NAME',
                          catName: cat.name
                        })
                        dispatch({
                          type: 'SET_CAT_ID',
                          catId: cat.id
                        })
                       /*  setCatId(cat.id);
                        setCatName(cat.name); */
                        DISPATCH({
                          type: "SET_CAT_PLAYLIST",
                          catPlaylist: true,
                        });
                      }}
                    >
                      <div>
                        <h3>{cat.name}</h3>
                        <a href={cat.href[0]}>
                          <img
                            src={cat.icons[0].url}
                            alt="/categories images"
                            width="150px"
                          />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* Extra code maybe to be executed
  //make searchParams to global variable
  const searchParams = {
    method: "GET",
    accept: "application/json",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }; 

    // ===> Get artist 
 await fetch(`https://api.spotify.com/v1/artists/${artistID}`, searchParams)

      .then(res => res.json()
      .then(res => console.log(res))) 


  //use useEffect to load the categories
  useEffect(() => {
    fetch(
      `https://api.spotify.com/v1/recommendations?limit=20&market=US&seed_genres=alt-rock`,
      searchParams

    )
      .then(res => res.json())
      .then(res => console.log(res));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.spotify.com/v1/recommendations/available-genre-seeds`,

      useToken
    )
      .then(res => res.json())
      .then(res => console.log(res));


  }, []); 

 useEffect(() => {
    fetch(`https://api.spotify.com/v1/albums/43q6qDcaoGAZBRAO8TVsCz`, useToken)
      .then(res => res.json())
      .then(res => console.log(res));
  }); 

     const getCatPlaylist = async id => {
    await fetch(
      `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
      useToken
    )
      .then(res => res.json())
      .then(res => console.log(res));
  }; 

*/

