const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?`;
const PROFILE_ENDPOINT = `https://api.spotify.com/v1/me`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: `${refresh_token}`,
    }),
  });

  return response.json();
};

// TODO: Refactor getNowPlaying and getCurrentTrack to merge both into one function

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getCurrentTrack = async () => {
  const nowPlaying = await getNowPlaying();
  const track = await nowPlaying.json();

  const isrc = track.item.external_ids.isrc;
  const album = track.item.album.name;
  const artist = track.item.artists
    .map((_artist: any) => _artist.name)
    .join(", ");
  const artwork_url = track.item.album.images[0].url;
  const isPlaying = track.is_playing;
  const preview_url = track.item.preview_url;
  const query =
    track.item.name +
    " - " +
    track.item.artists.map((_artist: any) => _artist.name).join(", ") +
    " (Official Video)";
  const spotify_url = track.item.uri;
  const title = track.item.name;

  return {
    album,
    artist,
    artwork_url,
    isPlaying,
    isrc,
    preview_url,
    query,
    spotify_url,
    title,
  };
};

// TODO: Refactor getRecentlyPlayed and getTracks to merge both into one function

export const getRecentlyPlayed = async (maxResults: number) => {
  const { access_token } = await getAccessToken();

  return fetch(
    RECENTLY_PLAYED_ENDPOINT + new URLSearchParams({ limit: `${maxResults}` }),
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export const getTracks = async (number: number) => {
  const recentlyPlayed = await getRecentlyPlayed(number);
  const { items } = await recentlyPlayed.json();

  const tracks = items.map((track: any) => ({
    artist: track.track.artists.map((data: any) => data.name).join(", "),
    artwork_url: track.track.album.images[1].url,
    isrc: track.track.external_ids.isrc,
    played_at: track.played_at,
    preview_url: track.track.preview_url,
    query:
      track.track.name +
      " - " +
      track.track.artists.map((data: any) => data.name).join(", ") +
      " (Official Video)",
    spotify_url: track.track.uri,
    title: track.track.name,
  }));

  return tracks;
};

// TODO: Refactor fetchProfile and getProfileData to merge both into one function

export const fetchProfile = async () => {
  const { access_token } = await getAccessToken();

  return fetch(PROFILE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getProfileData = async () => {
  const data = await fetchProfile();
  const profile = await data.json();

  const name = profile.display_name
  const url = profile.external_urls.spotify
  const image = profile.images[0].url

  return {
    name,
    url,
    image
  }

}