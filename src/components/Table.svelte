<script lang="ts">
	import { type Card, Phases } from '../data/enums'
	import type { Game, PlayerWithName } from '../data/types'
	import { getLastBid, getPlayers, getPlayersPositions } from '../utils/game'
	import { Badge } from 'spaper'
	import CurrentPlayerInfo from './CurrentPlayerInfo.svelte'
	import Hand from './Hand.svelte'
	import LastBid from './LastBid.svelte'
	import OtherPlayer from './OtherPlayer.svelte'
	import TableLayout from './TableLayout.svelte'

	export let player: PlayerWithName
	export let game: Game
	export let play: null | ((card: Card) => void) = null

	let scoresText = ''

	$: order = player.Order
	$: isPlayerTurn = order === 1
	$: players = getPlayers(game)
	$: otherPlayers = getPlayersPositions({
		currentPlayerOrder: player.Order,
		players
	})
	$: turns = game.Turns
	$: lastBid = getLastBid(game)
	$: trump = lastBid?.Color
	$: firstPlayer = players.find((p) => p.InitialOrder === 1)
	$: {
		const teamScores: { team: string; score: number }[] = []
		for (const team in game.Scores) {
			const teamPlayersNames = players.filter((p) => p.Team === team).map((p) => p.name)
			teamScores.push({
				score: game.Scores[team],
				team: teamPlayersNames.join(', ')
			})
		}
		scoresText = teamScores.map(({ team, score }) => `${team}: ${score}`).join(' | ')
	}
</script>

<TableLayout>
	<div slot="top-left">
		{#if game.Phase === Phases.Bidding}
			First player will be <Badge>{firstPlayer?.name}</Badge>
		{:else}
			<LastBid {lastBid} />
		{/if}
		<div>{scoresText}</div>
	</div>

	<OtherPlayer slot="top" player={otherPlayers.front} position="front" {turns} gameId={game.ID} />
	<OtherPlayer slot="left" player={otherPlayers.left} position="left" {turns} gameId={game.ID} />
	<OtherPlayer slot="right" player={otherPlayers.right} position="right" {turns} gameId={game.ID} />

	<slot name="middle" slot="center" />

	<Hand slot="bottom" {player} {play} {isPlayerTurn} {trump}>
		{#if play}
			<CurrentPlayerInfo {player} {turns} />
		{/if}
	</Hand>
</TableLayout>
