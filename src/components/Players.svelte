<script lang="ts">
	import type { Game } from '../data/types';
	import { getPlayers } from '../utils/game';

	export let playerName: string;
	export let game: Game;

	$: players = getPlayers(game);

	const handleClick = (playerName: string): void => {
		window.history.pushState(
			{ player: playerName, game: game.ID },
			document.title,
			`?game=${game.ID}&player=${playerName}`
		);
		window.dispatchEvent(new Event('popstate'));
	};
</script>

<ul>
	{#each players as p}
		<li class={p.name === playerName ? 'current' : ''}>
			<a href={`/game?game=${game.ID}&player=${p.name}`} on:click={() => handleClick(p.name)}>
				{p.name}
				{#if p.Order === 1}
					<strong>👈</strong>
				{/if}
			</a>
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
