<script lang="ts">
	import type { Game } from '../data/types';
	import { getPlayers } from '../utils/game';

	export let playerName: string;
	export let game: Game;

	$: players = getPlayers(game);
</script>

<ul>
	{#each players as p}
		<li class={p.name === playerName ? 'current' : ''}>
			{p.name}
			{#if p.Order === 1}
				<strong>👈</strong>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.current {
		font-weight: bold;
	}

	.current::after {
		content: ']';
	}
	.current::before {
		content: '[ ';
	}
</style>
