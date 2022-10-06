<script lang="ts">
	import { type Card, Phases } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import LastTurns from './LastTurns.svelte';
	import Table from './Table.svelte';
	import Teams from './Teams.svelte';
	import { getPlayers, getPlayersPositions } from '../utils/game';

	export let player: PlayerWithName;
	export let game: Game;
	export let play: (card: Card) => void;
	export let start: () => void;

	let isHandShown = true;

	$: players = getPlayers(game);
	$: playersPositions = getPlayersPositions({
		players,
		currentPlayerOrder: player.Order
	});

	$: {
		if (game.Phase === Phases.Counting && isHandShown) {
			setTimeout(() => {
				isHandShown = false;
			}, 7000);
		}
	}
</script>

<Table {player} {game} {play}>
	<div slot="middle" style="display: flex; align-items: center; justify-content: center; flex: 1;">
		{#if isHandShown}
			<LastTurns turns={game.Turns} {...playersPositions} {player} />
		{:else}
			<Teams {game} showScores={true} />
			<button on:click={start}>Restart</button>
		{/if}
	</div>
</Table>
