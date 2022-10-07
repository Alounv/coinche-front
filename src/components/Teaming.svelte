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

	const TEAMS = [
		{ label: '🅰️', value: 'A' },
		{ label: '🅱️', value: 'B' }
	];
</script>

<div class="padding">
	Please choose a team.
	<ul>
		{#each TEAMS as { value, label }}
			{#if value !== playerTeam}
				<li class="margin-small">
					<button on:click={() => joinTeam(value)}>Join {label}</button>
				</li>
			{/if}
		{/each}
		{#if playerTeam}
			<li class="margin-small">
				<button on:click={reset}>Leave my team </button>
			</li>
		{/if}
	</ul>

	<Teams {game} />

	<button on:click={start} disabled={!canStart}>Start</button>
</div>
