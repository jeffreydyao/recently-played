import type { NextApiRequest, NextApiResponse } from "next";
import { getCurrentTrack, getNowPlaying, getTracks } from "../../lib/spotify";

export default async function fetchTracks(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fetch currently playing song
  const nowPlaying = await getNowPlaying();

  if (nowPlaying.status === 204 || nowPlaying.status > 400) {
    /* console.log(
      `No song is currently playing | HTTP status code ${nowPlaying.status}`
    ); */

    const tracks = await getTracks(10);
    return res.status(200).json({ tracks });
  }

  const nowPlayingTrack = await nowPlaying.json();

  if (nowPlayingTrack.item === null) {
    // console.log(`No song is currently playing | Empty response body`);

    const tracks = await getTracks(10);
    return res.status(200).json({ tracks });
  }

  const currentTrack = await getCurrentTrack();
  const tracks = await getTracks(9);
  tracks.unshift(currentTrack); // Push currentTrack to top of tracks

  return res.status(200).json({ tracks });
}
