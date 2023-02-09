import React, { useContext } from "react";
import Lyrics from "../single/Lyrics";
import { Toaster } from "react-hot-toast";

export default function Songs({ songName }) {
  return <div>{<Lyrics songName={songName} />}</div>;
}
