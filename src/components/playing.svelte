<script lang="ts">
	import type { BidColors, Card } from '../data/enums';
	import { afterUpdate } from 'svelte';
	import type { PlayerWithName, Game } from '../data/types';
	import Players from './players.svelte';
	import { getTrump } from '../utils/game';

	export let player: PlayerWithName;
	export let game: Game;
	export let play: (card: Card) => void;

	const trump: BidColors = getTrump(game);
	let canPlay = false;

	afterUpdate(() => {
		canPlay = game.Players[player.name].Order === 1;
	});

	console.log('game', game);
</script>

<Players {game} playerName={player.name} />

<div>{player.Hand}</div>
<div>Trump is {trump}</div>

{#each player.Hand as card}
	<li>
		<span>{card}</span>
		{#if canPlay}
			<button on:click={() => play(card)}>Play</button>
		{/if}
	</li>
{/each}
