<script lang="ts">
	import { getTeams } from '../utils/game';

	import type { Game } from '../data/types';
	import Teams from './Teams.svelte';

	export let game: Game;
	export let start: () => void;
	export let joinTeam: (team: string) => void;
	export let playerTeam: string;

	$: teams = getTeams(game);
	$: reset = () => joinTeam('');
	$: canStart =
		teams.length === 2 && teams[0].players.length === 2 && teams[1].players.length === 2;
	$: APlayers = teams.find((team) => team.name === 'A')?.players || [];
	$: BPlayers = teams.find((team) => team.name === 'B')?.players || [];

	$: teamsOptions = [
		{ label: '🅰️', value: 'A', isFull: APlayers.length === 2 },
		{ label: '🅱️', value: 'B', isFull: BPlayers.length === 2 }
	];
</script>

<div class="padding align-middle" style="display: flex; flex: 1; align-items: center;">
	<div style="display:flex; flex-direction: column; gap: 1rem;">
		Please choose a team.
		<div style="display: flex; gap: 1rem;">
			<button on:click={reset} disabled={!playerTeam}>Leave Team</button>
			{#each teamsOptions as { value, label, isFull }}
				<button disabled={value === playerTeam || isFull} on:click={() => joinTeam(value)}
					>Join {label}</button
				>
			{/each}
		</div>

		<Teams {game} />

		<button style="width: 100%" on:click={start} disabled={!canStart}>Start</button>
	</div>
</div>
