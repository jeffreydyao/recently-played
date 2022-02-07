import type { NextApiRequest, NextApiResponse } from "next";
import { getNowPlaying, getTracks, getCurrentTrack } from "../../lib/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Fetch currently playing song
  const nowPlaying = await getNowPlaying();

  // const nowPlayingTrack = await nowPlaying.json();

  // Is a song currently playing?
  // If an error code is returned, or the response body is null ...

  // https://restfulapi.net/http-status-codes/
  // TODO: Error handling for 4xx status codes: explain error in console or UI
  // TODO: How to log errors for serverless functions on Vercel?
  if (nowPlaying.status === 204 || nowPlaying.status > 400) {
    console.log(
      `No song is currently playing | HTTP status code ${nowPlaying.status}`
    );

    const tracks = await getTracks(10);
    return res.status(200).json({ tracks });
  }

  const nowPlayingTrack = await nowPlaying.json();

  if (nowPlayingTrack.item === null) {
    console.log(`No song is currently playing | Empty response body`);

    const tracks = await getTracks(10);
    return res.status(200).json({ tracks });
  }

  // Otherwise, a song is currently playing.

  const currentTrack = await getCurrentTrack();
  const tracks = await getTracks(9);
  tracks.unshift(currentTrack); // Push currentTrack to top of tracks

  // TODO: If I set cache-control, will this refresh the entire browser?
  /*   res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  ); */

  return res.status(200).json({ tracks });
}
