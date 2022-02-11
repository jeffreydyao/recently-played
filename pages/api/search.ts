import type { NextApiRequest, NextApiResponse } from "next";
import { getNowPlaying, getTracks, getCurrentTrack } from "../../lib/spotify";
import musicKitToken from "../../lib/musicKitToken";
import { google } from "googleapis";

// TODO: Integrate YouTube search using block comment

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await musicKitToken();
  const nowPlaying = await getNowPlaying();
  const SEARCH_CATALOG_ENDPOINT = `https://api.music.apple.com/v1/catalog/AU/songs?`;
  

  let tracks;
  let nowPlayingTrack;
  let googleAuth;

  // Import logic from /tracks API route to return tracks
  if (nowPlaying.status === 204 || nowPlaying.status > 400) {
    tracks = await getTracks(10);
  } else if (nowPlayingTrack = await nowPlaying.json() && nowPlayingTrack === null) {
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

/*   googleAuth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY
    },
    scopes: ['https://www.googleapis.com/auth/youtube.readonly']
  });

  const youtube = google.youtube({
    auth: googleAuth,
    version: 'v3'
  })

  const youtub = await Promise.all(
    queryData.map((track: any) =>
      youtube.search.list({
        // @ts-expect-error
        // TODO: Work out overload error
        part: 'snippet',
        q: `${track.query}`,
        maxResults: '1',
      })
        .then((data: any) => {
          // TODO: Return only videoId and join with youtube.com/watch?{videoId}
          // TODO: Request additional quota and integrate YouTube search once complete
          return JSON.stringify(data.data)
        })

    )
  ) */
  
  return res.status(200).json({ appleMusicTracks });

}

