import React, { useState } from "react";
import logo from "../../media/headphones-gradient.png";
import { NavLink, Outlet } from "react-router-dom";
import { Resizable } from "re-resizable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faBookOpen,
  faPlus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
/* import logo1 from '../media/soundwise2.png' */
import classes from "../../components/nav/Nav.module.css";

export default function Nav() {
  const [state, setState] = useState({ width: "15vw", height: "200" });
  return (
    <Resizable
      style={{ border: "1px solid black" }}
      minHeight="100vh"
      /* set minWidth to be wider */
      minWidth="15vw"
      maxWidth="25vw"
      size={{ width: state.width, height: state.height }}
      onResizeStop={(e, direction, ref, d) => {
        setState({
          width: state.width + d.width,
          height: state.height + d.height,
        });
      }}
    >
      <div className={classes.main}>
        <div className={classes.logo}>
          <img src={logo} alt="logo" /> {/* move the width to css file  */}
          <h2>Soundwise</h2>
        </div>

        <nav className={classes.navLinks}>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.link}`
              }
              to="/"
            >
              <FontAwesomeIcon className={classes.awesome} icon={faHouse} />
              Home
            </NavLink>
          </div>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.link}`
              }
              to="search"
            >
              <FontAwesomeIcon
                className={classes.awesome}
                icon={faMagnifyingGlass}
              />
              Search
            </NavLink>
          </div>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.link}`
              }
              to="library"
            >
              <FontAwesomeIcon className={classes.awesome} icon={faBookOpen} />
              Library
            </NavLink>
          </div>

          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.link}`
              }
              to="playlist"
            >
              <FontAwesomeIcon className={classes.awesome} icon={faPlus} />
              Create Playlist
            </NavLink>
          </div>
          <div>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.active}` : `${classes.link}`
              }
              to="songs"
            >
              <FontAwesomeIcon className={classes.awesome} icon={faHeart} />
              Liked Songs
            </NavLink>
          </div>
        </nav>
      </div>
      <Outlet />
    </Resizable>
  );
}
