<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Player, Game } from '../../types';
	import { Phase } from '../../types';
	import { GameSocket } from '../../socket';
	import { getPlayerAndGameFromUrl } from '../../url';

	interface Team {
		name: string;
		players: Player[];
	}

	let currentPlayer: Player = { name: '', Team: '', Hand: [] };
	let teamName = '';
	let currentGame: Game = { ID: 0, Name: '', Players: [], Phase: Phase.Teaming };
	let message = '';
	let teams: Team[] = [];

	let gs: GameSocket;

	const onMessage = (msg: string): void => {
		message = msg;
	};

	const onGame = (game: Game): void => {
		const teamsObject: Record<string, Team> = {};
		currentGame = game;

		for (const name in game.Players) {
			const { Team, Hand } = game.Players[name];
			const player = { name, Team, Hand };

			const teamName = player.Team || 'Not in a team';
			teamsObject[teamName] ??= { name: teamName, players: [] };
			teamsObject[teamName].players.push(player);
			if (name === currentPlayer.name) {
				currentPlayer = player;
			}
		}

		teams = [];
		for (const team in teamsObject) {
			teams.push(teamsObject[team]);
		}
	};

	onMount(() => {
		const { gameId, playerName } = getPlayerAndGameFromUrl();
		currentPlayer.name = playerName;
		if (playerName && gameId) {
			gs = new GameSocket({ gameId, playerName, onMessage, onGame });
		}
	});

	onDestroy(() => gs?.leave());

	const joinTeam = () => gs?.joinTeam(teamName);
	const startGame = () => gs?.start();
</script>

<svelte:window on:beforeunload={() => gs?.leave()} />

<div>GAME</div>
<a href="/">Back</a>

<div style="color: red;">{message}</div>

<form on:submit|preventDefault={joinTeam}>
	<label for="team-name">My team</label>
	<input id="team-name" type="text" bind:value={teamName} />
</form>

<div>Phase: {currentGame?.Phase}</div>

<div>
	<p>Game name: {currentGame?.Name}</p>
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

{#if currentGame?.Phase === 1}
	<button on:click={startGame}>Start</button>
{/if}

<div>{currentPlayer.Hand}</div>
<div>{currentPlayer.name}</div>
