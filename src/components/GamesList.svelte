<script lang="ts">
	import type { GamePreview } from '../data/types';
	import GamePreviewComponent from './GamePreview.svelte';

	export let games: GamePreview[] = [];
	export let deleteGame: (gameId: number) => void;
	export let forceLeave: (gameID: number, name: string) => void;
	export let playerName: string;

	const joinGame = (gameId: number) => {
		window.location.href = `/game?game=${gameId}&player=${playerName}`;
	};
</script>

<ul>
	{#each games as game (game.ID)}
		<GamePreviewComponent
			{game}
			deleteGame={() => deleteGame(game.ID)}
			forceLeave={() => forceLeave(game.ID, playerName)}
			joinGame={() => joinGame(game.ID)}
			{playerName}
		/>
	{/each}
</ul>
