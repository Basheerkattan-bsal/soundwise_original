import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

import classes from "./Search.module.css";
import MainContext from "../../context/MainContext";
import DisplayContext from "../../context/DisplayContext";
import style from "../MusicBox.module.css";
import { useToken } from "../../spotify.js";
import SearchNav from "./searchComponents/SearchNav.js";
import SearchResults from "./searchComponents/SearchResults";
import CategoryList from "../category-list/CategoryList";

export default function Search() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const [display, dispatch] = useContext(DisplayContext);
  const { albums, catPlaylist } = STATE;
  const [searchInput, setSearchInput] = useState("");
  const [browseAll, setBrowseAll] = useState({});
  const [activeType, setActiveType] = useState(
    "album,artist,playlist,track,show,episode,audiobook"
  );
  const [activeCat, setActiveCat] = useState(false);
  const navigate = useNavigate();
  //get the return params from useToken function
  const searchParams = useToken();

  /* ===> Trying the categories api */
  function categoriesPlaylist() {
    fetch(`https://api.spotify.com/v1/browse/categories?limit=49`, searchParams)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          navigate("/");
        } else {
          setBrowseAll(res);
        }
      });
  }

  useEffect(() => {
    categoriesPlaylist();
  }, []);

  const toHex = c => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const randomColor = () => {
    const r = Math.floor(Math.random() * (200 - 50) + 50);
    const g = Math.floor(Math.random() * (200 - 50) + 50);
    const b = Math.floor(Math.random() * (200 - 50) + 50);
    // const backgroundColor = Math.floor(Math.random() * 16777215).toString(16)
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  //using useEffect to refresh new input value
  useEffect(() => {
    if (searchInput !== "") getSearch();
  }, [searchInput, activeType]);

  async function getSearch() {
    await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=${activeType}&limit=${
        activeType.length > 30 ? "7" : "49"
      }`,
      searchParams
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          navigate("/");
        } else {
          setActiveCat(res);
        }
      });
  }

  return (
    <div translate="no">
      {catPlaylist ? (
        <CategoryList />
      ) : (
        <div className={`${classes.main} ${searchInput && classes.mainScroll}`}>
          <div className={classes.searchBar}>
            <input
              placeholder="&#xF002; What do you want to listen to"
              type="input"
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>

          {searchInput && (
            <SearchNav activeType={activeType} setActiveType={setActiveType} />
          )}
          {searchInput && activeCat ? (
            <SearchResults activeCat={activeCat} activeType={activeType} />
          ) : (
            ""
          )}
          <div>
            {!searchInput ? (
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
                          type: "SET_CAT_NAME",
                          catName: cat.name,
                        });
                        dispatch({
                          type: "SET_CAT_ID",
                          catId: cat.id,
                        });
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
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
