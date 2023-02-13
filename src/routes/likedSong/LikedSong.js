import React, { useState, useEffect, useContext } from "react";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";
import MainContext from "../../context/MainContext";
import classes from "./LikedSong.module.css";
import logo from "../../media/headphones-gradient.png";
import fetchColor from "../../functions/getColor.js";
export default function MyPlaylist() {
  const [{ user, hashToken }, DISPATCH] = useContext(MainContext);
  const [colors, setColors] = useState(null);

  const getInfo = async () => {
    if (user) {
      await fetchColor(logo).then(res => setColors(res));
    }
  };
  useEffect(() => {
    if (hashToken) {
      getInfo();
    }
  }, [user]);
  return (
    user && (
      <div className={classes.main}>
        {colors && (
          <div>
            <div translate="no" className={classes.headerNav}>
              The CREATE PLAYLIST page
            </div>
            <div
              className={classes.header}
              style={{
                backgroundImage: `linear-gradient(to bottom left, ${
                  colors ? colors[3] : "black"
                },  ${colors ? colors[4] : "black"})`,
              }}
            >
              <div>
                <img
                  className={classes["album_cover"]}
                  src={logo}
                  alt="logo_image"
                />
              </div>
              <div className={classes["banner_text"]}>
                <h4>PLAYLIST</h4>
                <h1>Liked Songs</h1>
                <h5>{user.display_name} </h5>
              </div>
            </div>

            <div className={classes["song-container"]}>
              <div className={classes["text-body"]}>
                <FontAwesomeIcon
                  className={classes.awesome}
                  icon={faNotesMedical}
                />
                <h2>Songs you like will appear here</h2>
                <h6>Save songs by tapping the heart icon</h6>
                <div className={classes.searchBar}>
                  <button>Find song</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
