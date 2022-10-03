<script lang="ts">
	import type { Game, PlayerWithName } from '../data/types';
	import { afterUpdate, onMount } from 'svelte';

	export let game: Game;
	export let start: () => void;
	export let joinTeam: (team: string) => void;

	interface Team {
		name: string;
		players: PlayerWithName[];
	}

	const getTeams = (game: Game): Team[] => {
		if (!game) return [];

		const players = game.Players;
		const teams: Team[] = [];
		for (const name in players) {
			const player = { name, ...players[name] };
			const playerTeam = player.Team || 'Not in a team';
			const team = teams.find((t) => t.name === playerTeam);
			if (team) {
				team.players.push(player);
			} else {
				teams.push({ name: playerTeam, players: [player] });
			}
		}
		return teams;
	};

	let teamName = '';
	let teams: Team[] = [];

	onMount(() => {
		teams = getTeams(game);
	});

	afterUpdate(() => {
		teams = getTeams(game);
	});
</script>

<form on:submit|preventDefault={() => joinTeam(teamName)}>
	<label for="team-name">My team</label>
	<input id="team-name" type="text" bind:value={teamName} />
</form>

<div>
	<ul>
		{#each teams as team (team.name)}
			<li>
				{team.name}
				<ul>
					{#each team.players as player (player.name)}
						<li>{player.name}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>

{#if game?.Phase === 1}
	<button on:click={start}>Start</button>
{/if}
