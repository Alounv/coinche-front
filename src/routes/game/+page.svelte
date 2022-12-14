<script lang="ts">
	import type { BidColors, BidValues, Card } from '../../data/enums'
	import type { Game, PlayerWithName } from '../../data/types'
	import { onDestroy, onMount } from 'svelte'
	import GameArea from '../../components/Game.svelte'
	import { GameSocket } from '../../web/socket'
	import { getPlayerAndGameFromUrl } from '../../utils/url'
	import { showToast } from '../../utils/toast'

	let name = ''
	let game: Game
	let player: PlayerWithName
	let joinTeam: (team: string) => void = () => null
	let start: () => void = () => null
	let bid: (args: { value: BidValues; color: BidColors }) => void = () => null
	let pass: () => void = () => null
	let coinche: () => void = () => null
	let play: (card: Card) => void = () => null

	let gs: GameSocket

	const onMessage = (msg: string): void => {
		showToast({ message: msg, type: 'danger' })
	}

	const onGame = (g: Game): void => {
		game = g
		const currentPlayer = g.Players[name]
		if (currentPlayer) {
			player = { name, ...g.Players[name] }
		} else {
			showToast({ message: 'You are not in this game', type: 'danger' })
		}
	}

	onMount(() => {
		window.addEventListener('popstate', onPopState)
		const { gameId, playerName } = getPlayerAndGameFromUrl()
		name = playerName
		if (playerName && gameId) {
			gs = new GameSocket({ gameId, onGame, onMessage, playerName })
		}
	})

	const onPopState = () => {
		const { gameId, playerName } = getPlayerAndGameFromUrl()
		if (playerName !== name || gameId !== game?.ID) {
			gs?.leave()
			name = playerName
			gs = new GameSocket({ gameId, onGame, onMessage, playerName })
		}
	}

	$: {
		joinTeam = (team: string) => gs.joinTeam(team)
		start = () => gs.start()
		bid = ({ value, color }) => gs.bid({ color, value })
		pass = () => gs.pass()
		coinche = () => gs.coinche()
		play = (card) => gs.play(card)
	}

	onDestroy(() => {
		gs?.leave()
	})
</script>

<svelte:window on:beforeunload={gs?.leave} />

<div class="background-secondary border flex-1 flex flex-col">
	<GameArea {game} {player} {joinTeam} {start} {bid} {pass} {coinche} {play} />
</div>
