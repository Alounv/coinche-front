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

	$: deleteLabel = hasPlayers ? 'Archive' : 'Delete'
	$: handleDelete = () => {
		if (confirm(`${deleteLabel} "${game.Name}" game?\nThis cannot be undone.`)) {
			hasPlayers ? archiveGame() : deleteGame()
		}
	}
</script>

<li class="row gap-3 items-center">
	<Badge type="primary">{game.Name}</Badge>
	<span>{phases[game.Phase]}</span>
	{#if isPlaying}
		<Progress class="custom-progress w-16 m-0" value={progress} />
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
