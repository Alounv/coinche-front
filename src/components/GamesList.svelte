<script lang="ts">
	import type { GamePreview } from '../data/types';
	import { Button, Badge } from 'spaper';
	import { phases, Phases } from '../data/enums';

	export let games: GamePreview[] = [];
	export let deleteGame: (gameId: number) => void;
	export let forceLeave: (gameID: number, name: string) => void;
	export let playerName: string;

	const joinGame = (gameId: number) => {
		window.location.href = `/game?game=${gameId}&player=${playerName}`;
	};
</script>

<ul>
	{#each games as game (game.ID)}
		<li class="row" style="gap: .5rem; align-items: center">
			<Badge type="primary">{game.Name}</Badge>
			<span>{phases[game.Phase]}</span>
			{#if game.Phase === Phases.Playing}
				<span>{game.TurnsCount}</span>
			{/if}
			{#each game.Players as player (player)}
				<Badge>{player}</Badge>
			{/each}

			<Button size="small" on:click={() => deleteGame(game.ID)}>Delete</Button>
			<Button size="small" on:click={() => forceLeave(game.ID, playerName)}>Force Leave</Button>
			<Button size="small" type="secondary" on:click={() => joinGame(game.ID)}>Join</Button>
		</li>
	{/each}
</ul>
