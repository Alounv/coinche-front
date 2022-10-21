# Coinche (CLIENT)

This is the client part, the server part can be found here https://github.com/Alounv/coinche-back.

## What

A simple multiplayer coinche game.

You can play here: https://coinche.vercel.app/

<img width="832" alt="Capture d’écran 2022-10-21 à 15 12 42" src="https://user-images.githubusercontent.com/34238160/197204169-798c9637-d5c0-45c0-bfbf-4363017852ab.png">

<details>
    <summary>Bidding</summary>
    <img width="831" alt="Capture d’écran 2022-10-21 à 15 11 12" src="https://user-images.githubusercontent.com/34238160/197204166-1f02e273-9e3b-4a71-b209-0a08a38ca28b.png">
</details>

## Why

This is a personal project to learn:

- WebSockets
- Svelte

## Developing

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

## Building

To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.

## Environment variables

```bash
# to switch players
VITE_ADMIN=true

# server urls
VITE_REST_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000
```
