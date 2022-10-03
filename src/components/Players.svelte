<script lang="ts">
	import { afterUpdate } from 'svelte';

	import type { PlayerWithName, Game } from '../data/types';
	import { getPlayersFromGame } from '../utils/game';

	export let playerName: string;
	export let game: Game;

	let players: PlayerWithName[] = [];

	afterUpdate(() => {
		players = getPlayersFromGame(game);
		players.sort((a, b) => a.InitialOrder - b.InitialOrder);
	});
</script>

{#each players as p}
	<div>
		{#if p.Order === 1}
			<strong>[</strong>
		{/if}
		{p.name}
		{p.Team}
		{#if p.Order === 1}
			<strong>]</strong>
		{/if}
		{#if p.name === playerName}
			<strong>👈</strong>
		{/if}
	</div>
{/each}
