<script lang="ts">
	import type { Player, Game, PlayerWithName } from '../../../types';
	import {
		gameStore,
		actionsStore,
		playerStore,
		initialGame,
		initialPlayer
	} from '../../../stores';

	interface Team {
		name: string;
		players: PlayerWithName[];
	}

	const getTeamsFromPlayers = (players: Record<string, Player>): Team[] => {
		const teams: Team[] = [];
		for (const name in players) {
			const player = { name, ...players[name] };
			const team = teams.find((t) => t.name === player.Team);
			if (team) {
				team.players.push(player);
			} else {
				teams.push({ name: player.Team, players: [player] });
			}
		}
		return teams;
	};

	let currentPlayer: PlayerWithName = initialPlayer;
	let teamName = '';
	let currentGame: Game = initialGame;
	let teams: Team[] = [];

	let joinTeam: () => void;
	let startGame: () => void;

	gameStore.subscribe((game) => {
		currentGame = game;
		teams = getTeamsFromPlayers(game.Players);
	});

	playerStore.subscribe((player) => {
		currentPlayer = player;
	});

	actionsStore.subscribe((actions) => {
		joinTeam = () => actions.joinTeam(teamName);
		startGame = actions.start;
	});
</script>

<form on:submit|preventDefault={joinTeam}>
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

{#if currentGame?.Phase === 1}
	<button on:click={startGame}>Start</button>
{/if}

<div>{currentPlayer.Hand}</div>
<div>{currentPlayer.name}</div>
