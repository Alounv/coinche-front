<script lang="ts">
	import type { Card } from '../data/enums';
	import type { PlayerWithName, Game } from '../data/types';
	import LastTurns from './LastTurns.svelte';
	import Table from './Table.svelte';
	import { getPlayers, getPlayersPositions } from '../utils/game';

	export let player: PlayerWithName;
	export let game: Game;
	export let play: (card: Card) => void;

	$: players = getPlayers(game);
	$: playersPositions = getPlayersPositions({
		players,
		currentPlayerOrder: player.Order
	});
</script>

<Table {player} {game} {play}>
	<LastTurns slot="middle" turns={game.Turns} {...playersPositions} {player} />
</Table>
