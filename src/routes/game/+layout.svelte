<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Game } from '../../types';
	import { GameSocket } from '../../socket';
	import { getPlayerAndGameFromUrl } from '../../url';
	import { gameStore, initialGame, actionsStore, playerStore } from '../../stores';

	let name = '';
	let currentGame: Game = initialGame;
	let message = '';

	let gs: GameSocket;

	const onMessage = (msg: string): void => {
		message = msg;
	};

	const onGame = (game: Game): void => {
		gameStore.set(game);
		playerStore.set({ name, ...game.Players[name] });
	};

	onMount(() => {
		const { gameId, playerName } = getPlayerAndGameFromUrl();
		name = playerName;
		if (playerName && gameId) {
			gs = new GameSocket({ gameId, playerName, onMessage, onGame });

			actionsStore.set({
				joinTeam: (team: string) => gs.joinTeam(team),
				start: () => gs.start
			});
		}
	});

	onDestroy(() => gs?.leave());
</script>

<svelte:window on:beforeunload={() => gs?.leave()} />

<a href="/">Back</a>
<div style="color: red;">{message}</div>
<div>Phase: {currentGame?.Phase}</div>
<div>Game name: {currentGame?.Name}</div>

<slot />
