# Recently Played 🎵

![Screenshot of app](/public/demo.png)

Showcase what you've been playing recently on Spotify to your friends! 
- If you're listening to a track now, a waveform icon appears beside it. 🌟
- Listen to a 30 second preview of each track. 🎧
- Find the full version of each song on Spotify and Apple Music. (YouTube coming later!) 😎

Built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com), [Radix Primitives](https://www.radix-ui.com/), [Framer Motion](https://www.framer.com/motion/) and the [Spotify](https://developer.spotify.com/documentation/web-api/) + [MusicKit](https://developer.apple.com/musickit/) APIs. 

## Getting Started
You can either clone the repo locally or deploy on Vercel. **In both cases, you must store the Spotify / MusicKit API keys as environmental variables for the app to function properly.**

> ⚠️ **An enrolled Apple Developer account is required for Apple Music song matching to function.**  
> Without one, the Apple Music option will appear greyed out. 

### Option 1: Deploy on Vercel (recommended)
Click the button below. For env variable values, refer to the [setup section](#setting-up-your-environmental-variables) below. After setup you'll get a link to your app. **Setup Apple Music environmental variables after deployment in the [Vercel UI](https://vercel.com/support/articles/how-to-add-vercel-environment-variables#envrionment-variables-ui).**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjeffreydyao%2Frecently-played&env=SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN&envDescription=API%20keys%20needed%20for%20the%20app%20to%20function.%20For%20Apple%20Music%20song%20matching%2C%20add%20them%20after%20deploy%20in%20the%20Vercel%20UI.%20Learn%20more%20in%20the%20documentation.&envLink=https%3A%2F%2Fgithub.com%2Fjeffreydyao%2Frecently-played%2Fblob%2Fmain%2FREADME.md&project-name=recently-played&repo-name=recently-played&demo-title=Recently%20Played&demo-description=Showcase%20what%20you've%20been%20playing%20recently%20on%20Spotify%20to%20your%20friends.&demo-url=recently-played.vercel.app&demo-image=https%3A%2F%2Fgithub.com%2Fjeffreydyao%2Frecently-played%2Fraw%2Fmain%2Fpublic%2Fdemo.png)

### Option 2: Local setup
Clone the repo and setup a new .env.local file. For values, refer to the [setup section](#setting-up-your-environmental-variables) below.

    // Spotify - required for app to function
    SPOTIFY_CLIENT_ID=VALUE
    SPOTIFY_CLIENT_SECRET=VALUE
    SPOTIFY_REFRESH_TOKEN=VALUE
    // Apple Music - optional for Apple Music song search
    APPLE_DEVELOPER_TEAM_ID=VALUE
    APPLE_DEVELOPER_KEY_ID=VALUE


## Setting up your environmental variables

| Environmental variable | Where to find it | Required? |
| --- | --- | --- |
| `SPOTIFY_CLIENT_ID` | Create an app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/). Your Client ID is shown. | ✅ |
| `SPOTIFY_CLIENT_SECRET` | After creating your Spotify app, click **Show Client Secret**. | ✅ |
| `SPOTIFY_REFRESH_TOKEN` | Add `http://localhost:3000` as a redirect URI for your Spotify app, then follow the instructions [here](https://benwiz.com/blog/create-spotify-refresh-token/). In Step 4, if you use a Mac wrap the URL in quote marks. | ✅ |
| `APPLE_DEVELOPER_TEAM_ID` | To locate your Team ID, sign in to your [developer account](https://developer.apple.com/account), and click Membership in the sidebar. Your Team ID appears in the Membership Information section under the team name. _Required for Apple Music song matching._ | ❌  |
| `APPLE_DEVELOPER_KEY_ID` | Follow the Apple Developer instructions [here](https://help.apple.com/developer-account/#/devcdfbb56a3). Enable Media Services for your key. _Required for Apple Music song matching._ | ❌  |

## Why'd I make this project?
I first learned HTML, CSS and JS by making a [page](listening-to.vercel.app) that displayed my recently listened to tracks from Last.fm. However, I wanted to pull data **directly** from the Spotify API and also learn more about React, TypeScript, APIs and web development in general. Building this project allowed me to dive deep into those things. Plus, I like listening to music!

## What'd I learn? 
> A blog post about what I learned is coming soon. ([Visit my site!](jyao.me))

- How to build a performant web app
  - JavaScript and React memory management - removing listeners and clearing timers when components unmount, etc.
  - Debugging memory leaks and more with Chrome / Safari DevTools + LightHouse (I got my app to 99 on all the metrics!)
  - Next.js best practices and image optimization
- More about JS/TS, React and web development in general
  - JavaScript: event listeners and new methods including Temporal()
  - React: Hooks, refs and component lifecycles
  - Next.js: API routes, image optimization
  - Working with framer-motion and other nice libraries
  - Traversing and working with JSON data 
  - Consuming APIs

