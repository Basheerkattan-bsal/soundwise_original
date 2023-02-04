import React, { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import classes from "./Single.module.css";
import parse from "html-react-parser";

export default function Lyrics({ songName }) {
  const [lyrics, setLyrics] = useState("");
  const navigate = useNavigate();
  //get the song lyrics
  const getLyrics = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_GENIUS_KEY,
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };

    const fetchSong = await fetch(
      `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${songName}&per_page=1&page=1`,
      options
    );
    const songData = await fetchSong.json();
    let songId = "";
    if (songData.hits.length > 0) {
      songId = songData.hits[0].result.id;
    } else {
      toast.error(songData.error);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }

    songId &&
      (await fetch(
        `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${songId}`,
        options
      )
        .then(res => res.json())
        .then(res => setLyrics(res.lyrics.lyrics.body.html))
        .catch(err => toast.error(err)));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getLyrics();
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div className={classes["song-main"]}>
      <div className={classes["single_lyrics"]}>
        <h3 translate="no">{songName}</h3>
        <div id="google_translate_element"></div>
        {parse(lyrics)}
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
