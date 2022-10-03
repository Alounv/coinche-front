<script lang="ts">
	import type { Game } from '../data/types';
	import { getPlayers } from '../utils/game';

	export let playerName: string;
	export let game: Game;

	$: players = getPlayers(game);
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
