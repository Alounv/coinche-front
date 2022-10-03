<script lang="ts">
	import type { Game } from '../data/types';

	export let game: Game;

	$: currentTurn = game.Turns[game.Turns.length - 1];
	$: previousTurn = game.Turns[game.Turns.length - 2];
</script>

<div>
	<div>Current: {JSON.stringify(currentTurn)}</div>
	{#if previousTurn}
		<div>Previous: {JSON.stringify(previousTurn)}</div>
	{/if}
</div>
