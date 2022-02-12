import React from "react";
import ReactPlayer from "react-player";

export default function PlayerOne({url} : {url: any}) {
  return (
    <div>
      penis
      <ReactPlayer url={url} controls={true} />
    </div>
  )
}
