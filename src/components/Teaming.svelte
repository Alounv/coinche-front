<script lang="ts">
	import type { Game } from '../data/types';
	import Teams from './Teams.svelte';

	export let game: Game;
	export let start: () => void;
	export let joinTeam: (team: string) => void;

	let canStart = false;
	let teamName = '';
</script>

<form on:submit|preventDefault={() => joinTeam(teamName)}>
	<label for="team-name">My team</label>
	<input id="team-name" type="text" bind:value={teamName} />
</form>

<Teams {game} bind:canStart />

<button on:click={start} disabled={!canStart}>Start</button>
