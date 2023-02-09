import { useContext } from "react";
import MainContext from "./context/MainContext.js";
import SpotifyWebApi from "spotify-web-api-js";

// ===> user authentication
const authEndpoint = "https://accounts.spotify.com/authorize";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

/* const  CLIENT_SECRET= process.env.ClientSecret*/
const redirectUrl = "http://localhost:3000";

//values for scope to work with player
const scope = [
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-position",
  "user-top-read",
];

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
export const loginUrl = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&scope=${scope.join(
  " "
)}&response_type=token&show_dialog=true`;

//fetchParams
export function useToken() {
  const [STATE, DISPATCH] = useContext(MainContext);
  const { token } = STATE;
  /*   console.log("before login token : ", token);
   */
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
<<<<<<< HEAD






 
=======
>>>>>>> 0921194af345614d302525213392829e3233187c
