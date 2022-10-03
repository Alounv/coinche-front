<script lang="ts">
	import type { PlayerWithName, Game } from '../data/types';
	import { getPlayersFromGame } from '../utils/game';

	export let player: PlayerWithName;
	export let game: Game;

	let players: PlayerWithName[] = [];
	players = getPlayersFromGame(game);
	players.sort((a, b) => a.InitialOrder - b.InitialOrder);
</script>

{#each players as p}
	<div>
		{p.name}
		{p.Team}
		{#if p.Order === 1}
			<strong>{'<---- turn'}</strong>
		{/if}
	</div>
{/each}

<div>{player.Hand}</div>
