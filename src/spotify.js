import { useContext } from "react";
import MainContext from "./context/MainContext.js";
import SpotifyWebApi from "spotify-web-api-js";


// ===> user authentication
const authEndpoint = "https://accounts.spotify.com/authorize";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

/* const  CLIENT_SECRET= process.env.ClientSecret*/
const redirectUrl = "http://localhost:3000";

export const GetTokenFromResponse = () => {
  return window.location.hash

    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

//===> login api
export const loginUrl = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=token`;

//fetchParams
export function useToken() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { token } = STATE;

  return {
    method: "GET",
    accept: "application/json",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}

export const spotify = new SpotifyWebApi();

//===> Use Token

export const UseToken = () => {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { token } = STATE;

  return {
    method: 'GET',
    accept: 'application/json',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};
