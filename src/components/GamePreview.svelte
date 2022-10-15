<script lang="ts">
	import { Badge, Button, Progress } from 'spaper'
	import { Phases, phases } from '../data/enums'
	import type { GamePreview } from '../data/types'

	export let game: GamePreview
	export let deleteGame: () => void
	export let archiveGame: () => void
	export let joinGame: () => void
	export let playerName: string

	$: canJoin = game.Players.includes(playerName) || game.Phase === Phases.Teaming
	$: isPlaying = game.Phase === Phases.Playing
	$: lastPlayerIndex = game.Players.length - 1
	$: progress = Math.round((game.TurnsCount / 8) * 100)
	$: hasPlayers = game.Players.length > 0

	$: handleDelete = hasPlayers ? archiveGame : deleteGame
	$: deleteLabel = hasPlayers ? 'Archive' : 'Delete'
</script>

<li class="row" style="gap: .75rem; align-items: center">
	<Badge type="primary">{game.Name}</Badge>
	<span>{phases[game.Phase]}</span>
	{#if isPlaying}
		<Progress style="width: 4rem; margin: 0;" class="custom-progress" value={progress} />
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

	<Button size="small" on:click={handleDelete}>{deleteLabel}</Button>
	<Button size="small" type="secondary" disabled={!canJoin || !playerName} on:click={joinGame}
		>Join</Button
	>
</li>
