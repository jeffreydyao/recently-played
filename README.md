# Recently Played 🎵

See what you've been listening to recently on Spotify and share it with your friends! 
- If you're listening to a track now, a waveform icon appears beside it. 🌟
- Listen to a 30 second preview of each track. 🎧
- Find the full version of each song on Spotify and Apple Music. (YouTube coming later!) 😎

Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com), [Radix Primitives](https://www.radix-ui.com/), [Framer Motion](https://www.framer.com/motion/) and the [Spotify](https://developer.spotify.com/documentation/web-api/) + [MusicKit](https://developer.apple.com/musickit/) APIs. 

## Getting Started
You can either clone the repo locally or deploy on Vercel. **In both cases, you must store the Spotify / MusicKit API keys as environmental variables for the app to function properly.**

> ⚠️ **An enrolled Apple Developer account is required for Apple Music song search to function.**  
> Without one, you'll still be able to get each song's Spotify URL, but the Apple Music option will appear greyed out. 

### Option 1: Deploy on Vercel (recommended)
Click the button below. For env variable values, refer to the [setup section](#a-name%22setup%22aenvironmental-variables-setup) below. After setup you'll get a link to your app.

// TODO: Modify button to make Apple Developer env variables optional
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjeffreydyao%2Frecently-played&env=SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,APPLE_DEVELOPER_TEAM_ID,APPLE_DEVELOPER_KEY_ID&envDescription=API%20keys%20required%20for%20the%20application%20to%20function.%20See%20the%20link%20for%20instructions.&envLink=https%3A%2F%2Fgithub.com%2Fjeffreydyao%2Frecently-played%2Fblob%2Fmain%2FREADME.md&project-name=recently-played&repo-name=recently-played&demo-title=Recently%20Played&demo-description=Show%20your%20friends%20what%20you've%20been%20playing%20recently%20on%20Spotify%2C%20and%20let%20them&demo-url=recently-played.vercel.app)

### Option 2: Local setup
Clone the repo and setup a new .env.local file. For values, refer to the [setup section](#setup) below.

    // Spotify - required for app to function
    SPOTIFY_CLIENT_ID=VALUE
    SPOTIFY_CLIENT_SECRET=VALUE
    SPOTIFY_REFRESH_TOKEN=VALUE
    // Apple Music - optional for Apple Music song search
    APPLE_DEVELOPER_TEAM_ID=VALUE
    APPLE_DEVELOPER_KEY_ID=VALUE


### <a name="setup"></a>Environmental variables setup

| Environmental variable | Where to find it | Optional? |
| --- | --- | --- |
| `SPOTIFY_CLIENT_ID` | Create an app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/). Your Client ID is shown. | ❌ |
| `SPOTIFY_CLIENT_SECRET` | After creating your Spotify app, click **Show Client Secret**. | ❌ |
| `SPOTIFY_REFRESH_TOKEN` | Add `http://localhost:3000` as a redirect URI for your Spotify app, then follow the instructions [here](https://benwiz.com/blog/create-spotify-refresh-token/). In Step 4, if you use a Mac wrap the URL in quote marks. | ❌ |
| `APPLE_DEVELOPER_TEAM_ID` | To locate your Team ID, sign in to your [developer account](https://developer.apple.com/account), and click Membership in the sidebar. Your Team ID appears in the Membership Information section under the team name. | ✅ |
| `APPLE_DEVELOPER_KEY_ID` | Follow the Apple Developer instructions [here](https://help.apple.com/developer-account/#/devcdfbb56a3). Enable Media Services for your key. | ✅ |


