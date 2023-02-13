import React, { useContext } from "react";
import classes from "./NavReminder.module.css";

import { loginUrl } from "../../spotify";
import DisplayContext from "../../context/DisplayContext.js";

export default function NavReminder({ title, message }) {
  const [{ navReminder }, dispatch] = useContext(DisplayContext);
  return (
    <div translate="no" className={classes.main}>
      <div className={classes.reminderBox}>
        <div className={classes.reminderText}>
          <h4>{title}</h4>
          <p>{message}</p>
        </div>
        <div>
          <button
            onClick={() => {
              dispatch({
                type: "SET_NAV_REMINDER",
                navReminder: false,
              });
            }}
          >
            Not now
          </button>
          <a href={loginUrl}>LOGIN TO SPOTIFY</a>
        </div>
      </div>
    </div>
  );
}
