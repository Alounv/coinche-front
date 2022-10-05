<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import Players from './Players.svelte';
	import LastTurns from './LastTurns.svelte';
	import Hand from './Hand.svelte';
	import { getTrump } from '../utils/game';

	export let player: PlayerWithName;
	export let game: Game;
	export let play: (card: Card) => void;

	$: trump = getTrump(game);
	$: canPlay = game.Players[player.name].Order === 1;
</script>

<Players {game} playerName={player.name} />

<div>Trump is {trump}</div>

<LastTurns {game} />

<div class="row flex-center">
	<Hand {player} {play} {canPlay} />

	{#if canPlay}
		<div class="margin">
			Use <span class="badge">LEFT</span> / <span class="badge">RIGHT</span> to select a card then
			press
			<span class="badge secondary">ENTER</span> to play it.
		</div>
	{/if}
</div>
