<script lang="ts">
	import { type Card, Phases } from '../data/enums'
	import type { Game, PlayerWithName } from '../data/types'
	import { getPlayers, getPlayersPositions } from '../utils/game'
	import Counting from './Counting.svelte'
	import LastTurns from './LastTurns.svelte'
	import Table from './Table.svelte'

	export let player: PlayerWithName
	export let game: Game
	export let play: (card: Card) => void
	export let start: () => void

	const LAST_TURN_SHOWING_TIME = 3000

	let isHandShown = true

	$: players = getPlayers(game)
	$: playersPositions = getPlayersPositions({
		currentPlayerOrder: player.Order,
		players
	})

	$: {
		if (game.Phase === Phases.Counting && isHandShown) {
			setTimeout(() => {
				isHandShown = false
			}, LAST_TURN_SHOWING_TIME)
		}
	}
</script>

<Table {player} {game} {play}>
	<div slot="middle" style="display: flex; align-items: center; justify-content: center; flex: 1;">
		{#if isHandShown}
			<LastTurns turns={game.Turns} {...playersPositions} />
		{:else}
			<Counting {game} {start} playerName={player.name} />
		{/if}
	</div>
</Table>
