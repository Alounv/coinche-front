<script lang="ts">
	import type { Game } from '../data/types';
	import { getTeams } from '../utils/game';

	export let game: Game;
	export let canStart: boolean = false;
	export let showScores: boolean = false;

	$: teams = getTeams(game);
	$: canStart =
		teams.length === 2 && teams[0].players.length === 2 && teams[1].players.length === 2;
</script>

<div>
	<ul>
		{#each teams as team (team.name)}
			<li>
				{team.name}
				{#if showScores}
					{team.score || 0}
					{team.points || 0}
				{/if}
				<ul>
					{#each team.players as player (player.name)}
						<li>{player.name}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>
