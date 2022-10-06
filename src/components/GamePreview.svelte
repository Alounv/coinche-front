<script lang="ts">
	import type { GamePreview } from '../data/types';
	import { Button, Badge, Progress } from 'spaper';
	import { phases, Phases } from '../data/enums';

	export let game: GamePreview;
	export let deleteGame: () => void;
	export let forceLeave: () => void;
	export let joinGame: () => void;
	export let playerName: string;

	$: canJoin = game.Players.includes(playerName) || game.Phase === Phases.Teaming;
	$: isPlaying = game.Phase === Phases.Playing;
	$: lastPlayerIndex = game.Players.length - 1;
	$: progress = Math.round((game.TurnsCount / 8) * 100);
</script>

<li class="row" style="gap: .75rem; align-items: center">
	<Badge type="primary">{game.Name}</Badge>
	<span>{phases[game.Phase]}</span>
	{#if isPlaying}
		<Progress style="width: 4rem; margin: 0;" class="custom-progress" value={progress} max={8} />
	{/if}

	<div>
		(
		{#each game.Players as player, i (player)}
			<span class={player === playerName ? 'text-secondary' : ''}>{player}</span>{i <
			lastPlayerIndex
				? ', '
				: ''}
		{/each}
		)
	</div>

	<Button size="small" on:click={deleteGame} disabled={!!game.Players.length}>Delete</Button>
	<Button size="small" on:click={forceLeave} disabled={game.Phase !== Phases.Teaming}
		>Force Leave</Button
	>
	<Button size="small" type="secondary" disabled={!canJoin} on:click={joinGame}>Join</Button>
</li>
