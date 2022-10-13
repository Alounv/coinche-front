# Coinche (CLIENT)

This is the client part, the server part can be found here https://github.com/Alounv/coinche-back.

## What

A simple multiplayer coinche game.

You can play here: https://coinche.vercel.app/

<img width="800" alt="Capture d’écran 2022-10-09 à 02 22 02" src="https://user-images.githubusercontent.com/34238160/194732034-793d1e95-4382-4cb2-838c-ab772d65fb25.png">

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
