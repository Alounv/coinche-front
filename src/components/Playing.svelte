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

<Hand {player} {play} {canPlay} />
