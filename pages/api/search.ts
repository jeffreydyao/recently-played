import type { NextApiRequest, NextApiResponse } from "next";
import { getNowPlaying, getTracks, getCurrentTrack } from "../../lib/spotify";
import musicKitToken from "../../lib/musicKitToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await musicKitToken();
  const nowPlaying = await getNowPlaying();
  const SEARCH_CATALOG_ENDPOINT = `https://api.music.apple.com/v1/catalog/AU/songs?`;
  

  let tracks;
  let nowPlayingTrack;

  // Import logic from /tracks API route to return tracks
  if (nowPlaying.status === 204 || nowPlaying.status > 400) {
    tracks = await getTracks(10);
  // @ts-expect-error
  } else if (nowPlayingTrack = await nowPlaying.json() && nowPlayingTrack.item === null) {
    tracks = await getTracks(10);
  } else {
    const currentTrack = await getCurrentTrack();
    tracks = await getTracks(9);
    tracks.unshift(currentTrack);
  }


  // Filter data to return ISRCS and query strings only
  const queryData = tracks.map((track: any) => ({
    isrc: track.isrc,
    query: track.query,
  }));

  const appleMusicTracks = await Promise.all(
    queryData.map((track: any) =>
      fetch(
        SEARCH_CATALOG_ENDPOINT + new URLSearchParams({ 'filter[isrc]': `${track.isrc}` }),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
        .then((response) => response.json())
        .then((data) => {
          return JSON.stringify(data.data[0].attributes.url);
        })
        .catch((error) => ({error}))
    )
  )

  console.log(appleMusicTracks)
  
  return res.status(200).json({ appleMusicTracks });

}

