<script lang="ts">
	import type { GamePreview } from '../data/types';
	import GamePreviewComponent from './GamePreview.svelte';

	export let games: GamePreview[] = [];
	export let deleteGame: (gameId: number) => void;
	export let forceLeave: (gameID: number, name: string) => Promise<void>;
	export let playerName: string;

	const joinGame = async (gameId: number) => {
		await forceLeave(gameId, playerName);
		window.location.href = `/game?game=${gameId}&player=${playerName}`;
	};
</script>

<ul>
	{#each games as game (game.ID)}
		<GamePreviewComponent
			{game}
			deleteGame={() => deleteGame(game.ID)}
			joinGame={() => joinGame(game.ID)}
			{playerName}
		/>
	{/each}
</ul>
