import React from 'react';
import Login from '../../components/login/Login.js';
export default function LibraryLogin() {
  return (
    <div>
      <div>
        <h3>Enjoy your Library</h3>
        <p>
          Log in to see saved songs, products, artists and playlists in Your
          Library
        </p>
      </div>
      <div>
        <button>Not now</button>
        <Login/>
      </div>
    </div>
  );
}
