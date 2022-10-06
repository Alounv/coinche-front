<script lang="ts">
	import type { Game } from '../data/types';
	import Teams from './Teams.svelte';

	export let game: Game;
	export let start: () => void;
</script>

<Table {player} {game} {play}>
	<LastTurns slot="middle" turns={game.Turns} {...playersPositions} {player} />
	<Teams {game} showScores={true} />
</Table>

<button on:click={start}>Restart</button>
