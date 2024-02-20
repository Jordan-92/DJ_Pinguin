import Field from "../components/Field";
import React from "react";
import RenderCellGrid from "../components/List";

export default function () {
  return (
    <div>
      <p>
        <h1>DJ Pinguin</h1>
      </p>
      <p>
        <h1>Music Downloader</h1>
        <p><Field label="Music name" value={""} /></p>
        <p><Field label="Artist" value={""} /></p>
        <p>
        <span style={{ marginLeft: '50px' }}><button>Stream</button></span>
        <span style={{ marginLeft: '50px' }}><button>Download</button></span>
        </p>
      </p>
      <p>
        <h1>Music Player</h1>
        <p><Field label="Music search" value={""} /></p>
        <p><RenderCellGrid/></p>
      </p>
    </div>
  );
}