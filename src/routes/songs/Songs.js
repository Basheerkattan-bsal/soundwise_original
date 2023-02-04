import React from "react";
import Lyrics from "../single/Lyrics";
export default function Songs({ songName }) {
  return (
    <div>
      <Lyrics songName={songName} />
    </div>
  );
}
